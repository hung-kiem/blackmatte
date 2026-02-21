---
description: Quy tắc Bảo mật bắt buộc (Security Rules)
---

# Security Rules & Best Practices

AI phải coi bảo mật là ưu tiên hàng đầu. Bất cứ hành vi hay đoạn code nào vi phạm các quy tắc dưới đây sẽ bị cấm commit.

## 1. Quản lý Secrets (Credentials)

- **KHÔNG ĐƯỢC PHÉP** hardcode bất kỳ API keys, Database URLs, Passwords, hay Tokens nào trong source code.
- Tất cả secrets BẮT BUỘC phải đưa vào file `.env` (và định nghĩa mẫu ở `.env.example` nhưng không có giá trị thật).
- Trong Next.js, nếu biến cấu hình chỉ dùng ở phía Server, **không bao giờ** đặt tiền tố `NEXT_PUBLIC_` vì nó sẽ thò ra phía Client (User end).

## 2. Xác thực & Phân quyền (Authentication & Authorization)

- Mọi Server Actions và API Routes (nếu có) mà thay đổi/truy cập dữ liệu quan trọng đều phải **Kiểm tra quyền hạn** (Authorization check) ngay ở dòng code đầu tiên. Không tin tưởng vào việc "Client không thấy nút Xóa thì không gọi được API Xóa".
- Sử dụng NextAuth (Auth.js) hoặc JWT token chuẩn.

## 3. Xác thực Dữ liệu đầu vào (Input Validation & Sanitization)

- KHÔNG BAO GIỜ tin tưởng dữ liệu từ Client gửi lên. (Ví dụ: formData trong Server Actions).
- Bắt buộc dùng thư viện validator chuẩn xác (như **Zod**) để parse và validate dữ liệu (Schema validation).
- Ngăn chặn XSS: Mặc định React/Next.js đã escape variables, nhưng BẮT BUỘC cẩn thận với API như `dangerouslySetInnerHTML`.

## 4. Bảo vệ Dữ liệu Nhạy cảm

- Khi query Data từ Database (Prisma), chỉ `.select` đúng các trường cần thiết để trả về Client.
- **Tuyệt đối không** `findUnique` User và trả về nguyên object chứa trường `passwordHash` ra frontend.

## 5. Phòng chống Tấn công Cơ bản (OWASP)

- **CSRF**: Server Actions của Next.js mặc định được bảo vệ CSRF. Giữ nguyên cơ chế này.
- **SQL Injection**: Prisma ORM tự động xử lý. Tuyệt đối không dùng `$queryRaw` với chuỗi template string (+ nối chuỗi) chưa qua hàm xử lý an toàn của Prisma.
