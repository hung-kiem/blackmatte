import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { prismaAdmin } from "@repo/database";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui";
import { FileText, FolderKanban, Clock } from "lucide-react";

export default async function DashboardPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session = await getServerSession(authOptions as any);
  if (!session) redirect("/login");

  // Fetch stats
  const [postCount, projectCount, profile] = await Promise.all([
    prismaAdmin.post.count(),
    prismaAdmin.project.count(),
    prismaAdmin.profile.findFirst({
      select: { updatedAt: true },
    }),
  ]);

  const lastUpdated = profile?.updatedAt
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(profile.updatedAt)
    : "Never";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (session as any).user;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {user?.name || user?.email}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Posts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{postCount}</div>
          </CardContent>
        </Card>

        {/* Total Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectCount}</div>
          </CardContent>
        </Card>

        {/* Last Updated */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Updated</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lastUpdated}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
