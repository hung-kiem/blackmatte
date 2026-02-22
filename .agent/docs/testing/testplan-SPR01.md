---
id: TESTPLAN-SPR01
title: Test Plan — Sprint 1: Foundation
epic: EPC-01
sprint: SPR-01
tdd: TDD-SPR01.md
status: DRAFT
version: 1.0
author: AI (Antigravity)
date: 2026-02-22
---

# TESTPLAN-SPR01 — Test Plan: Sprint 1 Foundation

---

## 1. Scope

Test plan này bao phủ 3 lớp kiểm thử cho Sprint 1:

| Layer | Tool | Mục tiêu |
|---|---|---|
| **Unit Tests** | Vitest | Logic thuần (slug gen, password hash, validation) |
| **Integration Tests** | Vitest + Prisma Test Client | DB operations, auth flow |
| **Manual Verification** | Browser + DevTools | Login/logout UX, session behavior |

**Out of scope**: E2E browser automation (Playwright) — defer đến Sprint 4.

---

## 2. Test Environment

### 2.1 Setup

```bash
# Đảm bảo Docker DB đang chạy
docker-compose up -d

# Verify kết nối
cd project/packages/database
npx prisma migrate status --config prisma.config.ts

# Chạy migration (nếu chưa có)
npx prisma migrate dev --name init --config prisma.config.ts

# Seed admin user
npx prisma db seed
```

### 2.2 Test Database

- Dùng chung DB local (Docker) — **không** tạo DB riêng cho test Sprint 1
- Sau mỗi test integration có write operations → cleanup

### 2.3 Environment Variables cho Test

```bash
# .env phải có đầy đủ:
DATABASE_URL          # superadmin — cho migration + seed
DATABASE_URL_ADMIN    # admin_user — cho integration tests
ADMIN_EMAIL           # VD: admin@blackmatte.dev
ADMIN_PASSWORD        # VD: TestPassword123!
NEXTAUTH_SECRET       # Bất kỳ string random dài
NEXTAUTH_URL          # http://localhost:3001
```

---

## 3. Unit Tests

**Location**: `project/packages/database/src/__tests__/`
**Command**: `cd project && pnpm test --filter=database`

---

### TC-U01: Slug Generation

**File**: `utils/__tests__/slug.test.ts`
**Module được test**: `src/utils/slug.ts` (sẽ tạo trong Sprint 1)

| Test Case | Input | Expected Output |
|---|---|---|
| TC-U01.1 | `"Hello World"` | `"hello-world"` |
| TC-U01.2 | `"Xin chào Việt Nam"` | `"xin-chao-viet-nam"` |
| TC-U01.3 | `"Next.js & TypeScript"` | `"nextjs-typescript"` |
| TC-U01.4 | `"  extra   spaces  "` | `"extra-spaces"` |
| TC-U01.5 | `"UPPERCASE TITLE"` | `"uppercase-title"` |
| TC-U01.6 | `""` (empty string) | throw Error hoặc return `"untitled"` |

```typescript
// Example test structure
describe("generateSlug()", () => {
  it("converts Vietnamese characters to ASCII", () => {
    expect(generateSlug("Xin chào Việt Nam")).toBe("xin-chao-viet-nam");
  });
  it("removes special characters except hyphens", () => {
    expect(generateSlug("Next.js & TypeScript")).toBe("nextjs-typescript");
  });
});
```

---

### TC-U02: Tag Name Normalization

**File**: `utils/__tests__/tag.test.ts`

| Test Case | Input | Expected Output |
|---|---|---|
| TC-U02.1 | `"NextJS"` | `"nextjs"` |
| TC-U02.2 | `"  React  "` | `"react"` (trimmed + lowercase) |
| TC-U02.3 | `"TypeScript"` | `"typescript"` |

---

### TC-U03: Zod Validation Schemas

**File**: `utils/__tests__/validation.test.ts`

| Test Case | Schema | Input | Expected |
|---|---|---|---|
| TC-U03.1 | Login schema | `{ email: "not-email", password: "x" }` | ZodError |
| TC-U03.2 | Login schema | `{ email: "a@b.com", password: "pass123" }` | success |
| TC-U03.3 | Post schema | `{ title: "", content: "..." }` | ZodError (title required) |
| TC-U03.4 | Post schema | `{ title: "T", content: "<p>Hi</p>" }` | success |
| TC-U03.5 | Project schema | `{ name: "P", shortDescription: "D", myRole: "Dev", status: "INVALID" }` | ZodError |

---

## 4. Integration Tests

**Location**: `project/apps/admin/src/__tests__/`
**Command**: `cd project && pnpm test --filter=admin`

> ⚠️ Integration tests cần DB running. Mỗi test cleanup data sau khi chạy.

---

### TC-I01: Database Schema Verification

**Mục tiêu**: Xác nhận migration đã tạo đúng tables và constraints.

| Test Case | Lệnh / Query | Expected |
|---|---|---|
| TC-I01.1 | `prisma.user.count()` | không throw error (table tồn tại) |
| TC-I01.2 | `prisma.post.count()` | không throw error |
| TC-I01.3 | `prisma.tag.count()` | không throw error |
| TC-I01.4 | `prisma.project.count()` | không throw error |
| TC-I01.5 | `prisma.profile.count()` | không throw error |
| TC-I01.6 | Insert User với email duplicate | throw `PrismaClientKnownRequestError` (P2002 — unique constraint) |

---

### TC-I02: Seed Script

**Mục tiêu**: Kiểm tra seed tạo admin user đúng và idempotent.

| Test Case | Hành động | Expected |
|---|---|---|
| TC-I02.1 | Chạy `prisma db seed` lần đầu | User với `ADMIN_EMAIL` được tạo, `count() = 1` |
| TC-I02.2 | Chạy `prisma db seed` lần 2 | Không tạo duplicate, `count() = 1` |
| TC-I02.3 | Query user vừa seed | `passwordHash` != `ADMIN_PASSWORD` (đã hash) |
| TC-I02.4 | `bcrypt.compare(ADMIN_PASSWORD, passwordHash)` | `true` |
| TC-I02.5 | Profile count sau seed | `>= 1` (singleton được tạo) |

```typescript
// Verify password is hashed (not plain text)
it("stores hashed password, not plain text", async () => {
  const user = await prismaAdmin.user.findUnique({
    where: { email: process.env.ADMIN_EMAIL! },
    select: { passwordHash: true },
  });
  expect(user?.passwordHash).not.toBe(process.env.ADMIN_PASSWORD);
  const isValid = await bcrypt.compare(
    process.env.ADMIN_PASSWORD!,
    user!.passwordHash
  );
  expect(isValid).toBe(true);
});
```

---

### TC-I03: NextAuth Credentials Provider Logic

**Mục tiêu**: Test `authorize()` function trực tiếp (không qua HTTP).

| Test Case | Input | Expected |
|---|---|---|
| TC-I03.1 | Đúng email, đúng password | Return `{ id, email, role }` (không có passwordHash) |
| TC-I03.2 | Đúng email, sai password | Return `null` |
| TC-I03.3 | Email không tồn tại trong DB | Return `null` |
| TC-I03.4 | `credentials = undefined` | Return `null` |
| TC-I03.5 | Response object không có `passwordHash` field | `expect(result).not.toHaveProperty("passwordHash")` |

---

### TC-I04: Prisma Client Singleton

**Mục tiêu**: Xác nhận không tạo nhiều connection instances.

| Test Case | Action | Expected |
|---|---|---|
| TC-I04.1 | Import `prismaAdmin` 2 lần | Cùng 1 instance (referential equality `===`) |
| TC-I04.2 | Import `prismaWeb` 2 lần | Cùng 1 instance |
| TC-I04.3 | `prismaAdmin` connect thành công | Query `prismaAdmin.user.count()` không throw |
| TC-I04.4 | `prismaWeb` connect thành công | Query `prismaWeb.post.count()` không throw |

---

### TC-I05: Route Protection (Middleware)

**Mục tiêu**: Verify middleware redirect behavior (test qua Next.js test utilities).

| Test Case | Request | Expected Response |
|---|---|---|
| TC-I05.1 | `GET /dashboard` (không có session cookie) | `302 → /login` |
| TC-I05.2 | `GET /dashboard/posts` (không có session) | `302 → /login` |
| TC-I05.3 | `GET /login` (không có session) | `200` |
| TC-I05.4 | `GET /api/auth/session` (không có session) | `200 { user: null }` |

---

## 5. Manual Verification Checklist

Thực hiện sau khi `pnpm dev` chạy thành công ở `apps/admin` (localhost:3001).

### MV-01: Dark Mode Visual Check

- [ ] Mở `http://localhost:3001/login`
- [ ] DevTools → Elements → `<html>` có class `dark`
- [ ] Background trang là màu tối (gần đen) — không có white flash
- [ ] Mở `http://localhost:3001/dashboard` (sau khi đăng nhập) → cũng dark

---

### MV-02: Login Page UI

- [ ] Trang hiển thị đúng: Brand name, Email input, Password input, Sign In button
- [ ] Submit form rỗng → button disabled hoặc show validation error (không gọi API)
- [ ] Nhập email sai format (VD: "abc") → browser native email validation hoặc inline error
- [ ] Password field có icon Eye để toggle show/hide password
- [ ] Click Eye → password text hiển thị, click lại → ẩn

---

### MV-03: Login Success Flow

- [ ] Nhập đúng `ADMIN_EMAIL` + `ADMIN_PASSWORD` → click Sign In
- [ ] Loading state: button disabled, có spinner/loading indicator
- [ ] Redirect thành công đến `/dashboard`
- [ ] Dashboard hiển thị: title "Dashboard", stats cards
- [ ] DevTools → Application → Cookies → `next-auth.session-token` tồn tại

---

### MV-04: Login Failure

- [ ] Nhập email đúng, password sai → error message "Invalid email or password"
- [ ] Nhập email không tồn tại → cùng error message "Invalid email or password" (không phân biệt)
- [ ] Form không bị reset sau lỗi (email vẫn giữ nguyên)

---

### MV-05: Session Persistence

- [ ] Sau khi đăng nhập, reload trang `/dashboard` → vẫn đăng nhập (không redirect /login)
- [ ] Mở tab mới, truy cập `/dashboard` → vẫn đăng nhập
- [ ] DevTools → Cookie `next-auth.session-token` → verify `Expires` ≈ 30 ngày từ hôm nay

---

### MV-06: Logout

- [ ] Click "Sign Out" ở sidebar
- [ ] Redirect về `/login`
- [ ] DevTools → Cookie → `next-auth.session-token` đã bị xóa
- [ ] Nhấn Back button → không vào được `/dashboard` (redirect /login lại)

---

### MV-07: Route Protection

- [ ] Đăng xuất xong
- [ ] Thử truy cập thẳng `http://localhost:3001/dashboard` → redirect về `/login`
- [ ] Thử `http://localhost:3001/dashboard/posts` → redirect về `/login`
- [ ] Sau khi redirect về `/login`, đăng nhập lại → redirect về trang ban đầu đã request (callbackUrl)

---

### MV-08: Database Verification (Prisma Studio)

```bash
cd project/packages/database
npx prisma studio --config prisma.config.ts
# Mở http://localhost:5555
```

- [ ] Tables xuất hiện: `users`, `posts`, `tags`, `post_tags`, `projects`, `profile`
- [ ] `users` table có 1 record với email = `ADMIN_EMAIL`
- [ ] `users.passwordHash` là bcrypt hash (bắt đầu bằng `$2b$12$...`), không phải plain text
- [ ] `profile` table có 1 record

---

## 6. Build & Lint Verification

```bash
# Từ root monorepo
cd /Users/hung_kiem/Workspaces/PROJECT/blackmatte/project

# Lint toàn bộ
pnpm lint
# Expected: 0 errors

# Type check
pnpm type-check
# Expected: 0 TypeScript errors

# Build
pnpm build
# Expected: Build success cho cả apps/admin và apps/web
```

---

## 7. Definition of Done — Testplan

Sprint 1 hoàn thành khi **TẤT CẢ** các mục sau được check:

### Unit Tests
- [ ] TC-U01 (1-6): Slug generation — tất cả pass
- [ ] TC-U02 (1-3): Tag normalization — tất cả pass
- [ ] TC-U03 (1-5): Zod validation — tất cả pass

### Integration Tests
- [ ] TC-I01 (1-6): DB schema verified — tất cả pass
- [ ] TC-I02 (1-5): Seed script — tất cả pass
- [ ] TC-I03 (1-5): Auth logic — tất cả pass
- [ ] TC-I04 (1-4): Singleton pattern — tất cả pass
- [ ] TC-I05 (1-4): Route protection — tất cả pass

### Manual Verification
- [ ] MV-01: Dark mode visual
- [ ] MV-02: Login page UI
- [ ] MV-03: Login success
- [ ] MV-04: Login failure
- [ ] MV-05: Session persistence
- [ ] MV-06: Logout
- [ ] MV-07: Route protection
- [ ] MV-08: DB verification

### Build
- [ ] `pnpm lint` — 0 errors
- [ ] `pnpm type-check` — 0 errors
- [ ] `pnpm build` — success

---

## 8. Known Risks

| Risk | Mitigation |
|---|---|
| DB connection fail trong CI | Verify Docker running trước khi test |
| `bcrypt` slow trong test suite | Giảm rounds xuống 4 trong test env (`process.env.NODE_ENV === 'test'`) |
| NextAuth JWT decode trong middleware test | Dùng `getToken()` utility của NextAuth thay vì decode thủ công |
