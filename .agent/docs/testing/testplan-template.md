---
description: Template cho Test Plan — kịch bản kiểm thử theo từng tính năng
---

# Test Plan Template

> **Cách dùng**: Copy file này, đổi tên `testplan-EPCXXX-feature-name.md`, đặt vào `docs/testing/`. Phải có SRS trước mới viết Test Plan.

---

```markdown
---
srs: docs/requirements/srs-EPCXXX-feature-name.md
epic: docs/agile/epics/EPC-XXX.md
status: DRAFT         # DRAFT | APPROVED | COMPLETED
last_updated: YYYY-MM-DD
---

# Test Plan — [Tên Tính năng]

## 1. Phạm vi Kiểm thử (Test Scope)

- **In Scope**: Các tính năng sẽ test
- **Out of Scope**: Các tính năng sẽ không test trong plan này

---

## 2. Unit Tests

### UT-01 — [Tên hàm/component]

- **Target**: `src/lib/validators/postSchema`
- **Test type**: Unit
- **Input**: `{ title: '', content: 'valid' }`
- **Expected Output**: `{ success: false, error: ZodError }`
- **File**: `__tests__/unit/postSchema.test.ts`

---

## 3. Integration Tests

### IT-01 — [Tên Server Action / API]

- **Target**: `actions/createPost`
- **Test type**: Integration
- **Setup**: User Admin đã login, DB test đã sạch
- **Steps**:
  1. Gọi `createPost({ title: 'Test', content: 'Content' })`
  2. Kiểm tra response
  3. Kiểm tra record trong DB
- **Expected**: Post được tạo với status `DRAFT`, `authorId` đúng
- **File**: `__tests__/integration/createPost.integration.test.ts`

### IT-02 — [Tên test thất bại]

- **Target**: `actions/createPost`
- **Setup**: User không có quyền Admin
- **Expected**: Throw `UnauthorizedError`

---

## 4. E2E Tests

### E2E-01 — [Tên User Flow]

- **Tool**: Playwright
- **Flow**: Admin tạo bài viết mới
- **Steps**:
  1. Mở `/admin/posts/new`
  2. Điền title và content
  3. Click "Lưu nháp"
  4. Kiểm tra redirect về `/admin/posts`
  5. Kiểm tra bài vừa tạo xuất hiện trong danh sách
- **Expected**: Pass không lỗi
- **File**: `e2e/admin-create-post.spec.ts`

---

## 5. Test Checklist (Pre-Delivery)

- [ ] Tất cả Unit Tests pass
- [ ] Tất cả Integration Tests pass
- [ ] E2E flows pass
- [ ] Coverage ≥ 80% với business logic mới
- [ ] Không có `console.error` bất thường trong test output
```
