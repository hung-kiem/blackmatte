---
description: Template cho SRS — Software Requirements Specification
---

# SRS Template (Software Requirements Specification)

> **Cách dùng**: Copy file này, đổi tên `srs-EPCXXX-feature-name.md`, đặt vào `docs/requirements/`. File SRS là bản "dịch" kỹ thuật của URD — phải có URD trước.

---

```markdown
---
urd: docs/requirements/urd-EPCXXX-feature-name.md
epic: docs/agile/epics/EPC-XXX.md
sprint: docs/agile/sprints/SPR-XXX.md
status: DRAFT         # DRAFT | REVIEWING | APPROVED
version: 1.0
last_updated: YYYY-MM-DD
---

# SRS — [Tên Tính năng]

## 1. Phạm vi & Tổng quan Kỹ thuật

Tính năng này ảnh hưởng đến:
- **Apps**: `apps/web` / `apps/admin` / cả hai
- **Layer**: Database / Service / UI

---

## 2. Database Changes

> Các thay đổi Prisma Schema cần thiết. Phải link sang `docs/database/erd.md` nếu có.

### Models mới / cập nhật
```prisma
model Post {
  id        String   @id @default(cuid())
  title     String
  content   String
  createdAt DateTime @default(now())
}
```

**Migration name**: `add_post_table`

---

## 3. Server Actions / API Specs

> Liệt kê các Server Actions cần tạo hoặc cập nhật.

### `createPost(data: CreatePostInput): Promise<Post>`
- **Input Schema (Zod)**:
  ```ts
  const CreatePostInput = z.object({
    title: z.string().min(1).max(200),
    content: z.string().min(1),
  })
  ```
- **Auth**: Yêu cầu Admin session
- **Lỗi có thể xảy ra**: UnauthorizedError, ValidationError
- **Output**: Post object (không bao gồm các field nhạy cảm)

---

## 4. UI Components cần tạo / cập nhật

| Component | Path | Mô tả |
|---|---|---|
| `PostForm` | `apps/admin/src/components/PostForm.tsx` | Form tạo/sửa bài viết |
| `PostList` | `apps/admin/src/app/posts/page.tsx` | Danh sách bài viết |

---

## 5. Caching & Revalidation Strategy

- Sau khi tạo/sửa Post: `revalidatePath('/blog')`, `revalidateTag('posts')`
- Fetch strategy: ISR với `next: { revalidate: 3600 }`

---

## 6. Security Checklist

- [ ] Server Action có Authorization check ở dòng đầu tiên
- [ ] Input được validate bằng Zod
- [ ] Response không trả về field nhạy cảm
- [ ] Không dùng `$queryRaw` với template string

---

## 7. Test Plan Reference

- Test Plan: `docs/testing/testplan-EPCXXX-feature-name.md`
```
