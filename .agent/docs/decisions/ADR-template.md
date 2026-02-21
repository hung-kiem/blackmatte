---
description: Template cho Architecture Decision Record (ADR) — ghi lại quyết định kiến trúc
---

# ADR Template (Architecture Decision Record)

> **Cách dùng**: Copy file này, đổi tên `ADR-XXX-short-title.md`, đặt vào `docs/decisions/`. Tạo ADR TRƯỚC hoặc NGAY SAU khi đưa ra quyết định kiến trúc quan trọng.

> **Khi nào cần ADR?** Khi quyết định ảnh hưởng đến: tech stack, database schema design lớn, authentication strategy, deployment infrastructure, performance architecture, hoặc bất kỳ thứ gì mà sau 6 tháng team sẽ hỏi "tại sao chúng ta làm thế này?".

---

```markdown
---
id: ADR-XXX
title: [Tên quyết định ngắn gọn]
status: PROPOSED      # PROPOSED | ACCEPTED | DEPRECATED | SUPERSEDED
date: YYYY-MM-DD
deciders: [Tên người đưa ra quyết định — AI, Tech Lead, etc.]
supersedes: ADR-XXX   # Nếu thay thế ADR cũ
superseded_by: ADR-XXX # Nếu bị thay thế bởi ADR mới hơn
---

# ADR-XXX — [Tên Quyết định]

## 🔍 Bối cảnh (Context)

> Mô tả tình huống, vấn đề, hoặc cơ hội dẫn đến cần phải đưa ra quyết định này.
> Viết khách quan, không thiên vị về phương án nào.

Hệ thống hiện đang... và chúng ta đang đối mặt với vấn đề...

---

## 🎯 Quyết định (Decision)

> Phát biểu rõ ràng quyết định được đưa ra.

Chúng ta sẽ sử dụng **[giải pháp được chọn]** vì...

---

## 🔄 Các phương án đã xem xét (Options Considered)

### Phương án A: [Tên]
- ✅ Ưu điểm: ...
- ❌ Nhược điểm: ...

### Phương án B: [Tên]
- ✅ Ưu điểm: ...
- ❌ Nhược điểm: ...

### Phương án C (Được chọn): [Tên]
- ✅ Ưu điểm: ...
- ❌ Nhược điểm / Trade-offs chấp nhận: ...

---

## 📊 Hậu quả & Trade-offs (Consequences)

### Tích cực
- ...

### Tiêu cực / Chi phí chấp nhận
- ...

### Rủi ro
- ...

---

## 🔗 References

- Link tài liệu tham khảo
- PR/issue liên quan
```
