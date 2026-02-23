import path from "path";
import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Load .env từ root monorepo (blackmatte/.env)
// prisma.config.ts nằm ở: packages/database/
// .env nằm ở: ../../.env (2 cấp lên)
config({ path: path.resolve(__dirname, "../../.env") });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error(
    "DATABASE_URL chưa được định nghĩa. Đảm bảo file .env tồn tại ở root monorepo (blackmatte/.env)"
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: DATABASE_URL,
  },
});
