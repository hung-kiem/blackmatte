---
description: Cấu trúc code theo Clean Architecture & DDD principles
---

# Clean Architecture Rules

Dự án Blackmatte áp dụng tư tưởng **Clean Architecture**, tập trung vào **Separation of Concerns** (Tách biệt mối quan tâm) để source code dễ bảo trì, dễ scale và dễ test.

## 1. Nguyên tắc Độc lập (The Dependency Rule)

Dependencies (Code dependencies) chỉ được trỏ từ các lớp ngoài (Frameworks, UI, DB) VÀO TRONG các lớp Core (Entities, Usecases/Services).

- Lớp Core (Domain logic, Business rules) **KHÔNG ĐƯỢC BIẾT** tới sự tồn tại của UI (Next.js components) hay Database Framework (Prisma client).

## 2. Phân tầng Cấu trúc Tham khảo

Dự án Next.js kết hợp Monorepo sẽ ánh xạ Clean Architecture theo hệ thống thư mục (tương đối):

### Lớp Domain / Core (Trong `packages/` hoặc thư mục `core/` độc lập)

- Các type/interface định nghĩa Core của ứng dụng (Entities).
- Nơi chứa các Usecase / Services (Hàm xử lý business logic thuần túy).

### Lớp Infrastracture / Data Access (Trong `packages/database/`)

- Cầu nối đến Database thực sự.
- Gọi Prisma Client ở đây. Nơi chứa Repository Pattern (các class/hàm abstracting việc gọi DB thành CRUD cơ bản).
- Chặn không cho logic của NextApp tiếp xúc trực tiếp hàm ORM Prisma.

### Lớp Presentation / Controller (`apps/web/` và `apps/admin/`)

- Mọi component giao diện (`.tsx`), Next.js Routes (`page.tsx`), Server Actions (`actions/`).
- **Nhiệm vụ**: Hứng request -> Validate input (vd: Zod) -> GỌI xuống lớp Usecase/Service -> Trả về JSON/HTML.
- **Tuyệt đối cấm**: Server Action không được chứa thuật toán business logic khổng lồ hay viết query Prisma trực tiếp.

## 3. Dependency Injection (DI) & Testing

- Mặc dù Node.js không bắt buộc OOP DI Container khắt khe như Java/C#, hãy truyền Dependencies (như database repositories) vào logic services thông qua function parameters hoặc simple composition.
- Điều này giúp **Mock** Database dễ dàng khi viết Unit Test.

## 4. Single Source of Truth

- Mọi model database được mô tả tập trung ở `schema.prisma`. Dùng tính năng tự sinh Type của Prisma Client (Generate types) thay vì viết tay trùng lặp các interface giống hệt DB.
