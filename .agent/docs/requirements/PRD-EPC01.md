---
id: PRD-EPC01
title: Product Requirements Document — Foundation, Blog & Portfolio (Admin + Public Web)
epic: docs/agile/epics/EPC-01-foundation-blog-portfolio.md
status: DRAFT
version: 1.1
author: AI (Antigravity)
date: 2026-02-22
---

# PRD-EPC01 — Foundation, Blog & Portfolio — Admin + Public Web

## 1. Executive Summary

**Blackmatte** là nền tảng cá nhân tích hợp CV, Blog và Gallery cho một cá nhân kỹ thuật. Epic 01 xây dựng toàn bộ nền tảng kỹ thuật, trao cho chủ trang khả năng quản lý nội dung qua Admin Portal, và hiển thị nội dung đó ra Website công khai để khách truy cập đọc. Đây là Epic thông luồng end-to-end đầu tiên.

---

## 2. Problem Statement

Hiện tại chủ trang không có hệ thống quản lý nội dung (CMS) riêng, phải cập nhật nội dung thủ công qua code hoặc các nền tảng của bên thứ ba. Điều này gây ra:

- **Khó khăn trong việc publish bài viết** — phải deploy lại toàn bộ app mỗi khi thêm bài mới
- **Không có khả năng lưu nháp** — không thể viết bài dần dần
- **Không có hệ thống quản lý portfolio** — danh sách project phải hard-code

---

## 3. Goals & Non-Goals

### Goals

| Goal | Success Metric |
|---|---|
| Admin có thể đăng nhập an toàn | Đăng nhập thành công với credentials từ `.env` |
| Admin có thể quản lý Blog Posts | Tạo/sửa/xóa/publish bài trong < 2 phút |
| Admin có thể quản lý Portfolio Projects | Tạo/sửa/xóa/sắp xếp project |
| Khách truy cập đọc được Blog & Portfolio | Website public hiển thị đúng nội dung đã publish |
| Thông luồng end-to-end | Admin publish bài → khách đọc được trong ≤ 5 phút |
| Hệ thống sẵn sàng cho các Epic sau | packages/ui, packages/config, DB schema được tái sử dụng |

### Non-Goals (Epic này KHÔNG giải quyết)

- Upload và quản lý hình ảnh / media
- Gallery, Certificate management
- Multi-language routing
- Comments, likes, view counter

---

## 4. Target Users

### Primary User: Owner / Admin (Chủ trang)

| Attribute | Detail |
|---|---|
| Số lượng | **Duy nhất 1 người** |
| Kỹ năng kỹ thuật | Cao (developer) |
| Thiết bị | Desktop browser chính |
| Ngôn ngữ UI | English |
| Ngôn ngữ nội dung | Tuỳ ý (blog có thể viết mọi ngôn ngữ) |

### Secondary User: Visitor / Reader (Khách truy cập)

| Attribute | Detail |
|---|---|
| Số lượng | Không giới hạn |
| Kỹ năng kỹ thuật | Bất kỳ |
| Thiết bị | Desktop và Mobile |
| Quyền | Chỉ xem (read-only) |
| Không cần | Đăng ký / đăng nhập |

---

## 5. Features Overview

### F-01: System Foundation

| ID | Feature | Priority |
|---|---|---|
| F-01.1 | Shared config package (`packages/config`) | P0 |
| F-01.2 | Shared UI package (`packages/ui` với shadcn/ui) | P0 |
| F-01.3 | Database schema definition + initial migration | P0 |
| F-01.4 | Admin credential seed (từ `.env`) | P0 |

### F-02: Admin Authentication

| ID | Feature | Priority |
|---|---|---|
| F-02.1 | Đăng nhập bằng Email + Password | P0 |
| F-02.2 | Session JWT 30 ngày, lưu trong HTTP-only Cookie | P0 |
| F-02.3 | Đăng xuất, xóa session | P0 |
| F-02.4 | Redirect chưa đăng nhập → trang Login | P0 |

### F-03: Blog Post Management

| ID | Feature | Priority |
|---|---|---|
| F-03.1 | Danh sách bài viết (filter theo status) | P0 |
| F-03.2 | Tạo bài viết mới với Tiptap editor | P0 |
| F-03.3 | Chỉnh sửa bài viết | P0 |
| F-03.4 | Slug tự động sinh từ title (unique) | P0 |
| F-03.5 | Gắn / bỏ Tags cho bài viết | P1 |
| F-03.6 | Chuyển trạng thái Draft ↔ Published | P0 |
| F-03.7 | Xóa bài viết (với confirmation) | P0 |

### F-04: Portfolio / Project Management

| ID | Feature | Priority |
|---|---|---|
| F-04.1 | Danh sách Projects (sort Priority + Date) | P0 |
| F-04.2 | Tạo project mới (full fields) | P0 |
| F-04.3 | Chỉnh sửa project | P0 |
| F-04.4 | Quản lý trạng thái project | P0 |
| F-04.5 | Priority field — sắp xếp độ ưu tiên | P1 |
| F-04.6 | Xóa project (với confirmation) | P0 |

### F-05: Website Public (apps/web)

| ID | Feature | Priority |
|---|---|---|
| F-05.1 | Header navigation + Footer | P0 |
| F-05.2 | Homepage — hero + preview Blog & Portfolio | P0 |
| F-05.3 | Blog list page — các bài published, filter theo tag | P0 |
| F-05.4 | Blog detail page — rendered rich text, SEO meta | P0 |
| F-05.5 | Portfolio list page — sort theo priority | P0 |
| F-05.6 | Portfolio detail page — full fields | P0 |
| F-05.7 | CV / Profile page | P0 |
| F-05.8 | ISR cache (5 phút) + on-demand revalidation khi Admin publish | P0 |

---

## 6. Data Entities Overview

> Chi tiết schema sẽ được định nghĩa đầy đủ trong SRS.

| Entity | Mô tả |
|---|---|
| `User` | Admin account (credentials từ `.env`, không có CRUD UI) |
| `Post` | Bài viết Blog |
| `Tag` | Tag phân loại bài viết |
| `PostTag` | Quan hệ Post ↔ Tag (many-to-many) |
| `Project` | Portfolio project đã làm |

---

## 7. Design References

- **UI Style**: [medium.com](https://medium.com) — clean, content-first, generous whitespace
- **Component Library**: shadcn/ui (Tailwind-based)
- **Rich Text Editor**: Tiptap (phong cách Medium — hỗ trợ heading, bold, italic, code block, blockquote, links)

---

## 8. Technical Constraints

| Constraint | Detail |
|---|---|
| Framework | Next.js 14+ App Router |
| Auth | NextAuth.js (Credentials Provider) |
| Database | PostgreSQL 16 qua Prisma |
| Admin DB User | `admin_user` (CRUD) |
| Web DB User | `web_user` (SELECT only) via `DATABASE_URL_WEB` |
| Session | JWT, 30 ngày, HTTP-only Cookie |
| Validation | Zod on all Server Actions |
| Security | Authorization check đầu mọi Server Action |
| Caching | ISR `revalidate: 300` (5 phút) + on-demand `revalidatePath` |
| XSS Protection | Sanitize Tiptap HTML trước `dangerouslySetInnerHTML` |
| Design Reference | medium.com (public web), shadcn/ui (admin portal) |

---

## 9. Success Criteria (Definition of Done — Epic Level)

- [ ] Admin đăng nhập / đăng xuất thành công
- [ ] Admin tạo, chỉnh sửa, publish, archive và xóa bài Blog
- [ ] Admin quản lý Tags và gắn vào bài viết
- [ ] Admin tạo, chỉnh sửa, sắp xếp và xóa Portfolio Projects
- [ ] Khách đọc được Blog và Portfolio trên website public
- [ ] Website public có SEO metadata đầy đủ (title, description, og:image)
- [ ] Admin publish bài → website cập nhật trong ≤ 5 phút
- [ ] `pnpm lint`, `pnpm type-check`, `pnpm build` pass toàn bộ monorepo
- [ ] Không có lỗ hổng bảo mật cơ bản (auth bypass, data leak, XSS)

---

## 10. Out of Scope (Explicit)

| Item | Sẽ làm ở Epic |
|---|---|
| Image upload, thumbnail | Epic Gallery |
| Gallery management | Epic Gallery |
| Certificate management | Epic Certificate |
| Comments, likes, views counter | TBD |
