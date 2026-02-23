"use server";

import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import { prismaAdmin } from "@repo/database";
import { authOptions } from "@/auth";
import slugify from "slugify";

// Zod Schema for Post Form
export const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(300),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Invalid slug format. Use lowercase letters, numbers, and hyphens.")
    .optional()
    .or(z.literal("")),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().max(500).optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  tags: z.array(z.string()).default([]),
});

export type PostFormValues = z.infer<typeof postSchema>;

/**
 * Require valid Admin session
 */
async function requireAuth() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session = (await getServerSession(authOptions as any)) as any;
  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized");
  }
  return session.user;
}

/**
 * Generate unique slug if not provided
 */
async function generateUniqueSlug(title: string, currentSlug?: string | null): Promise<string> {
  const baseSlug = currentSlug && currentSlug.trim() !== "" 
    ? currentSlug 
    : slugify(title, { lower: true, strict: true, locale: 'vi' });

  let uniqueSlug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prismaAdmin.post.findUnique({
      where: { slug: uniqueSlug },
      select: { id: true },
    });
    if (!existing) break;
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}

/**
 * Create Post Action
 */
export async function createPostAction(data: PostFormValues) {
  try {
    const user = await requireAuth();
    const validated = postSchema.parse(data);

    const uniqueSlug = await generateUniqueSlug(validated.title, validated.slug);

    // Xử lý Tags (Upsert để lấy tag IDs)
    const tagIds = await Promise.all(
      validated.tags.map(async (tagName) => {
        const tagSlug = slugify(tagName, { lower: true, strict: true, locale: 'vi' });
        const tag = await prismaAdmin.tag.upsert({
          where: { name: tagName.toLowerCase() },
          update: {},
          create: { name: tagName.toLowerCase(), slug: tagSlug },
        });
        return tag.id;
      })
    );

    const post = await prismaAdmin.post.create({
      data: {
        title: validated.title,
        slug: uniqueSlug,
        content: validated.content,
        excerpt: validated.excerpt,
        status: validated.status,
        publishedAt: validated.status === "PUBLISHED" ? new Date() : null,
        authorId: user.id,
        tags: {
          create: tagIds.map((id) => ({ tagId: id })),
        },
      },
    });

    revalidatePath("/dashboard/blog");
    return { success: true, postId: post.id };
  } catch (error) {
    console.error("Failed to create post:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to create post" };
  }
}

/**
 * Update Post Action
 */
export async function updatePostAction(id: string, data: PostFormValues) {
  try {
    await requireAuth();
    const validated = postSchema.parse(data);

    const post = await prismaAdmin.post.findUnique({ where: { id } });
    if (!post) throw new Error("Post not found");

    // Chỉ check unique slug nếu slug thay đổi
    let uniqueSlug = post.slug;
    if (validated.slug && validated.slug !== post.slug) {
      uniqueSlug = await generateUniqueSlug(validated.title, validated.slug);
    }

    const isFirstTimePublishing = post.status !== "PUBLISHED" && validated.status === "PUBLISHED";
    const publishedAt = isFirstTimePublishing ? new Date() : post.publishedAt;

    // Tags list
    const tagIds = await Promise.all(
      validated.tags.map(async (tagName) => {
        const tagSlug = slugify(tagName, { lower: true, strict: true, locale: 'vi' });
        const tag = await prismaAdmin.tag.upsert({
          where: { name: tagName.toLowerCase() },
          update: {},
          create: { name: tagName.toLowerCase(), slug: tagSlug },
        });
        return tag.id;
      })
    );

    await prismaAdmin.post.update({
      where: { id },
      data: {
        title: validated.title,
        slug: uniqueSlug,
        content: validated.content,
        excerpt: validated.excerpt,
        status: validated.status,
        publishedAt,
        tags: {
          deleteMany: {}, // Clear old links
          create: tagIds.map((tid) => ({ tagId: tid })), // Add new links
        },
      },
    });

    revalidatePath("/dashboard/blog");
    // revalidatePath public /blog and /blog/[slug] if needed
    return { success: true };
  } catch (error) {
    console.error("Failed to update post:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to update post" };
  }
}

/**
 * Delete Post Action
 */
export async function deletePostAction(id: string) {
  try {
    await requireAuth();
    await prismaAdmin.post.delete({
      where: { id },
    });
    revalidatePath("/dashboard/blog");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete post:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to delete post" };
  }
}

/**
 * Toggle Publish Status Action
 */
export async function togglePostStatusAction(id: string) {
  try {
    await requireAuth();
    const post = await prismaAdmin.post.findUnique({ where: { id } });
    if (!post) throw new Error("Post not found");

    const newStatus = post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    const isFirstTimePublishing = newStatus === "PUBLISHED" && !post.publishedAt;
    const publishedAt = isFirstTimePublishing ? new Date() : post.publishedAt;

    await prismaAdmin.post.update({
      where: { id },
      data: { status: newStatus, publishedAt },
    });

    revalidatePath("/dashboard/blog");
    return { success: true, status: newStatus };
  } catch (error) {
    console.error("Failed to toggle publish status:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to toggle status" };
  }
}
