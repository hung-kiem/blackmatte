---
id: SPR-02
goal: Xây dựng tính năng CRUD Blog Posts cho Admin Portal
start_date: TBD
end_date: TBD
status: PLANNED
total_points: 26
completed_points: 0
---

# SPR-02 — Blog CRUD

## Sprint Goal

Admin có đầy đủ khả năng tạo, chỉnh sửa, quản lý trạng thái và xóa bài viết Blog, bao gồm gắn tag và rich text editor theo phong cách Medium.

---

## Sprint Backlog

| Task | Tên | Points | Assignee | Status |
|---|---|---|---|---|
| TSK-07 | Trang danh sách Blog Posts (list, search, filter status) | 5 | AI | TODO |
| TSK-08 | Form tạo/chỉnh sửa bài viết — Tiptap editor | 8 | AI | TODO |
| TSK-09 | Tag management — tạo, gắn tag cho bài viết | 5 | AI | TODO |
| TSK-10 | Publish / Unpublish workflow + auto-slug generation | 3 | AI | TODO |
| TSK-11 | Xóa bài viết (soft confirm dialog) | 2 | AI | TODO |
| TSK-12 | Blog API actions validation (Zod schemas) | 3 | AI | TODO |

**Tổng Points commit: 26**

---

## Definition of Done (Sprint)

- [ ] Admin có thể tạo bài viết với Tiptap editor (bold, italic, headings, code block, links)
- [ ] Slug tự động sinh từ title, không trùng lặp
- [ ] Admin có thể gắn/bỏ tag cho bài viết
- [ ] Admin có thể chuyển trạng thái Draft ↔ Published
- [ ] Admin có thể xóa bài viết với confirmation dialog
- [ ] Tất cả Server Actions validate input bằng Zod
- [ ] `pnpm lint` và `pnpm build` pass
