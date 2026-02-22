// Barrel export — packages/database
export { prismaAdmin, prismaWeb } from "./client";

// Re-export generated types for convenience
export type {
  User,
  Post,
  Tag,
  PostTag,
  Project,
  Profile,
} from "../generated/prisma/client";

export {
  UserRole,
  PostStatus,
  ProjectStatus,
} from "../generated/prisma/enums";
