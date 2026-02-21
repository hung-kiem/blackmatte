---
description: Template cho Epic File — mô tả một tính năng lớn (Feature Group)
---

# Epic Template

> **Cách dùng**: Copy file này, đổi tên thành `EPC-XXX-short-name.md`, đặt vào `.agent/docs/agile/epics/`.

---

```markdown
---
id: EPC-XXX
title: [Tên Epic đầy đủ]
status: PLANNED       # PLANNED | IN_PROGRESS | DONE | CANCELLED
priority: HIGH        # LOW | MEDIUM | HIGH
owner: [Tên người phụ trách]
start_date: YYYY-MM-DD
target_date: YYYY-MM-DD
module: FE | ADMIN | DB | SYS  # Module chính bị ảnh hưởng
---

## 🎯 Mục tiêu (Objective)

Mô tả ngắn gọn mục đích của Epic này. Giải quyết vấn đề gì cho hệ thống hoặc người dùng?

_Ví dụ: Xây dựng Admin Portal với khả năng quản lý Blog Posts (CRUD) và phân quyền người dùng._

---

## 📦 Scope (Phạm vi)

### Trong Scope
- [ ] Tính năng A
- [ ] Tính năng B
- [ ] Tính năng C

### Ngoài Scope (Out of Scope)
> Rõ ràng những gì KHÔNG làm trong Epic này để tránh scope creep.
- ❌ Không bao gồm: ...

---

## 🗂️ Danh sách Sprints liên quan

| Sprint | Mục tiêu Sprint | Status |
|---|---|---|
| SPR-XXX | ... | PLANNED |

---

## 🗒️ Danh sách Tasks

| Task ID | Tên Task | Sprint | Status |
|---|---|---|---|
| TSK-XXX | ... | SPR-XXX | TODO |

---

## ⚠️ Rủi ro & Phụ thuộc (Risks & Dependencies)

- **Phụ thuộc kỹ thuật**: (VD: Phải xong EPC-01-DB-Schema trước)
- **Rủi ro**: (VD: AWS S3 setup phức tạp, cần research trước)

---

## 📊 Progress

- **Tổng Tasks**: 0
- **Hoàn thành**: 0 / 0
- **Ghi chú**: ...
```
