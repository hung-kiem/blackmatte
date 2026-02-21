---
description: Quy trình AI Review Code — kiểm tra PR hoặc code theo yêu cầu
---

# Code Review Workflow

AI khi được yêu cầu review code (PR, file, hoặc đoạn code cụ thể) phải đi qua checklist này một cách có hệ thống.

---

## Bước 1: Hiểu ngữ cảnh trước khi review

1. Đọc mô tả PR hoặc task liên quan (`tasks/TSK-XXX.md`).
2. Xác định: Đây là **feature mới**, **bugfix**, **refactor**, hay **hotfix**?
3. Đọc SRS/URD liên quan nếu là tính năng phức tạp.

---

## Bước 2: Review theo Layer (Từ trong ra ngoài)

### 🗄️ Layer 1 — Database (nếu có thay đổi Schema)

- [ ] Naming convention đúng theo `.agent/docs/database/naming-convention.md`?
- [ ] Migration file được tạo không (`prisma migrate dev --name ...`)?
- [ ] Index cần thiết đã có chưa? Xem `.agent/docs/database/index-strategy.md`
- [ ] ERD đã được cập nhật tại `docs/database/erd.md`?

### ⚙️ Layer 2 — Business Logic / Services

- [ ] Logic có vi phạm Clean Architecture không? (Không được có Prisma trong UI/Actions)
- [ ] Các edge case đã được xử lý chưa (null, empty, out-of-range)?
- [ ] Hàm có quá nhiều trách nhiệm không (Single Responsibility)?
- [ ] Có thể test được không (testable logic)?

### 🔒 Layer 3 — Security (Với mọi thay đổi liên quan đến data)

- [ ] Authorization check ở dòng đầu Server Action không?
- [ ] Input được validate bằng Zod không?
- [ ] Response có lộ field nhạy cảm (`passwordHash`, tokens) không?
- [ ] Không có hardcoded secrets không?

### 🎨 Layer 4 — UI / Frontend

- [ ] Component có dùng `"use client"` không cần thiết không?
- [ ] Image dùng `next/image` thay vì `<img>`?
- [ ] Link dùng `next/link` thay vì `<a>`?
- [ ] Metadata cho SEO đã có tại `page.tsx`?
- [ ] `loading.tsx` và `error.tsx` đã có cho route phức tạp?

---

## Bước 3: Code Quality Checklist

- [ ] TypeScript `strict` — không có `any`, không có `ts-ignore` bừa bãi?
- [ ] Naming: Component PascalCase, util/hook camelCase?
- [ ] Không có `console.log` debug còn sót lại?
- [ ] Error handling theo pattern tại `rules/error-handling.md`?
- [ ] Import paths dùng alias (`@/`, `@repo/`) thay vì relative `../../`?
- [ ] Không có dead code (code không được dùng)?

---

## Bước 4: Test Coverage

- [ ] Tính năng mới có unit test tương ứng không?
- [ ] Edge case (lỗi, auth fail) có được test không?
- [ ] Nếu bỏ qua test, có lý do chính đáng và được ghi chú không?

---

## Bước 5: Formatting & Linting

Yêu cầu tác giả (hoặc tự chạy):
```bash
npm run lint    # ESLint — phải pass 100%
npm run format  # Prettier
npm run build   # TypeScript + Next.js build check
```

---

## Bước 6: Viết Review Report

Sau khi review, AI tổng hợp theo format:

```markdown
## ✅ Review Passed / ⚠️ Cần sửa

### 🐛 Issues (Bắt buộc sửa)
1. [File:Line] Mô tả vấn đề → Đề xuất cách sửa

### 💡 Suggestions (Nên sửa, không bắt buộc)
1. [File:Line] Mô tả → Đề xuất

### 👍 Good Parts
- Điểm làm tốt trong PR này
```
