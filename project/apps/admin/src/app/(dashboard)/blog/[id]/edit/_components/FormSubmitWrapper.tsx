"use client";

import { BlogForm } from "../../../_components/BlogForm";
import { updatePostAction } from "@/actions/blog.actions";
import { PostFormValues } from "@/actions/blog.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function FormSubmitWrapper({ postId, initialData }: { postId: string, initialData: Partial<PostFormValues> }) {
  const router = useRouter();

  const handleSubmit = async (data: PostFormValues) => {
    const result = await updatePostAction(postId, data);
    if (result.success) {
      toast.success("Post updated successfully");
      router.push("/dashboard/blog");
      router.refresh();
    } else {
      toast.error(result.error || "Failed to update post");
    }
    return result;
  };

  return <BlogForm initialData={initialData} onSubmitAction={handleSubmit} />;
}
