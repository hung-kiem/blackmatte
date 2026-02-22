import { prismaAdmin } from "@repo/database";
import { FormSubmitWrapper } from "./_components/FormSubmitWrapper";
import { Button } from "@repo/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await prismaAdmin.post.findUnique({
    where: { id: params.id },
    include: {
      tags: { include: { tag: true } }
    }
  });

  if (!post) {
    notFound();
  }

  // Format initial data for the form
  const initialData = {
    title: post.title,
    slug: post.slug,
    content: post.content,
    excerpt: post.excerpt || "",
    status: post.status,
    tags: post.tags.map(t => t.tag.name),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/blog">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
          <p className="text-muted-foreground mt-2">Make changes to your article settings and contents.</p>
        </div>
      </div>

      <FormSubmitWrapper postId={post.id} initialData={initialData} />
    </div>
  );
}
