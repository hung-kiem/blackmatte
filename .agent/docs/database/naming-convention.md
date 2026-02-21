---
description: Quy tắc đặt tên cho Database (Tables, Columns, Indexes)
---

# Database Naming Convention

Project Blackmatte tuân thủ bộ quy tắc đặt tên nhất quán sau để Prisma và PostgreSQL không bị xung đột và dễ đọc.

---

## 1. Tables (Models trong Prisma)

| Quy tắc | Ví dụ | Ghi chú |
|---|---|---|
| **PascalCase** cho Model name | `User`, `Post`, `GalleryItem` | Prisma tự convert sang `snake_case` trong DB |
| **Số ít** (Singular) | `Post` ✅, `Posts` ❌ | Prisma convention |
| **Rõ nghĩa** | `GalleryItem` ✅, `GalItem` ❌ | Không viết tắt bừa |

---

## 2. Columns (Fields trong Prisma)

| Quy tắc | Ví dụ | Ghi chú |
|---|---|---|
| **camelCase** | `createdAt`, `passwordHash` | Prisma convention |
| **PK** luôn là `id` | `id String @id` | Dùng `@id @default(cuid())` |
| **FK** tên theo pattern `entityId` | `authorId`, `categoryId` | Rõ ràng quan hệ |
| **Timestamps** bắt buộc | `createdAt`, `updatedAt` | Mọi model đều phải có |
| **Boolean** prefix `is`/`has` | `isPublished`, `hasImage` | Dễ đọc |
| **Enum field** tên rõ trạng thái | `status`, `role` | Không dùng `type` (từ reserved) |

---

## 3. Enums

| Quy tắc | Ví dụ |
|---|---|
| **PascalCase** cho tên Enum | `PostStatus`, `UserRole` |
| **SCREAMING_SNAKE_CASE** cho giá trị | `DRAFT`, `PUBLISHED`, `SUPER_ADMIN` |

```prisma
enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

---

## 4. Indexes & Constraints

| Quy tắc | Ví dụ |
|---|---|
| Unique constraint dùng `@unique` | `email String @unique` |
| Composite unique dùng `@@unique` | `@@unique([slug, locale])` |
| Index thường dùng `@@index` | `@@index([authorId])` |
| Index name theo pattern | `idx_post_author_id` |

---

## 5. Cấm (Anti-patterns)

- ❌ Không dùng `type` làm tên field (từ reserved trong TS/SQL).
- ❌ Không dùng `data`, `info` là tên field chung chung.
- ❌ Không dùng tên viết tắt không rõ nghĩa: `usr`, `pst`, `cat`.
- ❌ Không dùng tiền tố bảng trong column: `post_title` (dùng `title` trong model `Post`).
