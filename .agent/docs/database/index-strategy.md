---
description: Index Strategy — Khi nào cần index và tại sao
---

# Database Index Strategy

AI và Dev chỉ tạo index khi có lý do rõ ràng — quá nhiều index làm chậm write operations.

---

## 1. Nguyên tắc Cốt lõi

- **Tạo index khi**: Column xuất hiện thường xuyên trong `WHERE`, `ORDER BY`, hoặc làm FK của JOIN.
- **Không tạo index khi**: Table nhỏ (< 1000 rows), column ít được filter, hoặc column có cardinality thấp (VD: boolean).
- **Prisma tự tạo**: Index cho `@id` và `@unique` — không cần khai báo thêm.

---

## 2. Index Standards cho Project Blackmatte

### 📌 Luôn Index (Mandatory)

| Column | Lý do |
|---|---|
| Foreign Keys (`authorId`, v.v.) | Join queries luôn cần |
| `slug` (nếu dùng làm URL param) | Lookup theo URL rất thường xuyên |
| `status` + `publishedAt` (composite) | Query "lấy bài đã publish, sắp xếp mới nhất" |
| `email` trong `User` | Auth lookup mỗi request |

### 📌 Index Theo Tình Huống (Conditional)

| Scenario | Index cần thiết |
|---|---|
| Search full-text trên `title`, `content` | Dùng `@@index` + Postgres `GIN` index (qua `$executeRaw`) |
| Phân trang (pagination) theo `createdAt` | `@@index([createdAt])` |
| Gallery sort theo `orderIndex` | `@@index([orderIndex])` |

---

## 3. Ví dụ Khai báo trong Prisma

```prisma
model Post {
  id          String     @id @default(cuid())
  slug        String     @unique              // Auto-indexed by @unique
  status      PostStatus
  publishedAt DateTime?
  authorId    String

  author      User       @relation(fields: [authorId], references: [id])

  @@index([authorId])                         // FK index
  @@index([status, publishedAt])              // Composite: filter published posts
}
```

---

## 4. Kiểm tra Index hiệu quả

Khi có nghi ngờ về performance, dùng lệnh sau để kiểm tra query plan:

```sql
EXPLAIN ANALYZE
SELECT * FROM "Post" WHERE status = 'PUBLISHED' ORDER BY "publishedAt" DESC LIMIT 10;
```

Nếu thấy `Seq Scan` thay vì `Index Scan` → cần thêm index.
