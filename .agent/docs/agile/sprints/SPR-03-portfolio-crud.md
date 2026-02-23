---
id: SPR-03
goal: Xây dựng tính năng CRUD Portfolio Projects cho Admin Portal
start_date: TBD
end_date: TBD
status: PLANNED
total_points: 18
completed_points: 0
---

# SPR-03 — Portfolio CRUD

## Sprint Goal

Admin có đầy đủ khả năng quản lý danh sách các project đã làm — phục vụ cho trang CV/Portfolio công khai sau này.

---

## Sprint Backlog

| Task | Tên | Points | Assignee | Status |
|---|---|---|---|---|
| TSK-13 | Trang danh sách Projects (sort theo priority + date) | 3 | AI | TODO |
| TSK-14 | Form tạo/chỉnh sửa Project (full fields) | 8 | AI | TODO |
| TSK-15 | Project status management (Ongoing/Completed/Archived) | 2 | AI | TODO |
| TSK-16 | Priority field — tăng/giảm thứ tự ưu tiên | 3 | AI | TODO |
| TSK-17 | Xóa Project (soft confirm dialog) | 2 | AI | TODO |

**Tổng Points commit: 18**

---

## Definition of Done (Sprint)

- [ ] Admin có thể tạo project với đầy đủ fields: Tên, Mô tả, Tech stack, Link demo, Thời gian triển khai, Quy mô team, Vai trò, Vấn đề nổi cộm, Trạng thái, Priority
- [ ] Danh sách sort theo Priority (cao → thấp) rồi theo ngày tạo
- [ ] Admin có thể thay đổi Priority của từng project
- [ ] Admin có thể xóa project với confirmation
- [ ] Tất cả Server Actions validate input bằng Zod
- [ ] `pnpm lint` và `pnpm build` pass
