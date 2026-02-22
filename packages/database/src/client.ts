import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prismaAdmin: PrismaClient | undefined;
  prismaWeb: PrismaClient | undefined;
};

/**
 * Prisma client for apps/admin — uses admin_user (CRUD permissions)
 * Connection string: DATABASE_URL_ADMIN
 */
export const prismaAdmin =
  globalForPrisma.prismaAdmin ??
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL_ADMIN,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error"]
        : ["error"],
  });

/**
 * Prisma client for apps/web — uses web_user (SELECT only)
 * Connection string: DATABASE_URL_WEB
 */
export const prismaWeb =
  globalForPrisma.prismaWeb ??
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL_WEB,
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaAdmin = prismaAdmin;
  globalForPrisma.prismaWeb = prismaWeb;
}
