---
description: Nơi lưu trữ tài liệu về Database Schema, Entities, và Relationships
---

# Database Architecture

Thư mục `docs/database/` là trung tâm (Single Source of Truth) thiết kế DB trước khi biến nó thành Prisma Schema. Vị trí chính thức của Prisma code sẽ nằm trong `packages/database/prisma/schema.prisma`.

## Cấu trúc thư mục DB Docs đề xuất:

1. **`schema-overview.md`**: Bức tranh tổng thể các thực thể (Users, Blogs, Gallery...). Định hướng naming conventions (Ví dụ bảng dùng `snake_case` hay `camelCase`).
2. **`entity-[tên].md`**: Đi sâu vào từng Entity phức tạp. Ví dụ `entity-blog.md` mô tả các trạng thái (Draft, Published), quan hệ 1-N với Tags, Comments.
3. **`migration-history.md`**: Tracking các quyết định thay đổi cấu trúc DB lớn.

## Nguyên tắc Thiết kế

- Ưu tiên tính chuẩn hóa (Normalization) để tránh lặp lặp dữ liệu.
- Phải thiết kế Entity rành mạch trong folder này rổi gửi User duyệt TRƯỚC KHI sinh ra code Prisma.
