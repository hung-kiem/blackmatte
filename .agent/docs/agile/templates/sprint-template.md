---
description: Template cho Sprint File — kế hoạch 1–2 tuần làm việc
---

# Sprint Template

> **Cách dùng**: Copy file này, đổi tên thành `SPR-XXX.md`, đặt vào `.agent/docs/agile/sprints/`.

---

```markdown
---
id: SPR-XXX
goal: [Sprint Goal — 1 câu mô tả kết quả kỳ vọng]
start_date: YYYY-MM-DD
end_date: YYYY-MM-DD
status: PLANNED       # PLANNED | ACTIVE | COMPLETED | CANCELLED
total_points: 0
completed_points: 0
---

## 🎯 Sprint Goal

Hoàn thiện [mục tiêu cụ thể] để [lý do — giá trị cho người dùng/hệ thống].

_Ví dụ: Hoàn thiện DB Schema và Prisma setup để unblock toàn bộ development trong Sprint tiếp theo._

---

## 📋 Sprint Backlog

| Task ID | Tên Task | Points | Assignee | Status |
|---|---|---|---|---|
| TSK-XXX | ... | 3 | AI | TODO |
| TSK-XXX | ... | 2 | Human | TODO |

**Tổng Points commit**: 0

---

## 🚧 Blockers & Notes

> Ghi lại các trở ngại xuất hiện trong Sprint và cách xử lý.

| Ngày | Blocker | Giải pháp |
|---|---|---|
| YYYY-MM-DD | ... | ... |

---

## 📊 Sprint Review (Điền khi kết thúc Sprint)

- **Hoàn thành**: X / Y tasks (Z points)
- **Chưa xong**: (liệt kê và lý do)
- **Học được**: ...
- **Cải thiện cho Sprint sau**: ...
```
