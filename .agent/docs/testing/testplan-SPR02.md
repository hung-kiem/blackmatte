---
id: Testplan-SPR02
title: Test Plan — Sprint 2: Blog CRUD
epic: EPC-01
sprint: SPR-02
status: DRAFT
version: 1.0
author: AI (Antigravity)
date: 2026-02-22
---

# Testplan-SPR02: Blog CRUD

## 1. Mục tiêu kiểm thử (Test Objectives)
Đảm bảo tính năng quản lý bài viết (Blog CRUD) hoạt động chính xác từ UI xuống Backend, các ràng buộc dữ liệu (Zod schemas) chặt chẽ và an toàn bảo mật (chỉ Admin mới có quyền truy cập).

## 2. Phạm vi kiểm thử (Scope)

### Trong phạm vi (In-Scope):
- Unit Tests: `postSchema` validation logic.
- Unit Tests: Utilities `slugify`.
- Integration Tests: Các Next.js Server Actions `createPostAction`, `updatePostAction`, `deletePostAction`, `togglePostStatusAction`. (Giả lập Database logic).

### Nằm ngoài phạm vi (Out-of-Scope):
- Playwright E2E UI testing cho Editor (Tiptap khá phức tạp để click-to-type qua AI, sẽ skip hoặc mock ở mức Unit).

## 3. Test Cases (Kịch bản kiểm thử)

### 3.1 Unit Test Cases

| TC-ID | Module | Input / Hành động | Kết quả mong đợi (Expected) |
|---|---|---|---|
| TC-UNIT-01 | zod postSchema | Missing `title` | Trả về lỗi Zod: "Title is required" |
| TC-UNIT-02 | zod postSchema | Valid object | Success = true |
| TC-UNIT-03 | zod postSchema | Invalid slug format (`Có Dấu`) | Trả về lỗi regex: Invalid slug format |

## 4. Công cụ (Tools & Libraries)
- Framework: `vitest`
- Mocking: `vi` function context của Vitest để mock session `getServerSession` và Prisma db.
