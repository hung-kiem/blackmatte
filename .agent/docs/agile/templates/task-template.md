---
description: Template cho Task File — đơn vị nhỏ nhất mà AI và Dev thực thi
---

# Task Template

> **Cách dùng**: Copy file này, đổi tên thành `TSK-XXX-short-name.md`, đặt vào `.agent/tasks/`. Điền đầy đủ trước khi giao AI.

---

```markdown
---
id: TSK-XXX
title: [Tên ngắn gọn, rõ ràng]
epic: docs/agile/epics/EPC-XXX.md
sprint: docs/agile/sprints/SPR-XXX.md
status: TODO          # TODO | IN_PROGRESS | BLOCKED | DONE | CANCELLED
priority: MEDIUM      # LOW | MEDIUM | HIGH | CRITICAL
assigned_to: AI       # AI | Human | AI+Human
estimated_points: 3   # Story Points: 1, 2, 3, 5, 8, 13
created_date: YYYY-MM-DD
---

## 🎯 Mục tiêu (Goal)

Một câu mô tả rõ task này làm gì và tại sao cần làm.

_Ví dụ: Khởi tạo Prisma schema với các model User, Post, Gallery và setup migration đầu tiên._

---

## 📖 User Story

"Là một [User/Admin], tôi muốn [hành động] để [đạt được lợi ích gì]."

---

## ✅ Acceptance Criteria

> AI dùng list này để tự kiểm tra trước khi Delivery.

- [ ] Điều kiện chức năng 1
- [ ] Điều kiện chức năng 2
- [ ] Điều kiện kỹ thuật 3
- [ ] ESLint pass: `npm run lint`
- [ ] TypeScript pass: `tsc --noEmit`
- [ ] Build pass: `npm run build`

---

## 📐 Technical Notes

- **Approach đề xuất**: ...
- **Layer cần thay đổi**: DB / Service / UI / All
- **Dependencies (task cần xong trước)**: TSK-XXX
- **Files dự kiến thay đổi**:
  - `project/packages/database/prisma/schema.prisma`
  - `project/apps/web/src/...`
- **Tuyệt đối tránh**: ...

---

## 🔗 References

- SRS: _(link)_
- URD: _(link)_
- Test Plan: _(link)_
- ADR: _(link nếu có quyết định kiến trúc)_

---

## 📝 Progress Log

| DateTime | Update |
|---|---|
| YYYY-MM-DD HH:MM | Bắt đầu task |
| YYYY-MM-DD HH:MM | ... |
```
