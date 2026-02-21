# Tech Stack & Monorepo Structure

## 1. Tech Stack

Dự án sử dụng các công nghệ mới nhất để đảm bảo hiệu suất và dễ mở rộng:

- **Framework**: Next.js (FE + Admin Portal)
- **Styling**: Tailwind CSS
- **Database ORM**: Prisma
- **Database Engine**: PostgreSQL
- **Tooling**: Monorepo (Turborepo hoặc định dạng Workspaces mặc định của package manager như pnpm/yarn).

## 2. Monorepo Architecture

Cấu trúc Monorepo dự kiến (Standard):

```text
blackmatte/
├── project/             # Nơi lưu toàn bộ Source Code
│   ├── apps/
│   │   ├── web/         # Frontend Website (CV, Blog, Gallery)
│   │   └── admin/       # Admin Portal (Quản lý nội dung)
│   └── packages/
│       ├── database/    # Prisma schema, migrations, seeders
│       ├── ui/          # Shared UI components (Tailwind)
│       └── config/      # Shared ESLint, TypeScript configs
├── .agent/
│   ├── infrastructure/  # Cấu hình môi trường dev local (Docker)
│   └── ...              # AI Knowledge Base (rules, docs, workflows...)
├── docker-compose.yml   # Khởi tạo DB/Redis ở root
└── package.json         # Workspace root (chỉ định workspaces vào project/*)
```

## 3. Strict Rules

- Không mix code database trực tiếp vào apps/web hay apps/admin. Mọi kết nối DB phải qua `packages/database`.
- Sử dụng Server Actions của Next.js cho các tác vụ mutate data (thay vì API Routes truyền thống nếu không cần thiết).
