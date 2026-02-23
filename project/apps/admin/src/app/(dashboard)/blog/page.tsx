import { prismaAdmin } from "@repo/database";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from "@repo/ui";
import { Plus } from "lucide-react";
import Link from "next/link";
import { BlogTable } from "./_components/BlogTable";

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: { page?: string; status?: string };
}) {
  const statusFilter = searchParams.status === "PUBLISHED" ? "PUBLISHED" : searchParams.status === "DRAFT" ? "DRAFT" : undefined;
  
  const page = Number(searchParams.page) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const [posts, totalPosts] = await Promise.all([
    prismaAdmin.post.findMany({
      where: {
        status: statusFilter,
        NOT: { status: "ARCHIVED" }
      },
      include: {
        author: { select: { name: true, email: true } },
        tags: { include: { tag: true } }
      },
      orderBy: { updatedAt: "desc" },
      skip,
      take: pageSize,
    }),
    prismaAdmin.post.count({
      where: {
        status: statusFilter,
        NOT: { status: "ARCHIVED" }
      }
    })
  ]);

  const totalPages = Math.ceil(totalPosts / pageSize);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground mt-2">Manage your blog content, drafts, and publications.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/blog/create">
            <Plus className="mr-2 h-4 w-4" /> Create Post
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>A list of all your created and published posts.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Client Component Data Table */}
          <BlogTable data={posts} currentPage={page} totalPages={totalPages} totalItems={totalPosts} />
        </CardContent>
      </Card>
    </div>
  );
}
