"use client";

import { BlogForm } from "../_components/BlogForm";
import { createPostAction, PostFormValues } from "@/actions/blog.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@repo/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreatePostPage() {
  const router = useRouter();

  const handleSubmit = async (data: PostFormValues) => {
    const result = await createPostAction(data);
    if (result.success) {
      toast.success("Post created successfully");
      router.push("/dashboard/blog");
      router.refresh(); // Force refresh to show new post
    } else {
      toast.error(result.error || "Failed to create post");
    }
    return result;
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
          <h1 className="text-3xl font-bold tracking-tight">Create Post</h1>
          <p className="text-muted-foreground mt-2">Write a new article for your blog.</p>
        </div>
      </div>

      <BlogForm onSubmitAction={handleSubmit} />
    </div>
  );
}
