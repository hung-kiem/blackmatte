---
id: SRS-SPR02
title: Software Requirements Specification — Sprint 2: Blog CRUD
epic: EPC-01
sprint: SPR-02
status: APPROVED
version: 1.0
author: AI (Antigravity)
date: 2026-02-22
---

# SRS-SPR02: Blog CRUD

## 1. Introduction
Tài liệu này định nghĩa các yêu cầu phần mềm kỹ thuật cho Sprint 2 (Blog CRUD), thuộc Epic 01. Các yêu cầu này được phân rã từ US-09 đến US-14 trong tài liệu `URD-EPC01.md`.

## 2. Functional Requirements (FR)

| FR ID | Tên chức năng | User Story | Mô tả chi tiết |
|---|---|---|---|
| FR-02.1 | View Blog List | US-09 | Admin có thể xem danh sách bài viết. Fetch sử dụng Prisma `findMany`. Hiển thị Table với các cột: Tiêu đề, Trạng thái (Draft/Published), Thẻ (Tags), Ngày cập nhật. Cho phép phân trang và lọc theo trạng thái. |
| FR-02.2 | Create Blog Post | US-10 | Admin tạo bài viết mới bằng Tiptap Rich Text Editor. Các trường bắt buộc gồm Tiêu đề, Nội dung. Slug được tự động sinh `slugify()` từ Tiêu đề. |
| FR-02.3 | Unique Slug Generator | US-10 | Hệ thống tự động kiểm tra tính duy nhất của slug trong database, nếu trùng tự động append hậu tố `-2`, `-3`. |
| FR-02.4 | Edit Blog Post | US-11 | Load dữ liệu bài viết (bao gồm Tags và Rich Text HTML) vào form bằng Server Component. Cập nhật dữ liệu vào database bằng Server Action `updatePostAction`. |
| FR-02.5 | Tag Management | US-12 | Component Multi-select Creatable cho phép người dùng gõ tên Tag và Enter để thêm. Logic Backend sử dụng Prisma `connectOrCreate`. |
| FR-02.6 | Publish Toggle | US-13 | Nút chuyển đổi nhanh trạng thái giữa DRAFT và PUBLISHED trực tiếp trên danh sách. |
| FR-02.7 | Delete Post | US-14 | Xoá bài viết sử dụng `prisma.post.delete`. Cần có Alert/Dialog xác nhận trước khi gọi Server Action `deletePostAction`. |

## 3. Data Flow & Database Constraints

- `Post` table: Quan hệ n-n với `Tag` thông qua `TagsOnPosts`.
- **Delete Cascade**: Khi xoá bài viết, các bản ghi nối trong `TagsOnPosts` sẽ tự động xoá theo. Các thẻ (Tags) vẫn được giữ lại trong bảng `Tag`.
- **Validation**: Sử dụng Zod (`postSchema`) cho việc kiểm tra đầu vào trước khi insert/update vào Prisma.

## 4. UI/UX Requirements
- Sử dụng Radix UI / shadcn: `Table`, `DropdownMenu`, `Dialog`, `Badge`, `Toggle`.
- Trình soạn thảo Tiptap tuỳ biến với toolbar: Heading 1-3, Bold, Italic, Strikethrough, Bullet List, Numbered List, Link.

## 5. Security & Authentication
- Mọi thao tác CRUD bắt buộc gọi qua Next.js Server Actions có bao bọc `await requireAuth()`.
- Session được đọc từ NextAuth JWT lưu trong HTTP-Only cookie. Không quyền truy cập = throw Error Unauthorized 401.

## 6. Acceptance Criteria
- Mọi chức năng đạt được acceptance criteria định nghĩa trong US-09 đến US-14 của `URD-EPC01.md`.
- Test tự động (Unit Test / Zod Test) pass 100%.
