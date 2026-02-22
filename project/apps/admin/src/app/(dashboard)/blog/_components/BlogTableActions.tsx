"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui";
import { MoreHorizontal, Pen, Trash, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { deletePostAction, togglePostStatusAction } from "@/actions/blog.actions";
import { toast } from "sonner";

export function BlogTableActions({ post }: { post: { id: string; title: string; status: string } }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await deletePostAction(post.id);
    setIsDeleting(false);
    if (res.success) {
      toast.success("Post deleted successfully");
      setIsDeleteDialogOpen(false);
    } else {
      toast.error(res.error || "Failed to delete post");
    }
  };

  const handleToggleStatus = async () => {
    setIsToggling(true);
    const res = await togglePostStatusAction(post.id);
    setIsToggling(false);
    if (res.success) {
      toast.success(`Post is now ${res.status?.toLowerCase()}`);
    } else {
      toast.error(res.error || "Failed to toggle status");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/blog/${post.id}/edit`}>
              <Pen className="mr-2 h-4 w-4" /> Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleToggleStatus} disabled={isToggling}>
            {post.status === "PUBLISHED" ? (
              <><EyeOff className="mr-2 h-4 w-4" /> Unpublish</>
            ) : (
              <><Eye className="mr-2 h-4 w-4" /> Publish</>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This will permanently delete the post <strong>{post.title}</strong>. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
