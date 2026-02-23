---
id: SRS-SPR01
title: Software Requirements Specification — Sprint 1: Foundation
epic: EPC-01
sprint: SPR-01
urd: URD-EPC01.md (v1.1)
status: DRAFT
version: 1.0
author: AI (Antigravity)
date: 2026-02-22
---

# SRS-SPR01 — Sprint 1: Foundation

---

## 1. Overview

### 1.1 Scope

Tài liệu này mô tả **yêu cầu kỹ thuật chi tiết** cho Sprint 1 (Foundation), bao gồm:

- Khởi tạo shared packages (`packages/config`, `packages/ui`)
- Định nghĩa toàn bộ Database Schema (tất cả entities của Epic 01)
- Prisma migration đầu tiên + seed admin credentials
- Authentication system: Login / Logout / Session / Route Protection

### 1.2 User Stories Covered

| US-ID | User Story | Priority |
|---|---|---|
| US-01 | Khởi tạo Shared Config Package | M |
| US-02 | Khởi tạo Shared UI Package (dark mode) | M |
| US-03 | Khởi tạo Database Schema và Migration | M |
| US-04 | Khởi tạo Admin Credentials | M |
| US-05 | Đăng nhập Admin Portal | M |
| US-06 | Duy trì phiên đăng nhập (30 ngày) | M |
| US-07 | Đăng xuất Admin Portal | M |
| US-08 | Bảo vệ Route Admin | M |

---

## 2. Environment Variables

Tất cả credentials và config sensitive phải qua `.env`. Không được hard-code.

| Variable | App | Mô tả | Required |
|---|---|---|---|
| `DATABASE_URL` | `packages/database` | Kết nối superadmin (prisma migrate) | ✅ |
| `DATABASE_URL_ADMIN` | `apps/admin` | Kết nối admin_user (CRUD) | ✅ |
| `DATABASE_URL_WEB` | `apps/web` | Kết nối web_user (SELECT only) | ✅ |
| `ADMIN_EMAIL` | `packages/database` | Email đăng nhập admin (dùng cho seed) | ✅ |
| `ADMIN_PASSWORD` | `packages/database` | Password plain text (seed sẽ hash) | ✅ |
| `NEXTAUTH_SECRET` | `apps/admin` | Secret key mã hóa JWT | ✅ |
| `NEXTAUTH_URL` | `apps/admin` | URL admin portal | ✅ |
| `NEXT_PUBLIC_WEB_URL` | `apps/web` | URL public website | ❌ |
| `NEXT_PUBLIC_ADMIN_URL` | `apps/admin` | URL admin portal (public) | ❌ |

> Bổ sung vào `.env` và `.env.example`:
> ```
> ADMIN_EMAIL="admin@blackmatte.dev"
> ADMIN_PASSWORD="your-strong-password-here"
> ```

---

## 3. Functional Requirements

### FR-01: packages/config

**Mô tả**: Shared configuration package cho toàn bộ monorepo.

**File structure:**
```
packages/config/
├── package.json
├── eslint/
│   └── index.js          # Base ESLint config
├── typescript/
│   ├── base.json         # Base tsconfig
│   ├── nextjs.json       # Next.js specific tsconfig
│   └── react-library.json # Shared package tsconfig
└── tailwind/
    └── index.js          # Shared Tailwind preset
```

**Requirements:**
- FR-01.1: ESLint config kế thừa từ `@vercel/style-guide` hoặc `eslint:recommended` + `@typescript-eslint`
- FR-01.2: TypeScript `base.json` bật `strict: true`, `noUncheckedIndexedAccess: true`
- FR-01.3: Tailwind preset export `darkMode: 'class'` và color tokens của `blackmatte.dev`

---

### FR-02: packages/ui

**Mô tả**: Shared UI component library dựa trên shadcn/ui, forced dark mode.

**Setup requirements:**
- FR-02.1: Install shadcn/ui với style `new-york`, base color `zinc` (phù hợp dark theme)
- FR-02.2: `tailwind.config.ts` cấu hình: `darkMode: 'class'`
- FR-02.3: `globals.css` định nghĩa CSS variables cho dark theme:

```css
/* Dark mode variables (forced — no light variant) */
:root {
  --background: 0 0% 3.9%;        /* Near black */
  --foreground: 0 0% 98%;         /* Near white */
  --card: 0 0% 7%;
  --card-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 0 0% 9%;
  --muted: 0 0% 15%;
  --muted-foreground: 0 0% 65%;
  --border: 0 0% 14.9%;
  --accent: 0 0% 14.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --ring: 0 0% 83.1%;
}
```

**Components cần export** (tối thiểu cho Sprint 1 + 2 + 3):

| Component | Dùng bởi |
|---|---|
| `Button` | Mọi nơi |
| `Input` | Form login, blog form |
| `Label` | Form fields |
| `Card`, `CardHeader`, `CardContent` | Dashboard, list items |
| `Badge` | Tags, status indicators |
| `Dialog`, `DialogContent`, `DialogFooter` | Confirmation dialogs |
| `Textarea` | Blog excerpt, project description |
| `Toast` / Sonner | Success/error notifications |
| `Separator` | Layout |
| `Avatar` | Profile (tương lai) |

---

### FR-03: Database Schema

**Mô tả**: Toàn bộ entities của Epic 01 định nghĩa trong `schema.prisma`, apply bằng `migrate dev`.

#### 3.1 Entity: User

**Mục đích**: Tài khoản Admin Portal. Chỉ 1 record trong production.

| Field | Type | Nullable | Unique | Default | Constraint |
|---|---|---|---|---|---|
| `id` | `String` | ❌ | ✅ | `cuid()` | PK |
| `email` | `String` | ❌ | ✅ | — | Max 255 chars |
| `passwordHash` | `String` | ❌ | ❌ | — | Bcrypt hash, cost 12 |
| `name` | `String?` | ✅ | ❌ | — | Max 100 chars |
| `role` | `UserRole` | ❌ | ❌ | `ADMIN` | Enum |
| `createdAt` | `DateTime` | ❌ | ❌ | `now()` | |
| `updatedAt` | `DateTime` | ❌ | ❌ | `@updatedAt` | |

**Enum UserRole**: `ADMIN`, `VIEWER`

**Indexes**: `@@unique([email])`

**Relations**: `Post[] (1-many)`, `Profile[] (0-1)`

---

#### 3.2 Entity: Post

**Mục đích**: Bài viết Blog.

| Field | Type | Nullable | Unique | Default | Constraint |
|---|---|---|---|---|---|
| `id` | `String` | ❌ | ✅ | `cuid()` | PK |
| `title` | `String` | ❌ | ❌ | — | Max 300 chars, required |
| `slug` | `String` | ❌ | ✅ | — | Lowercase kebab-case, URL-safe |
| `excerpt` | `String?` | ✅ | ❌ | — | Max 500 chars, plain text |
| `content` | `String` | ❌ | ❌ | — | HTML string từ Tiptap |
| `coverImage` | `String?` | ✅ | ❌ | — | URL string (S3 — null trong Sprint 1) |
| `status` | `PostStatus` | ❌ | ❌ | `DRAFT` | Enum |
| `publishedAt` | `DateTime?` | ✅ | ❌ | `null` | Set khi lần đầu Publish |
| `authorId` | `String` | ❌ | ❌ | — | FK → User.id |
| `createdAt` | `DateTime` | ❌ | ❌ | `now()` | |
| `updatedAt` | `DateTime` | ❌ | ❌ | `@updatedAt` | |

**Enum PostStatus**: `DRAFT`, `PUBLISHED`, `ARCHIVED`

**Indexes**:
- `@@index([status, publishedAt])` — query bài published sort theo ngày
- `@@index([authorId])`
- `@@unique([slug])`

**Relations**: `author User (many-1)`, `tags PostTag[] (1-many)`

---

#### 3.3 Entity: Tag

**Mục đích**: Tag phân loại bài viết Blog.

| Field | Type | Nullable | Unique | Default | Constraint |
|---|---|---|---|---|---|
| `id` | `String` | ❌ | ✅ | `cuid()` | PK |
| `name` | `String` | ❌ | ✅ | — | Lowercase, trimmed, max 50 chars |
| `slug` | `String` | ❌ | ✅ | — | Lowercase kebab-case |
| `createdAt` | `DateTime` | ❌ | ❌ | `now()` | |

**Business Rules**:
- Tag name được normalize về lowercase trước khi lưu (VD: "NextJS" → "nextjs")
- Slug tự sinh từ name

---

#### 3.4 Entity: PostTag (Junction Table)

**Mục đích**: Bảng trung gian quan hệ Many-to-Many Post ↔ Tag.

| Field | Type | Nullable | Unique | Default | Constraint |
|---|---|---|---|---|---|
| `postId` | `String` | ❌ | — | — | FK → Post.id, cascade delete |
| `tagId` | `String` | ❌ | — | — | FK → Tag.id, cascade delete |

**Primary Key**: `@@id([postId, tagId])` (composite PK)

**On Delete**: Cascade — xóa Post thì PostTag liên quan bị xóa theo

---

#### 3.5 Entity: Project

**Mục đích**: Portfolio project đã làm, phục vụ trang CV/Portfolio.

| Field | Type | Nullable | Unique | Default | Constraint |
|---|---|---|---|---|---|
| `id` | `String` | ❌ | ✅ | `cuid()` | PK |
| `name` | `String` | ❌ | ❌ | — | Max 200 chars, required |
| `shortDescription` | `String` | ❌ | ❌ | — | Max 500 chars, required |
| `techStack` | `String` | ❌ | ❌ | — | Free text, VD: "Next.js, PostgreSQL" |
| `demoUrl` | `String?` | ✅ | ❌ | — | URL format, nullable |
| `duration` | `String?` | ✅ | ❌ | — | Free text, VD: "Q1 2024 – Q2 2024" |
| `teamSize` | `String?` | ✅ | ❌ | — | Free text, VD: "3 người", "Solo" |
| `myRole` | `String` | ❌ | ❌ | — | Max 200 chars, required |
| `highlights` | `String?` | ✅ | ❌ | — | Vấn đề nổi cộm đã giải quyết |
| `status` | `ProjectStatus` | ❌ | ❌ | `ONGOING` | Enum |
| `priority` | `Int` | ❌ | ❌ | `0` | Số lớn = hiện trước |
| `thumbnailUrl` | `String?` | ✅ | ❌ | — | null trong Sprint 1 (Epic Gallery) |
| `createdAt` | `DateTime` | ❌ | ❌ | `now()` | |
| `updatedAt` | `DateTime` | ❌ | ❌ | `@updatedAt` | |

**Enum ProjectStatus**: `ONGOING`, `COMPLETED`, `ARCHIVED`

**Indexes**:
- `@@index([priority])` — sort theo priority
- `@@index([status])` — filter theo status

---

#### 3.6 Entity: Profile

**Mục đích**: Thông tin cá nhân của chủ trang (singleton — chỉ 1 record).

| Field | Type | Nullable | Unique | Default | Constraint |
|---|---|---|---|---|---|
| `id` | `String` | ❌ | ✅ | `cuid()` | PK |
| `displayName` | `String` | ❌ | ❌ | — | Tên hiển thị công khai |
| `headline` | `String?` | ✅ | ❌ | — | VD: "Full-stack Developer" |
| `bio` | `String?` | ✅ | ❌ | — | Giới thiệu dài (plain text hoặc Markdown) |
| `email` | `String?` | ✅ | ❌ | — | Email liên hệ công khai ⭐ NEW |
| `avatarUrl` | `String?` | ✅ | ❌ | — | URL ảnh đại diện (S3 — null Sprint 1) |
| `cvPdfUrl` | `String?` | ✅ | ❌ | — | URL CV PDF (S3 — null Sprint 1) |
| `github` | `String?` | ✅ | ❌ | — | URL đầy đủ GitHub profile |
| `linkedin` | `String?` | ✅ | ❌ | — | URL đầy đủ LinkedIn profile |
| `twitter` | `String?` | ✅ | ❌ | — | URL đầy đủ Twitter/X profile |
| `website` | `String?` | ✅ | ❌ | — | URL website cá nhân khác |
| `updatedAt` | `DateTime` | ❌ | ❌ | `@updatedAt` | |

**Business Rule**: Singleton — seed script tạo sẵn 1 record khi init.

---

#### 3.7 Prisma Schema (Complete)

```prisma
// packages/database/prisma/schema.prisma

generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Enums ───────────────────────────────────────────────────

enum UserRole {
  ADMIN
  VIEWER
}

enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum ProjectStatus {
  ONGOING
  COMPLETED
  ARCHIVED
}

// ─── Models ──────────────────────────────────────────────────

model User {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  name         String?
  role         UserRole @default(ADMIN)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  posts Post[]

  @@map("users")
}

model Post {
  id          String     @id @default(cuid())
  title       String
  slug        String     @unique
  excerpt     String?
  content     String
  coverImage  String?
  status      PostStatus @default(DRAFT)
  publishedAt DateTime?
  authorId    String
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  author User      @relation(fields: [authorId], references: [id])
  tags   PostTag[]

  @@index([status, publishedAt])
  @@index([authorId])
  @@map("posts")
}

model Tag {
  id        String   @id @default(cuid())
  name      String   @unique
  slug      String   @unique
  createdAt DateTime @default(now())

  posts PostTag[]

  @@map("tags")
}

model PostTag {
  postId String
  tagId  String

  post Post @relation(fields: [postId], references: [id], onDelete: Cascade)
  tag  Tag  @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([postId, tagId])
  @@map("post_tags")
}

model Project {
  id               String        @id @default(cuid())
  name             String
  shortDescription String
  techStack        String
  demoUrl          String?
  duration         String?
  teamSize         String?
  myRole           String
  highlights       String?
  status           ProjectStatus @default(ONGOING)
  priority         Int           @default(0)
  thumbnailUrl     String?
  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt

  @@index([priority])
  @@index([status])
  @@map("projects")
}

model Profile {
  id          String   @id @default(cuid())
  displayName String
  headline    String?
  bio         String?
  email       String?
  avatarUrl   String?
  cvPdfUrl    String?
  github      String?
  linkedin    String?
  twitter     String?
  website     String?
  updatedAt   DateTime @updatedAt

  @@map("profile")
}
```

---

### FR-04: Seed Script

**File**: `packages/database/prisma/seed.ts`

**Logic**:
```
1. Đọc ADMIN_EMAIL, ADMIN_PASSWORD từ process.env
2. Hash password với bcrypt (rounds = 12)
3. Upsert User (không duplicate nếu chạy lại)
4. Upsert Profile (tạo record trống — Admin điền sau)
5. Log kết quả
```

**package.json addition** (trong `packages/database`):
```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

**Validation**: Nếu `ADMIN_EMAIL` hoặc `ADMIN_PASSWORD` không tồn tại → throw error ngay đầu script.

---

### FR-05: NextAuth Configuration (apps/admin)

**Library**: `next-auth` v4 (stable) với Credentials Provider

**File**: `apps/admin/auth.ts` (hoặc `app/api/auth/[...nextauth]/route.ts`)

#### 5.1 Credentials Provider Spec

```
Input:
  - credentials.email: string
  - credentials.password: string

Validation flow:
  1. Tìm User trong DB bằng email
  2. Nếu không tìm thấy → return null (NextAuth xử lý error)
  3. So sánh password với passwordHash bằng bcrypt.compare()
  4. Nếu không khớp → return null
  5. Nếu khớp → return { id, email, name, role }

KHÔNG được:
  - Trả về passwordHash trong session/token
  - Log password dưới bất kỳ hình thức nào
```

#### 5.2 Session / JWT Config

```typescript
session: {
  strategy: "jwt",
  maxAge: 30 * 24 * 60 * 60, // 30 ngày (giây)
}

jwt: {
  maxAge: 30 * 24 * 60 * 60,
}

// JWT callback — thêm role vào token
callbacks: {
  jwt({ token, user }) {
    if (user) {
      token.id = user.id
      token.role = user.role
    }
    return token
  },
  session({ session, token }) {
    session.user.id = token.id
    session.user.role = token.role
    return session
  }
}
```

#### 5.3 Middleware (Route Protection)

**File**: `apps/admin/middleware.ts`

```
Protected paths: /dashboard/**
Public paths: /login, /api/auth/**

Logic:
  - Nếu request path match /dashboard/** và không có session → redirect /login
  - Nếu đã đăng nhập và truy cập /login → redirect /dashboard
```

#### 5.4 TypeScript Extensions

```typescript
// types/next-auth.d.ts
declare module "next-auth" {
  interface User {
    id: string
    role: UserRole
  }
  interface Session {
    user: User & { id: string; role: UserRole }
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: UserRole
  }
}
```

---

### FR-06: Login Page UI (apps/admin)

**Route**: `/login`

**UI Spec**:
```
Layout: Full-screen centered card, dark background
Card:
  - Logo / Brand: "blackmatte" text + icon (hoặc text-only)
  - Title: "Admin Sign In"
  - Email input: type="email", label="Email", required
  - Password input: type="password", label="Password",
                    toggle show/hide button (Eye icon)
  - Submit button: "Sign In" (full width)
  - Error message area: hiển thị khi login fail

Dark mode: Forced (class="dark" trên html)
```

**Behavior**:
- Client-side validation trước khi submit (không được submit khi fields trống)
- Loading state: Button disabled + spinner khi đang gọi API
- Error state: Display "Invalid email or password" (generic, không nói rõ email hay password sai)
- Success: Redirect về `/dashboard` hoặc `callbackUrl` nếu có

---

### FR-07: Admin Layout + Dashboard Shell

**Route**: `/dashboard`

**Layout spec** (`apps/admin/app/(dashboard)/layout.tsx`):
```
Sidebar (left, fixed):
  - Logo: "blackmatte admin"
  - Nav items: Dashboard, Blog Posts, Projects
  - Bottom: User email + Sign Out button

Content area (right, scrollable)
```

**Dashboard page** (stub cho Sprint 1):
```
Title: "Dashboard"
Cards:
  - Total Posts (query count từ DB)
  - Total Projects (query count từ DB)
  - Last updated (Profile.updatedAt)
```

---

## 4. Non-Functional Requirements (Sprint 1)

| ID | Requirement | Target |
|---|---|---|
| NFR-SP1-01 | `pnpm lint` pass 0 errors ở toàn bộ monorepo | Bắt buộc trước commit |
| NFR-SP1-02 | `pnpm build` thành công ở cả `apps/admin` và `apps/web` | Bắt buộc |
| NFR-SP1-03 | Không có `any` TypeScript type không có lý do | Strict mode |
| NFR-SP1-04 | Dark mode CSS variables đúng theo spec FR-02.3 | Visual check |
| NFR-SP1-05 | Password không được xuất hiện trong logs, DB dump, response | Security |
| NFR-SP1-06 | Migration file snapshot phải match schema hiện tại | `prisma migrate status` |

---

## 5. Dependencies & Assumptions

### 5.1 Packages cần install

**packages/database:**
```bash
pnpm add @prisma/client bcrypt
pnpm add -D prisma @types/bcrypt ts-node typescript
```

**apps/admin:**
```bash
pnpm add next-auth@4
pnpm add -D @types/next-auth
```

**packages/ui:**
```bash
# shadcn/ui via CLI
npx shadcn@latest init
# Components
npx shadcn@latest add button input label card badge dialog textarea separator
# Toast
pnpm add sonner
```

### 5.2 Assumptions

- Docker PostgreSQL đang chạy tại `localhost:5432`
- `.env` file đã có đầy đủ các biến theo Section 2
- `pnpm install` đã được chạy thành công
- Turbo pipeline `build` đã cấu hình đúng

---

## 6. Definition of Done (Sprint 1)

- [ ] `packages/config` được import thành công từ cả 2 apps
- [ ] `packages/ui` export đủ components, dark mode hoạt động
- [ ] `prisma migrate dev --name init` tạo migration thành công
- [ ] `prisma db seed` tạo admin user (không duplicate khi chạy lại)
- [ ] Admin đăng nhập thành công tại `localhost:3001/login`
- [ ] JWT session tồn tại 30 ngày (verify bằng cookie DevTools)
- [ ] Admin đăng xuất → session cleared → redirect /login
- [ ] Truy cập `/dashboard` khi chưa login → redirect `/login`
- [ ] `pnpm lint` pass 0 errors
- [ ] `pnpm build` thành công
