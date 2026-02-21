---
description: Template cho URD — User Requirements Document
---

# URD Template (User Requirements Document)

> **Cách dùng**: Copy file này, đổi tên `urd-EPCXXX-feature-name.md`, đặt vào `docs/requirements/`.

---

```markdown
---
epic: docs/agile/epics/EPC-XXX.md
sprint: docs/agile/sprints/SPR-XXX.md
task: .agent/tasks/TSK-XXX.md
status: DRAFT         # DRAFT | REVIEWING | APPROVED
version: 1.0
last_updated: YYYY-MM-DD
---

# URD — [Tên Tính năng]

## 1. Bối cảnh & Mục tiêu (Context & Goal)

> Viết từ góc độ người dùng cuối (End-user) hoặc Business. KHÔNG dùng từ ngữ kỹ thuật.

**Vấn đề hiện tại**: ...
**Mục tiêu muốn đạt**: ...

---

## 2. Actors (Người dùng liên quan)

| Actor | Mô tả |
|---|---|
| Guest (Khách) | Người dùng chưa đăng nhập |
| Admin | Người quản trị hệ thống |

---

## 3. User Stories

### [US-01] — [Tên Story]

> "Là một **[Actor]**, tôi muốn **[hành động]** để **[lợi ích đạt được]**."

**Priority**: HIGH / MEDIUM / LOW
**Acceptance Criteria**:
- [ ] Khi... thì...
- [ ] Khi... thì...

---

### [US-02] — [Tên Story]

> "Là một **[Actor]**, tôi muốn **[hành động]** để **[lợi ích đạt được]**."

**Priority**: ...
**Acceptance Criteria**:
- [ ] ...

---

## 4. Non-Functional Requirements

- **Performance**: Trang tải trong < Xms
- **Security**: Chỉ Admin mới truy cập được
- **Accessibility**: Hỗ trợ keyboard navigation

---

## 5. Mockup / UI References

- Figma link: _(nếu có)_
- Mô tả layout: _(text description)_
```
