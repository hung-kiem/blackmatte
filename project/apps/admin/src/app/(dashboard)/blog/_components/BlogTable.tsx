"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
} from "@repo/ui";
import { format } from "date-fns";
import { BlogTableActions } from "./BlogTableActions";

// Types extracted from Prisma relation
type PostWithRelations = {
  id: string;
  title: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt: Date | null;
  updatedAt: Date;
  author: { name: string | null; email: string };
  tags: { tag: { id: string; name: string } }[];
};

export function BlogTable({ data }: { data: PostWithRelations[] }) {
  if (data.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No blog posts found. Create your first post!</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>{post.title}</span>
                  <span className="text-xs text-muted-foreground">/{post.slug}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={post.status === "PUBLISHED" ? "default" : "secondary"}>
                  {post.status.toLowerCase()}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((pt) => (
                    <Badge key={pt.tag.id} variant="outline" className="text-xs font-normal">
                      {pt.tag.name}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-xs text-muted-foreground self-center">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {format(new Date(post.updatedAt), "MMM dd, yyyy")}
              </TableCell>
              <TableCell className="text-right">
                <BlogTableActions post={post} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
