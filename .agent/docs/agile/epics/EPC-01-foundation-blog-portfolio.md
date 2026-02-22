---
id: EPC-01
title: Foundation, Blog & Portfolio — Admin + Public Web
status: IN_PROGRESS
priority: HIGH
owner: hung_kiem
start_date: 2026-02-22
target_date: TBD
module: DB, ADMIN, FE
---

# EPC-01 — Foundation, Blog & Portfolio — Admin + Public Web

## Objective

Xây dựng nền tảng hệ thống (Database, Auth, Shared Packages), Admin Portal để quản lý nội dung Blog và Portfolio, và Website public (`apps/web`) để khách truy cập đọc nội dung. Đây là Epic nền tảng, thông luồng end-to-end từ Admin viết bài đến khách đọc bài.

---

## Scope

### ✅ In Scope

- **Foundation**
  - Khởi tạo `packages/config` (ESLint, TypeScript shared configs)
  - Khởi tạo `packages/ui` (shadcn/ui base components)
  - Định nghĩa Database schema (User, Post, Tag, PostTag, Project)
  - Prisma migration đầu tiên + seed admin credentials từ `.env`
- **Auth**
  - Admin Portal: Đăng nhập / Đăng xuất bằng email + password (NextAuth Credentials Provider)
  - JWT session, 30 ngày
  - Admin credentials lưu trong `.env` (không trong DB)
- **Blog CRUD (Admin Portal)**
  - Tạo, chỉnh sửa, xóa bài viết
  - Rich text editor: Tiptap (phong cách Medium)
  - Tags: gắn tag tự do cho bài viết
  - Slug tự sinh từ title
  - Trạng thái: Draft / Published
  - Ngôn ngữ nội dung: tuỳ ý (không có routing đa ngôn ngữ)
- **Portfolio/Project CRUD (Admin Portal)**
  - Tạo, chỉnh sửa, xóa project đã làm
  - Fields: Tên, Mô tả ngắn, Tech stack (free text), Link demo, Thời gian triển khai (free text), Quy mô team, Vai trò, Vấn đề nổi cộm, Trạng thái, Priority
  - Sắp xếp theo ngày + trường Priority

- **Website Public (`apps/web`)** — Medium-inspired design, ISR caching
  - Homepage: Giới thiệu tổng quan
  - Blog list: Danh sách bài viết đã publish (filter theo tag)
  - Blog detail: Đọc bài viết với rendered rich text
  - Portfolio list: Danh sách project đã làm
  - Portfolio detail: Chi tiết 1 project
  - CV/Profile page: Giới thiệu bản thân
  - Navigation: Header + Footer
  - ISR revalidation: 5 phút (delay chấp nhận được)
  - DB access: `web_user` (SELECT only)

### ❌ Out of Scope (Epic này KHÔNG làm)

- Upload ảnh / thumbnail (defer sang Epic Gallery)
- Quản lý thư viện media
- Gallery management
- Certificate management
- Multi-language routing
- Comments, likes, view counter

---

## Sprints

| Sprint | Mục tiêu | Status |
|---|---|---|
| SPR-01 | Foundation: DB Schema + Auth + Shared Packages | PLANNED |
| SPR-02 | Blog CRUD (Admin Portal) | PLANNED |
| SPR-03 | Portfolio/Project CRUD (Admin Portal) | PLANNED |
| SPR-04 | Website Public — apps/web (Medium-style) | PLANNED |

---

## Tasks

| Task | Tên | Sprint | Status |
|---|---|---|---|
| TSK-01 | Setup packages/config | SPR-01 | TODO |
| TSK-02 | Setup packages/ui (shadcn/ui) | SPR-01 | TODO |
| TSK-03 | Define DB Schema + Migration init | SPR-01 | TODO |
| TSK-04 | Seed admin credentials | SPR-01 | TODO |
| TSK-05 | NextAuth Credentials setup (apps/admin) | SPR-01 | TODO |
| TSK-06 | Admin login/logout UI | SPR-01 | TODO |
| TSK-07 | Blog post list page | SPR-02 | TODO |
| TSK-08 | Blog post create/edit (Tiptap) | SPR-02 | TODO |
| TSK-09 | Tag management | SPR-02 | TODO |
| TSK-10 | Blog publish/draft workflow | SPR-02 | TODO |
| TSK-11 | Blog post delete | SPR-02 | TODO |
| TSK-12 | Project list page | SPR-03 | TODO |
| TSK-13 | Project create/edit form | SPR-03 | TODO |
| TSK-14 | Project priority & ordering | SPR-03 | TODO |
| TSK-15 | Project delete | SPR-03 | TODO |
| TSK-16 | Layout: Header + Footer navigation | SPR-04 | TODO |
| TSK-17 | Homepage | SPR-04 | TODO |
| TSK-18 | Blog list page (ISR, filter tag) | SPR-04 | TODO |
| TSK-19 | Blog detail page (rendered Tiptap content, ISR) | SPR-04 | TODO |
| TSK-20 | Portfolio list page (ISR) | SPR-04 | TODO |
| TSK-21 | Portfolio detail page (ISR) | SPR-04 | TODO |
| TSK-22 | CV / Profile page (ISR) | SPR-04 | TODO |
| TSK-23 | ISR revalidation khi Admin publish bài | SPR-04 | TODO |

---

## Risks & Dependencies

- **Dependency**: packages/config và packages/ui phải hoàn thành trước mọi task UI
- **Dependency**: SPR-01 (DB + Auth) phải done trước SPR-02/03; SPR-02/03 phải done trước SPR-04 (cần có data)
- **Risk**: Tiptap integration với Next.js App Router cần cấu hình `"use client"` cẩn thận
- **Risk**: NextAuth v5 (Auth.js) API thay đổi so với v4 — cần đọc docs beta
- **Risk**: Tiptap rendered output (HTML) trên `apps/web` cần sanitize để tránh XSS
- **Risk**: ISR revalidation path cần chính xác khi Admin publish để không bị stale cache
