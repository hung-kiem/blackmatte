---
id: TDD-SPR02
title: Technical Design Document — Sprint 2: Blog CRUD
epic: EPC-01
sprint: SPR-02
status: APPROVED
version: 1.0
author: AI (Antigravity)
date: 2026-02-22
---

# TDD-SPR02: Blog CRUD Architecture & Design

## 1. System Architecture Update
Sprint 2 mở rộng kiến trúc với **Next.js Server Actions** xử lý logic backend thay cho API Routes để tận dụng Type-Safety và giảm latency.

### 1.1 Components & Flow
- `apps/admin/src/app/(dashboard)/blog/page.tsx`: Server Component (fetch `db.post.findMany` kèm logic phân trang `take`, `skip` qua query string `?page=x`).
- `apps/admin/src/app/(dashboard)/blog/_components/BlogTable.tsx`: Client Component hiển thị dữ liệu với shadcn `Table` và nút Pagination controls (Next/Prev).
- `apps/admin/src/app/(dashboard)/blog/_components/BlogForm.tsx`: Form tạo/sửa dùng `react-hook-form` + `zodResolver`.
- `apps/admin/src/actions/blog.actions.ts`: Chứa toàn bộ Server Actions (Create, Update, Delete, ToggleStatus).

## 2. Database Design (Prisma)
Sử dụng schema đã có từ Sprint 1:
- `Post`: id, slug, title, content (HTML), excerpt, status (DRAFT/PUBLISHED), authorId, publishedAt, createdAt, updatedAt.
- `Tag`: id, name, slug.
- `TagsOnPosts`: post_id, tag_id (Cascade on delete).

## 3. Server Actions & Services

### `createPostAction(data: PostFormValues)`
1. Validate `session` qua `requireAuth()`.
2. Validate `data` bằng Zod `postSchema`.
3. Auto-generate `slug` nếu trùng bằng logic append `-2`, `-3`.
4. Mở Transaction Prisma:
   - Nếu có tags mới, gọi `prisma.tag.upsert` tạo thẻ hoặc tìm thẻ có sẵn.
   - Insert vào `Post` và tạo quan hệ `tags: { create: [...] }` dựa trên TagsOnPosts.
5. Trả về `{ success: true, postId: id }` hoặc error.

### `updatePostAction(id: string, data: PostFormValues)`
Tương tự create, nhưng chỉ cập nhật các tags mới và xóa các liên kết tags cũ dùng `tags: { deleteMany: {}, create: [...] }`.

## 4. UI/UX & External Libraries
- Giao diện Admin: **Shadcn UI** và **Tailwind CSS**.
- Trình soạn thảo Rich Text: `@tiptap/react`, `@tiptap/starter-kit`, bảng Toolbar tuỳ biến.
- Tiện ích Slug: `slugify` npm package cho việc format string Tiếng Việt.
- Toast Notification: `sonner`.

## 5. Security & Validation
- **Authentication**: JWT verification using `next-auth` server-side check.
- **Data Validation**: `zod` bắt buộc có `title`, `content`.
- **SQL Injection & XSS**: Prisma auto-escapes SQL. Tiptap HTML string được coi là "safe" vì input chỉ từ phía Admin trusted users. Khi render public website sẽ cần sanitize DOM.
