---
id: TDD-SPR01
title: Technical Design Document — Sprint 1: Foundation
epic: EPC-01
sprint: SPR-01
srs: SRS-SPR01.md
status: DRAFT
version: 1.0
author: AI (Antigravity)
date: 2026-02-22
---

# TDD-SPR01 — Technical Design: Foundation

---

## 1. Overview

Tài liệu này mô tả **thiết kế kỹ thuật chi tiết** để implement Sprint 1, bao gồm file structure, data flow, component tree, và thứ tự implementation. Engineer có thể code trực tiếp từ tài liệu này sau khi được approve.

---

## 2. Monorepo Physical Structure (After Sprint 1)

```
blackmatte/
├── .env                          # Local dev credentials (gitignored)
├── .env.example                  # Template (committed)
├── .npmrc                        # pnpm config
├── docker-compose.yml
├── turbo.json
├── pnpm-workspace.yaml
├── package.json                  # Root workspace
│
└── project/
    ├── package.json              # Inner monorepo root
    ├── packages/
    │   ├── config/               # ← NEW: Sprint 1
    │   │   ├── package.json
    │   │   ├── eslint/
    │   │   │   └── index.js
    │   │   ├── typescript/
    │   │   │   ├── base.json
    │   │   │   ├── nextjs.json
    │   │   │   └── react-library.json
    │   │   └── tailwind/
    │   │       └── index.js
    │   │
    │   ├── ui/                   # ← NEW: Sprint 1
    │   │   ├── package.json
    │   │   ├── tailwind.config.ts
    │   │   ├── globals.css
    │   │   ├── components.json   # shadcn config
    │   │   └── src/
    │   │       ├── index.ts      # Barrel export
    │   │       └── components/
    │   │           └── ui/       # shadcn components
    │   │
    │   └── database/
    │       ├── package.json
    │       ├── prisma.config.ts
    │       ├── prisma/
    │       │   ├── schema.prisma # ← UPDATED: Sprint 1
    │       │   ├── seed.ts       # ← NEW: Sprint 1
    │       │   └── migrations/   # ← NEW: Sprint 1
    │       │       └── 20260222000000_init/
    │       │           └── migration.sql
    │       ├── generated/
    │       │   └── prisma/       # Auto-generated Prisma Client
    │       └── src/
    │           ├── index.ts      # Barrel export
    │           └── client.ts     # ← NEW: Prisma singleton
    │
    └── apps/
        ├── web/                  # Sprint 4 — placeholder
        │   └── ...
        └── admin/                # ← MAIN WORK: Sprint 1
            ├── package.json
            ├── next.config.ts
            ├── tailwind.config.ts
            ├── tsconfig.json
            ├── middleware.ts     # ← NEW: Route protection
            ├── auth.ts           # ← NEW: NextAuth config
            └── app/
                ├── layout.tsx    # Root layout (dark mode class)
                ├── (auth)/
                │   └── login/
                │       ├── page.tsx
                │       └── _components/
                │           └── LoginForm.tsx
                ├── (dashboard)/
                │   ├── layout.tsx    # Sidebar layout
                │   └── dashboard/
                │       └── page.tsx  # Stub dashboard
                └── api/
                    └── auth/
                        └── [...nextauth]/
                            └── route.ts
```

---

## 3. packages/config — Design

### 3.1 package.json

```json
{
  "name": "@repo/config",
  "version": "0.0.1",
  "private": true,
  "exports": {
    "./eslint": "./eslint/index.js",
    "./typescript/*": "./typescript/*.json",
    "./tailwind": "./tailwind/index.js"
  }
}
```

### 3.2 ESLint Config (`eslint/index.js`)

```js
/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "next/core-web-vitals",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "prefer-const": "error",
    "no-console": ["warn", { allow: ["warn", "error"] }],
  },
};
```

### 3.3 TypeScript Base (`typescript/base.json`)

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true
  }
}
```

### 3.4 Tailwind Preset (`tailwind/index.js`)

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],          // Dark mode via class strategy
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
};
```

---

## 4. packages/ui — Design

### 4.1 Dark Mode Setup

**Root `app/layout.tsx`** trong CẢ `apps/admin` và `apps/web`:
```tsx
// Force dark mode — không dùng ThemeProvider
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}
```

**Lý do**: Không dùng `next-themes` vì dark mode là forced, không cần toggle.

### 4.2 Component Barrel Export (`src/index.ts`)

```typescript
// UI primitives
export * from "./components/ui/button";
export * from "./components/ui/input";
export * from "./components/ui/label";
export * from "./components/ui/card";
export * from "./components/ui/badge";
export * from "./components/ui/dialog";
export * from "./components/ui/textarea";
export * from "./components/ui/separator";
export * from "./components/ui/toast";
export * from "./components/ui/avatar";
```

### 4.3 CSS Variables (globals.css)

```css
/* Forced dark — no @media prefers-color-scheme */
.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --card: 0 0% 7%;
  --card-foreground: 0 0% 98%;
  --popover: 0 0% 7%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 0 0% 9%;
  --secondary: 0 0% 14.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;
  --accent: 0 0% 14.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 14.9%;
  --input: 0 0% 14.9%;
  --ring: 0 0% 83.1%;
}
```

---

## 5. packages/database — Design

### 5.1 Prisma Client Singleton (`src/client.ts`)

```typescript
// packages/database/src/client.ts
import { PrismaClient } from "../generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prismaAdmin: PrismaClient | undefined;
  prismaWeb: PrismaClient | undefined;
};

// Client cho apps/admin (admin_user — CRUD)
export const prismaAdmin =
  globalForPrisma.prismaAdmin ??
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL_ADMIN,
    log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  });

// Client cho apps/web (web_user — SELECT only)
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
```

**Barrel export** (`src/index.ts`):
```typescript
export { prismaAdmin, prismaWeb } from "./client";
export type {
  User, Post, Tag, PostTag, Project, Profile,
  UserRole, PostStatus, ProjectStatus,
} from "../generated/prisma";
```

### 5.2 Seed Script (`prisma/seed.ts`)

```typescript
import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcrypt";
import "dotenv/config";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  // Upsert admin user — idempotent
  const user = await prisma.user.upsert({
    where: { email },
    update: {},  // Không update nếu đã tồn tại
    create: { email, passwordHash, name: "Admin", role: "ADMIN" },
  });
  console.info(`✓ Admin user: ${user.email}`);

  // Upsert profile singleton
  const profileCount = await prisma.profile.count();
  if (profileCount === 0) {
    await prisma.profile.create({
      data: { displayName: "Admin", updatedAt: new Date() },
    });
    console.info("✓ Profile record created");
  }

  console.info("Seed completed successfully");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
```

---

## 6. apps/admin — Design

### 6.1 NextAuth Config (`auth.ts`)

```typescript
// apps/admin/auth.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prismaAdmin } from "@repo/database";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prismaAdmin.user.findUnique({
          where: { email: credentials.email },
          select: { id: true, email: true, passwordHash: true, name: true, role: true },
        });
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) return null;

        // KHÔNG trả về passwordHash
        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) { token.id = user.id; token.role = user.role; }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

### 6.2 Middleware (`middleware.ts`)

```typescript
// apps/admin/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Đã auth — cho qua
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: { signIn: "/login" },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

### 6.3 Authentication Flow Diagram

```
Browser                  Middleware              NextAuth              Database (admin_user)
   │                         │                      │                         │
   │── GET /dashboard ───────►│                      │                         │
   │                         │── check JWT token ──►│                         │
   │                         │   (no token)         │                         │
   │◄── 302 /login ──────────│                      │                         │
   │                         │                      │                         │
   │── POST /api/auth/callback/credentials ─────────►│                         │
   │   { email, password }   │                      │── findUnique(email) ───►│
   │                         │                      │◄── user record ─────────│
   │                         │                      │── bcrypt.compare() ─────│
   │                         │                      │   (in memory)           │
   │                         │                      │── sign JWT ─────────────│
   │◄── 302 /dashboard + Set-Cookie: next-auth.session-token ──────────────────│
   │                         │                      │                         │
   │── GET /dashboard ───────►│                      │                         │
   │                         │── verify JWT token ──►│                         │
   │                         │   (valid) ◄──────────│                         │
   │◄── 200 Dashboard ───────│                      │                         │
```

### 6.4 Login Page Component Tree

```
/login (page.tsx) — Server Component
└── LoginForm (LoginForm.tsx) — "use client"
    ├── <form onSubmit={handleSubmit}>
    │   ├── <Label> + <Input type="email" />
    │   ├── <Label> + <Input type="password" />
    │   │   └── <Button> Eye icon toggle
    │   ├── <p> Error message (conditional)
    │   └── <Button type="submit"> Sign In
    │       └── <Spinner /> (loading state)
    └── signIn("credentials", { email, password })
        └── next-auth/react signIn()
```

### 6.5 Dashboard Layout Component Tree

```
/(dashboard)/layout.tsx — Server Component
├── Sidebar (Sidebar.tsx) — "use client"
│   ├── Logo: "blackmatte admin"
│   ├── NavItem: /dashboard → Dashboard
│   ├── NavItem: /dashboard/posts → Blog Posts
│   ├── NavItem: /dashboard/projects → Projects
│   └── UserMenu
│       ├── Email display (từ session)
│       └── <Button onClick={signOut}> Sign Out
└── <main>{children}</main>

/dashboard/page.tsx — Server Component
├── getServerSession(authOptions)
└── DashboardStats
    ├── StatsCard: Total Posts (prismaAdmin.post.count())
    ├── StatsCard: Total Projects (prismaAdmin.project.count())
    └── StatsCard: Last Updated Profile
```

### 6.6 Session Access Pattern

```typescript
// Server Component — get session
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

const session = await getServerSession(authOptions);
if (!session) redirect("/login");

// Client Component — get session
import { useSession } from "next-auth/react";
const { data: session } = useSession();
```

---

## 7. Implementation Sequence

Thứ tự implement để tránh dependency issues:

```
STEP 1 ── packages/config
           ├── 1.1 Tạo package.json + exports
           ├── 1.2 Viết eslint/index.js
           ├── 1.3 Viết typescript/*.json
           └── 1.4 Viết tailwind/index.js

STEP 2 ── packages/ui
           ├── 2.1 Init shadcn/ui (npx shadcn@latest init)
           ├── 2.2 Cấu hình dark mode CSS variables (globals.css)
           ├── 2.3 Add components (button, input, label, card, badge,
           │         dialog, textarea, separator)
           ├── 2.4 Add Sonner toast
           └── 2.5 Tạo src/index.ts barrel export

STEP 3 ── packages/database
           ├── 3.1 Viết schema.prisma (copy từ SRS-SPR01 Section 3.7)
           ├── 3.2 Tạo src/client.ts (Prisma singleton)
           ├── 3.3 Tạo src/index.ts barrel export
           ├── 3.4 Viết prisma/seed.ts
           ├── 3.5 Chạy: prisma migrate dev --name init
           └── 3.6 Chạy: prisma db seed

STEP 4 ── apps/admin (Auth)
           ├── 4.1 Cài next-auth@4
           ├── 4.2 Tạo auth.ts (NextAuth config)
           ├── 4.3 Tạo app/api/auth/[...nextauth]/route.ts
           ├── 4.4 Tạo middleware.ts
           ├── 4.5 Tạo types/next-auth.d.ts
           └── 4.6 Update app/layout.tsx (className="dark")

STEP 5 ── apps/admin (Login UI)
           ├── 5.1 Tạo app/(auth)/login/page.tsx
           └── 5.2 Tạo app/(auth)/login/_components/LoginForm.tsx

STEP 6 ── apps/admin (Dashboard)
           ├── 6.1 Tạo app/(dashboard)/layout.tsx + Sidebar
           └── 6.2 Tạo app/(dashboard)/dashboard/page.tsx

STEP 7 ── Verification
           ├── 7.1 pnpm lint (must pass 0 errors)
           ├── 7.2 pnpm type-check
           ├── 7.3 pnpm build
           └── 7.4 Manual test: login → dashboard → logout → redirect /login
```

---

## 8. Key Technical Decisions

| Decision | Choice | Reason |
|---|---|---|
| NextAuth version | v4 (stable) | v5/Auth.js vẫn beta, API chưa ổn định |
| Session strategy | JWT (stateless) | Phù hợp Vercel serverless, không cần DB session table |
| Password hashing | bcrypt rounds=12 | Balance giữa security và performance |
| Dark mode approach | Force class="dark", không dùng ThemeProvider | Đơn giản, không cần `next-themes`, branding consistent |
| Prisma client | 2 instances (prismaAdmin + prismaWeb) | Tách biệt quyền theo app ngay từ đầu |
| Route groups | `(auth)` và `(dashboard)` | Tách layout: login không có sidebar |
| Seed idempotency | `upsert` với `update: {}` | Chạy nhiều lần không tạo duplicate |

---

## 9. ADR (Architecture Decision Records)

### ADR-SP1-01: Không dùng `next-themes` cho dark mode

**Context**: Dark mode cần implement cho cả 2 apps.
**Decision**: Force `class="dark"` trực tiếp trên `<html>`, không dùng `next-themes`.
**Reason**: Dark mode là bất biến (không toggle), `next-themes` thêm complexity không cần thiết và gây flash-of-unstyled-content khi hydrate.
**Consequence**: Đơn giản hơn, không có FOUC, nhưng không thể thêm toggle sau này mà không refactor.

### ADR-SP1-02: Hai Prisma Client instances

**Context**: `apps/web` cần DB user riêng (web_user — read-only).
**Decision**: Export `prismaAdmin` và `prismaWeb` từ `packages/database`.
**Reason**: Tách biệt quyền DB ngay từ design, đảm bảo web app không thể ghi DB dù có bug logic.
**Consequence**: Cần đảm bảo đúng client được dùng đúng nơi — sẽ enforce qua code review checklist.

---

## 10. Definition of Done (Sprint 1)

- [ ] `packages/config` import thành công từ 2 apps
- [ ] `packages/ui` có đủ components, dark theme đúng màu
- [ ] `prisma migrate dev --name init` thành công, migration file tồn tại
- [ ] `prisma db seed` tạo admin user idempotent
- [ ] `prismaAdmin` và `prismaWeb` singleton hoạt động (không re-create connection)
- [ ] Admin login `localhost:3001/login` với `ADMIN_EMAIL` / `ADMIN_PASSWORD`
- [ ] JWT cookie expire 30 ngày (kiểm tra DevTools → Application → Cookies)
- [ ] Logout → cookie cleared → redirect `/login`
- [ ] Truy cập `/dashboard/*` không có session → redirect `/login`
- [ ] Dashboard hiển thị count Posts và Projects (cả 0 đều OK)
- [ ] `pnpm lint` — 0 errors, 0 warnings nguy hiểm
- [ ] `pnpm type-check` — 0 TypeScript errors
- [ ] `pnpm build` — build thành công cả 2 apps
