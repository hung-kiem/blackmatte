---
id: URD-EPC01
title: User Requirements Document — Foundation, Blog & Portfolio (Admin + Public Web)
epic: EPC-01
prd: PRD-EPC01.md
status: DRAFT
version: 1.1
author: AI (Antigravity)
date: 2026-02-22
---

# URD-EPC01 — User Requirements Document
## Epic 01: Foundation, Blog & Portfolio — Admin + Public Web

---

## 1. Introduction

### 1.1 Purpose

Tài liệu này mô tả các yêu cầu từ góc nhìn người dùng cho Epic 01. Mỗi yêu cầu được diễn đạt dưới dạng **User Story** theo chuẩn quốc tế, kèm **Acceptance Criteria** rõ ràng để làm cơ sở cho kiểm thử và phát triển.

### 1.2 Actors

| Actor | Ký hiệu | Mô tả |
|---|---|---|
| **Admin** | `[Admin]` | Chủ trang — người duy nhất có quyền quản lý nội dung |
| **Visitor** | `[Visitor]` | Khách truy cập — đọc nội dung, không cần đăng nhập |
| **System** | `[System]` | Hệ thống tự động — thực hiện các tác vụ nền |

### 1.3 Priority (MoSCoW)

| Ký hiệu | Ý nghĩa |
|---|---|
| **M** — Must Have | Bắt buộc, không có thì hệ thống không hoạt động |
| **S** — Should Have | Quan trọng, nên có trong Epic này |
| **C** — Could Have | Tốt nếu có, có thể defer |
| **W** — Won't Have | Không làm trong Epic này |

---

## 2. System Foundation Requirements

### US-01: Khởi tạo Shared Config Package

> **As an** Admin,
> **I want** the development environment to enforce consistent code style and TypeScript rules across all apps,
> **so that** the codebase remains maintainable and error-free at scale.

**Priority:** M | **Feature:** F-01.1 | **Sprint:** SPR-01

**Acceptance Criteria:**
- AC-01.1: `packages/config` cung cấp ESLint config được tất cả apps import thành công
- AC-01.2: `packages/config` cung cấp TypeScript base config (`tsconfig.json`)
- AC-01.3: Chạy `pnpm lint` tại root không báo lỗi cấu hình

---

### US-02: Khởi tạo Shared UI Package

> **As an** Admin,
> **I want** a shared library of reusable UI components (Button, Input, Card, Dialog),
> **so that** both `apps/web` and `apps/admin` look consistent without duplicating code.

**Priority:** M | **Feature:** F-01.2 | **Sprint:** SPR-01

**Acceptance Criteria:**
- AC-02.1: `packages/ui` export ít nhất: Button, Input, Card, Badge, Dialog, Textarea components
- AC-02.2: `apps/admin` import và render thành công component từ `@repo/ui`
- AC-02.3: Components dựa trên shadcn/ui và Tailwind CSS
- AC-02.4: Tailwind CSS được cấu hình **dark mode class** (`darkMode: 'class'`) — được bật mặc định trên `<html>` element

---

### US-03: Khởi tạo Database Schema và Migration

> **As an** Admin,
> **I want** the database structure to be defined in code (Prisma schema),
> **so that** I can track, version, and reproduce the database structure in any environment.

**Priority:** M | **Feature:** F-01.3 | **Sprint:** SPR-01

**Acceptance Criteria:**
- AC-03.1: `schema.prisma` định nghĩa đầy đủ tất cả entities: User, Post, Tag, PostTag, Project, Profile
- AC-03.2: Chạy `prisma migrate dev --name init` tạo thành công file migration và apply vào DB
- AC-03.3: Migration file được commit vào Git trong `prisma/migrations/`
- AC-03.4: Chạy `prisma studio` hiển thị đúng tất cả tables

---

### US-04: Khởi tạo Admin Credentials

> **As an** Admin,
> **I want** my login credentials to be provisioned securely via environment variables (not hard-coded in source code),
> **so that** my credentials are never exposed in the codebase or version control.

**Priority:** M | **Feature:** F-01.4 | **Sprint:** SPR-01

**Acceptance Criteria:**
- AC-04.1: Credentials (email + hashed password) được seed vào DB khi chạy `prisma db seed`, đọc giá trị từ `.env` (`ADMIN_EMAIL`, `ADMIN_PASSWORD`)
- AC-04.2: Password được hash bằng bcrypt trước khi lưu (không lưu plain text)
- AC-04.3: Không có credentials nào xuất hiện trong source code hoặc migration files
- AC-04.4: Chạy seed lần 2 không tạo duplicate user (idempotent)

---

## 3. Admin Authentication Requirements

### US-05: Đăng nhập Admin Portal

> **As an** Admin,
> **I want** to log in to the Admin Portal using my email and password,
> **so that** I can securely access content management features.

**Priority:** M | **Feature:** F-02.1 | **Sprint:** SPR-01

**Acceptance Criteria:**
- AC-05.1: Trang `/login` hiển thị form với 2 fields: Email và Password
- AC-05.2: Đăng nhập thành công với đúng credentials → redirect đến `/dashboard`
- AC-05.3: Đăng nhập thất bại với sai credentials → hiển thị error message "Invalid email or password"
- AC-05.4: Field Email validate format email (không cần backend round-trip)
- AC-05.5: Field Password có toggle show/hide
- AC-05.6: Form không cho phép submit khi fields trống

---

### US-06: Duy trì phiên đăng nhập (Session)

> **As an** Admin,
> **I want** my login session to persist for 30 days without requiring me to log in again,
> **so that** I can work without interruption across multiple sessions.

**Priority:** M | **Feature:** F-02.2 | **Sprint:** SPR-01

**Acceptance Criteria:**
- AC-06.1: Session JWT được lưu trong HTTP-only cookie (không accessible từ JavaScript)
- AC-06.2: Session tồn tại 30 ngày tính từ lần đăng nhập gần nhất
- AC-06.3: Sau 30 ngày không hoạt động, session tự hết hạn và Admin bị redirect về `/login`
- AC-06.4: Reload trang không mất session

---

### US-07: Đăng xuất Admin Portal

> **As an** Admin,
> **I want** to log out of the Admin Portal,
> **so that** my session is terminated and my account is secure on shared devices.

**Priority:** M | **Feature:** F-02.3 | **Sprint:** SPR-01

**Acceptance Criteria:**
- AC-07.1: Nút "Sign Out" xuất hiện ở header/sidebar khi đã đăng nhập
- AC-07.2: Sau khi đăng xuất, cookie session bị xóa
- AC-07.3: Sau khi đăng xuất, truy cập bất kỳ route protected nào đều redirect về `/login`
- AC-07.4: Browser Back button sau khi đăng xuất không thể quay lại trang protected

---

### US-08: Bảo vệ Route Admin

> **As an** Admin,
> **I want** all Admin Portal pages (except login) to be protected from unauthenticated access,
> **so that** no one can access content management without valid credentials.

**Priority:** M | **Feature:** F-02.4 | **Sprint:** SPR-01

**Acceptance Criteria:**
- AC-08.1: Truy cập bất kỳ route `/dashboard/*` khi chưa đăng nhập → redirect về `/login`
- AC-08.2: URL ban đầu được lưu và redirect về sau khi đăng nhập thành công (login redirect)
- AC-08.3: Middleware kiểm tra session trên mọi request đến admin routes

---

## 4. Blog Post Management Requirements

### US-09: Xem danh sách bài viết

> **As an** Admin,
> **I want** to see a list of all blog posts with their status, title, and date,
> **so that** I can quickly find and manage any post.

**Priority:** M | **Feature:** F-03.1 | **Sprint:** SPR-02

**Acceptance Criteria:**
- AC-09.1: Danh sách hiển thị: Title, Status (Draft/Published), Tags, ngày tạo, ngày cập nhật
- AC-09.2: Filter theo status: All / Draft / Published
- AC-09.3: Danh sách sắp xếp mặc định theo `updatedAt` mới nhất trước
- AC-09.4: Mỗi row có action: Edit, Delete, Toggle Status (Publish/Unpublish)
- AC-09.5: Hiển thị tổng số bài + phân trang nếu > 20 bài

---

### US-10: Tạo bài viết Blog mới

> **As an** Admin,
> **I want** to create a new blog post using a rich text editor similar to Medium,
> **so that** I can write and format content comfortably without knowing HTML.

**Priority:** M | **Feature:** F-03.2 | **Sprint:** SPR-02

**Acceptance Criteria:**
- AC-10.1: Form tạo bài có fields: Title (required), Content (Tiptap editor, required), Tags (optional), Status (Draft mặc định)
- AC-10.2: Tiptap editor hỗ trợ: Heading 1/2/3, Bold, Italic, Strikethrough, Blockquote, Code inline, Code block, Bullet list, Numbered list, Link (với URL input), Horizontal rule
- AC-10.3: Slug tự động sinh từ Title (kebab-case, lowercase, không dấu) và hiển thị preview slug ngay dưới Title field
- AC-10.4: Nếu slug đã tồn tại, hệ thống tự thêm suffix `-2`, `-3`... để đảm bảo unique
- AC-10.5: Save as Draft — lưu bài mà không publish
- AC-10.6: Publish Now — lưu bài và set status = Published, publishedAt = now()
- AC-10.7: Sau khi tạo thành công → redirect về trang edit bài đó

---

### US-11: Chỉnh sửa bài viết Blog

> **As an** Admin,
> **I want** to edit an existing blog post,
> **so that** I can correct mistakes or update content after publication.

**Priority:** M | **Feature:** F-03.3 | **Sprint:** SPR-02

**Acceptance Criteria:**
- AC-11.1: Trang Edit load đúng nội dung bài viết hiện tại vào các fields
- AC-11.2: Tiptap editor load đúng nội dung rich text đã lưu
- AC-11.3: Admin có thể thay đổi Title, Content, Tags, Status
- AC-11.4: Thay đổi Title KHÔNG tự động cập nhật Slug (tránh break URL đang có)
- AC-11.5: Lưu thành công → toast notification "Post updated successfully"
- AC-11.6: Đổi status → Published lần đầu: set `publishedAt` = now()

---

### US-12: Quản lý Tags bài viết

> **As an** Admin,
> **I want** to add and remove tags on blog posts,
> **so that** readers can filter content by topic on the public website.

**Priority:** S | **Feature:** F-03.5 | **Sprint:** SPR-02

**Acceptance Criteria:**
- AC-12.1: Input Tags cho phép gõ tên tag và thêm bằng Enter hoặc dấu phẩy
- AC-12.2: Khi gõ, hiển thị suggestions từ các tag đã tồn tại trong DB
- AC-12.3: Có thể xóa tag khỏi bài bằng cách click "×" trên tag chip
- AC-12.4: Tag mới (chưa tồn tại trong DB) được tự động tạo khi lưu bài
- AC-12.5: Tag name: không phân biệt chữ hoa/thường khi matching (VD: "NextJS" = "nextjs")

---

### US-13: Publish / Unpublish bài viết

> **As an** Admin,
> **I want** to publish or unpublish a blog post with a single click,
> **so that** I can control what content is visible to the public without deleting it.

**Priority:** M | **Feature:** F-03.6 | **Sprint:** SPR-02

**Acceptance Criteria:**
- AC-13.1: Toggle Publish từ list page hoạt động mà không cần vào trang Edit
- AC-13.2: Bài Published → Unpublished: status = Draft, bài biến mất khỏi website public (sau ISR)
- AC-13.3: Bài Draft → Published: status = Published, `publishedAt` = now() (nếu chưa có), trigger `revalidatePath` trên website
- AC-13.4: UI phản hồi ngay lập tức (optimistic update hoặc loading state)

---

### US-14: Xóa bài viết Blog

> **As an** Admin,
> **I want** to permanently delete a blog post after confirming the action,
> **so that** I can remove outdated or incorrect content.

**Priority:** M | **Feature:** F-03.7 | **Sprint:** SPR-02

**Acceptance Criteria:**
- AC-14.1: Click Delete → hiển thị confirmation dialog: "Are you sure you want to delete '[title]'? This action cannot be undone."
- AC-14.2: Confirm → xóa bài khỏi DB và redirect về danh sách
- AC-14.3: Cancel → dialog đóng, không có thay đổi
- AC-14.4: Sau khi xóa, các tags gắn với bài được xóa theo (cascade)

---

## 5. Portfolio / Project Management Requirements

### US-15: Xem danh sách Projects

> **As an** Admin,
> **I want** to see a list of all portfolio projects with their status and priority,
> **so that** I can manage my showcased work efficiently.

**Priority:** M | **Feature:** F-04.1 | **Sprint:** SPR-03

**Acceptance Criteria:**
- AC-15.1: Danh sách hiển thị: Tên project, Trạng thái, Priority, Thời gian triển khai
- AC-15.2: Sort mặc định: Priority cao → thấp, rồi theo `createdAt` mới nhất
- AC-15.3: Filter theo trạng thái: All / Ongoing / Completed / Archived
- AC-15.4: Mỗi row có action: Edit, Delete

---

### US-16: Tạo Project mới

> **As an** Admin,
> **I want** to create a new portfolio project entry with all relevant details,
> **so that** visitors can learn about my work experience and expertise.

**Priority:** M | **Feature:** F-04.2 | **Sprint:** SPR-03

**Acceptance Criteria:**
- AC-16.1: Form tạo project có các fields:

| Field | Type | Required | Ghi chú |
|---|---|---|---|
| Tên project | Text | ✅ | Max 200 chars |
| Mô tả ngắn | Textarea | ✅ | Max 500 chars |
| Tech stack | Text | ✅ | Free text, VD: "Next.js, PostgreSQL" |
| Link demo | URL | ❌ | Validate URL format nếu có |
| Thời gian triển khai | Text | ❌ | Free text, VD: "Q1 2024 – Q2 2024" |
| Quy mô team | Text | ❌ | VD: "3 người", "Solo" |
| Vai trò | Text | ✅ | VD: "Lead Developer", "Fullstack" |
| Vấn đề nổi cộm | Textarea | ❌ | Thách thức đã giải quyết |
| Trạng thái | Enum | ✅ | Ongoing / Completed / Archived |
| Priority | Number | ✅ | Default = 0, số lớn hơn = ưu tiên hơn |

- AC-16.2: Sau tạo thành công → redirect về trang list
- AC-16.3: Validation lỗi hiển thị inline ngay dưới field tương ứng

---

### US-17: Chỉnh sửa Project

> **As an** Admin,
> **I want** to edit an existing project entry,
> **so that** I can keep portfolio information up-to-date.

**Priority:** M | **Feature:** F-04.3 | **Sprint:** SPR-03

**Acceptance Criteria:**
- AC-17.1: Trang Edit load đúng tất cả fields của project hiện tại
- AC-17.2: Tất cả fields có thể chỉnh sửa
- AC-17.3: Lưu thành công → toast notification "Project updated successfully"

---

### US-18: Điều chỉnh Priority Project

> **As an** Admin,
> **I want** to set a priority number on each project,
> **so that** the most important projects appear first on the public portfolio page.

**Priority:** S | **Feature:** F-04.5 | **Sprint:** SPR-03

**Acceptance Criteria:**
- AC-18.1: Field Priority là số nguyên (Integer), nhập trực tiếp trong form Edit
- AC-18.2: Danh sách projects sort theo Priority giảm dần (số lớn = hiện trước)
- AC-18.3: Default Priority = 0 khi tạo mới

---

### US-19: Xóa Project

> **As an** Admin,
> **I want** to delete a project after confirming,
> **so that** I can remove irrelevant entries from my portfolio.

**Priority:** M | **Feature:** F-04.6 | **Sprint:** SPR-03

**Acceptance Criteria:**
- AC-19.1: Click Delete → confirmation dialog tương tự US-14
- AC-19.2: Confirm → xóa project khỏi DB, redirect về list
- AC-19.3: Cancel → không có thay đổi

---

## 6. Website Public Requirements

### US-20: Xem Homepage

> **As a** Visitor,
> **I want** to see a homepage that introduces the owner and highlights their latest work,
> **so that** I can quickly understand who this person is and what they do.

**Priority:** M | **Feature:** F-05.2 | **Sprint:** SPR-04

**Acceptance Criteria:**
- AC-20.1: Homepage hiển thị: Hero section (tên, headline), Preview 3 bài Blog mới nhất (đã Published), Preview 3 Project có Priority cao nhất (status ≠ Archived)
- AC-20.2: Mỗi Blog preview có: Title, Excerpt (nếu có), ngày publish, tags
- AC-20.3: Mỗi Project preview có: Tên, Mô tả ngắn, Tech stack, Trạng thái
- AC-20.4: Links "See all posts" → `/blog`, "See all projects" → `/portfolio`
- AC-20.5: Page render trong < 2 giây (ISR cache)
- AC-20.6: Homepage có **contact section** hiển thị: Email (dạng mailto link), LinkedIn, GitHub

---

### US-21: Xem danh sách Blog Posts (Public)

> **As a** Visitor,
> **I want** to browse all published blog posts and filter by tag,
> **so that** I can find articles that match my interests.

**Priority:** M | **Feature:** F-05.3 | **Sprint:** SPR-04

**Acceptance Criteria:**
- AC-21.1: Chỉ hiển thị bài có status = Published
- AC-21.2: Danh sách sort theo `publishedAt` mới nhất trước
- AC-21.3: Mỗi card hiển thị: Title, Excerpt, Tags, ngày publish
- AC-21.4: Click tag → filter danh sách theo tag đó (URL: `/blog?tag=nextjs`)
- AC-21.5: Danh sách tất cả tags hiển thị dạng filter pills phía trên
- AC-21.6: Phân trang: 10 bài/trang hoặc infinite scroll (chọn trong SRS)

---

### US-22: Đọc bài viết Blog (Public)

> **As a** Visitor,
> **I want** to read a full blog post with proper formatting,
> **so that** I can consume the content comfortably.

**Priority:** M | **Feature:** F-05.4 | **Sprint:** SPR-04

**Acceptance Criteria:**
- AC-22.1: URL: `/blog/[slug]` — slug từ database
- AC-22.2: Nội dung Tiptap được render đúng định dạng: headings, bold/italic, code blocks (với syntax highlight), blockquotes, lists, links
- AC-22.3: HTML được sanitize trước khi render (chống XSS)
- AC-22.4: Metadata SEO: `<title>` = Post title, `<meta name="description">` = Excerpt, `og:title`, `og:description`
- AC-22.5: Truy cập slug không tồn tại → `404` page
- AC-22.6: Truy cập bài Draft → `404` page (không lộ nội dung chưa publish)
- AC-22.7: Breadcrumb: Home > Blog > [title]

---

### US-23: Xem danh sách Portfolio (Public)

> **As a** Visitor,
> **I want** to see a list of the owner's portfolio projects,
> **so that** I can evaluate their experience and skills.

**Priority:** M | **Feature:** F-05.5 | **Sprint:** SPR-04

**Acceptance Criteria:**
- AC-23.1: Chỉ hiển thị projects có status ≠ Archived
- AC-23.2: Sort theo Priority giảm dần, rồi theo `createdAt` mới nhất
- AC-23.3: Mỗi card hiển thị: Tên, Mô tả ngắn, Tech stack, Thời gian triển khai, Trạng thái, Link demo (nếu có)

---

### US-24: Xem chi tiết Project (Public)

> **As a** Visitor,
> **I want** to view the full details of a portfolio project,
> **so that** I can understand the scope, my role, and problems solved.

**Priority:** M | **Feature:** F-05.6 | **Sprint:** SPR-04

**Acceptance Criteria:**
- AC-24.1: URL: `/portfolio/[id]` hoặc `/portfolio/[slug]` (xác định trong SRS)
- AC-24.2: Hiển thị đầy đủ tất cả fields: Tên, Mô tả ngắn, Tech stack, Link demo, Thời gian triển khai, Quy mô team, Vai trò, Vấn đề nổi cộm, Trạng thái
- AC-24.3: Metadata SEO đầy đủ
- AC-24.4: Truy cập project Archived → `404` page

---

### US-25: Xem trang CV / Profile (Public)

> **As a** Visitor,
> **I want** to view the owner's professional profile and CV,
> **so that** I can learn about their background and contact them.

**Priority:** M | **Feature:** F-05.7 | **Sprint:** SPR-04

**Acceptance Criteria:**
- AC-25.1: URL: `/about`
- AC-25.2: Hiển thị: displayName, headline, bio
- AC-25.3: **Thông tin liên hệ** hiển thị rõ ràng:
  - Email (dạng `mailto:` link, có icon)
  - LinkedIn URL (mở tab mới)
  - GitHub URL (mở tab mới)
  - Website (nếu có)
- AC-25.4: Nếu `cvPdfUrl` có giá trị → hiển thị nút "Download CV" link tới file PDF
- AC-25.5: SEO metadata: title = "About — [displayName]", description = headline

---

### US-26: ISR — Tự động cập nhật Website sau khi Admin Publish

> **As a** Visitor,
> **I want** to see newly published content appear on the website within a few minutes,
> **so that** the website stays current without requiring a full deployment.

**Priority:** M | **Feature:** F-05.8 | **Sprint:** SPR-04

**Acceptance Criteria:**
- AC-26.1: Tất cả trang public có ISR với `revalidate = 300` (5 phút)
- AC-26.2: Khi Admin publish bài → Server Action gọi `revalidatePath('/blog')` và `revalidatePath('/blog/[slug]')` ngay lập tức
- AC-26.3: Khi Admin unpublish bài → tương tự gọi revalidate
- AC-26.4: Bài mới xuất hiện trên website tối đa sau 5 phút (không cần deploy)

---

### US-27: Navigation và Header / Footer

> **As a** Visitor,
> **I want** consistent navigation across all pages,
> **so that** I can move between sections easily.

**Priority:** M | **Feature:** F-05.1 | **Sprint:** SPR-04

**Acceptance Criteria:**
- AC-27.1: Header chứa: Logo/Tên trang (`blackmatte.dev`), links đến Blog, Portfolio, About
- AC-27.2: Footer chứa: Copyright "© [year] blackmatte.dev", icon links Email + LinkedIn + GitHub (từ Profile data)
- AC-27.3: Active link trong header được highlight theo route hiện tại
- AC-27.4: Responsive: Header collapse thành hamburger menu trên mobile

---

## 7. Non-Functional Requirements (NFR)

### NFR-01: Performance

| ID | Requirement | Target |
|---|---|---|
| NFR-01.1 | Thời gian load trang public (ISR cache hit) | < 1 giây |
| NFR-01.2 | Thời gian load trang admin (server render) | < 2 giây |
| NFR-01.3 | Time to First Byte (TTFB) | < 200ms |

### NFR-02: Security

| ID | Requirement |
|---|---|
| NFR-02.1 | Tất cả admin routes được bảo vệ bằng session check ở middleware |
| NFR-02.2 | Password được hash bằng bcrypt (cost factor ≥ 12) |
| NFR-02.3 | Session token lưu trong HTTP-only cookie (không thể access từ JS) |
| NFR-02.4 | Tất cả Server Actions validate input bằng Zod schema |
| NFR-02.5 | Tiptap HTML output được sanitize trước khi render (`dangerouslySetInnerHTML`) |
| NFR-02.6 | `web_user` DB user chỉ có quyền SELECT — không thể ghi dữ liệu |
| NFR-02.7 | Không trả về `passwordHash` trong bất kỳ API response hoặc Server Component nào |

### NFR-03: SEO & Accessibility

| ID | Requirement |
|---|---|
| NFR-03.1 | Mỗi trang public có unique `<title>` và `<meta name="description">` |
| NFR-03.2 | Open Graph tags (`og:title`, `og:description`) trên Blog và Portfolio pages |
| NFR-03.3 | Semantic HTML: sử dụng đúng `<article>`, `<nav>`, `<main>`, `<header>`, `<footer>` |
| NFR-03.4 | Images (khi có) cần `alt` attribute |

### NFR-04: Reliability

| ID | Requirement |
|---|---|
| NFR-04.1 | `pnpm lint`, `pnpm type-check`, `pnpm build` phải pass 100% trước khi merge |
| NFR-04.2 | ISR cache fallback: nếu DB down, trang tĩnh vẫn phục vụ từ cache |
| NFR-04.3 | Database migration phải backward compatible (không DROP column khi update) |

### NFR-05: Design — Dark Mode Only

| ID | Requirement |
|---|---|
| NFR-05.1 | Cả `apps/web` và `apps/admin` đều **chỉ dùng Dark Mode** — không có light mode toggle |
| NFR-05.2 | `<html>` element luôn có class `dark` (Tailwind dark mode class strategy) |
| NFR-05.3 | Color palette đồng nhất với domain brand `blackmatte.dev`: nền tối, typography sáng |
| NFR-05.4 | shadcn/ui components được cấu hình dark theme biến CSS (`--background`, `--foreground`, etc.) |
| NFR-05.5 | Không có `prefers-color-scheme` logic — dark mode được force, không theo OS setting |

---

## 8. User Story Summary

| ID | User Story | Actor | Priority | Sprint |
|---|---|---|---|---|
| US-01 | Khởi tạo Shared Config Package | System | M | SPR-01 |
| US-02 | Khởi tạo Shared UI Package | System | M | SPR-01 |
| US-03 | Khởi tạo Database Schema và Migration | System | M | SPR-01 |
| US-04 | Khởi tạo Admin Credentials | System | M | SPR-01 |
| US-05 | Đăng nhập Admin Portal | Admin | M | SPR-01 |
| US-06 | Duy trì phiên đăng nhập | Admin | M | SPR-01 |
| US-07 | Đăng xuất Admin Portal | Admin | M | SPR-01 |
| US-08 | Bảo vệ Route Admin | Admin | M | SPR-01 |
| US-09 | Xem danh sách bài viết | Admin | M | SPR-02 |
| US-10 | Tạo bài viết Blog mới | Admin | M | SPR-02 |
| US-11 | Chỉnh sửa bài viết Blog | Admin | M | SPR-02 |
| US-12 | Quản lý Tags bài viết | Admin | S | SPR-02 |
| US-13 | Publish / Unpublish bài viết | Admin | M | SPR-02 |
| US-14 | Xóa bài viết Blog | Admin | M | SPR-02 |
| US-15 | Xem danh sách Projects | Admin | M | SPR-03 |
| US-16 | Tạo Project mới | Admin | M | SPR-03 |
| US-17 | Chỉnh sửa Project | Admin | M | SPR-03 |
| US-18 | Điều chỉnh Priority Project | Admin | S | SPR-03 |
| US-19 | Xóa Project | Admin | M | SPR-03 |
| US-20 | Xem Homepage | Visitor | M | SPR-04 |
| US-21 | Xem danh sách Blog Posts (Public) | Visitor | M | SPR-04 |
| US-22 | Đọc bài viết Blog (Public) | Visitor | M | SPR-04 |
| US-23 | Xem danh sách Portfolio (Public) | Visitor | M | SPR-04 |
| US-24 | Xem chi tiết Project (Public) | Visitor | M | SPR-04 |
| US-25 | Xem trang CV / Profile (Public) | Visitor | M | SPR-04 |
| US-26 | ISR — Cập nhật Website sau khi Publish | System | M | SPR-04 |
| US-27 | Navigation Header / Footer | Visitor | M | SPR-04 |

---

## 9. Changelog

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-02-22 | Initial release — 27 User Stories |
| 1.1 | 2026-02-22 | Added dark mode only (NFR-05); added email/LinkedIn/GitHub contact info (US-20, US-25, US-27); URL `/about` được chốt; domain `blackmatte.dev` |
