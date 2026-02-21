---
description: Nguyên tắc System Design dành cho dự án Blackmatte (Scale 10k request/day)
---

# System Design Skills & Best Practices

AI khi nhận requirement thiết kế module mới, phải đọc kỹ tài liệu này. Mọi quyết định thiết kế đều hướng tới Cấu trúc tinh gọn, Hiệu suất cao và Chống thắt cổ chai database.

## 1. Stateless Serverless Paradigm

Với Next.js lưu trữ trên nền tảng Serverless (Vercel), hệ thống mang bản chất Stateless.

- **Không lưu In-memory Session**: Bác bỏ phương pháp lưu session trên memory của node.js.
- **Mật khẩu/Token**: Sử dụng JWT cho việc xác thực (Authentication), lưu ở HTTP-only cookie, hoặc thao tác qua NextAuth (Auth.js).
- Hàm thực thi (Serverless Functions) có thể scale up ra hàng ngàn instance trong vài giây. Mọi biến Global trong memory sẽ bay hơi sau mỗi lifecycle.

## 2. Database Connection Pooling (Critical)

Đây là điểm nghẽn lớn nhất:

- PostgreSQL giới hạn số lượng TCP connections (khoảng 100-200 tuỳ tier).
- Khi Serverless Functions scale, chúng sẽ ngẫu nhiên tạo hàng ngàn kết nối cùng lúc gây cạn kiệt Connection.
- MỘT THIẾT KẾ ĐÚNG: Luôn đảm bảo kết nối đi qua **PgBouncer** hoặc **Prisma Accelerate (Connection Pool)**. Không bao giờ cấu hình Next.js gọi trực tiếp vào Raw PostgreSQL instance mà không có proxy pooling nội bộ/kèm theo.

## 3. Caching Strategy (Bộ đệm)

Cũng là chìa khóa để xử lý 10,000 req/day (thực ra là có thể chịu tải hàng triệu req/day) một cách tiết kiệm:

- Dùng **ISR (Incremental Static Regeneration)** của Next.js: Các bài blog, ảnh gallery được build thành file tĩnh. Khi DB thay đổi, gọi Revalidation Path/Tag. Bằng cách này, 99% request của User chỉ gõ chạm vào CDN Edge.
- Tranh tạo API fetches tốn kém ở Client Side nếu dữ liệu có tính chất Public.

## 4. Media Storage (AWS S3)

- Media (Ảnh, PDF, Video) CHIẾM NHIỀU BĂNG THÔNG. Không được phép pipe Media File thông qua Next.js Serverless function.
- **Upload Flow**:
  1. Client gửi request "Tôi muốn upload file X" tới Server Action.
  2. Server xác thực quyền (Admin), sau đó xin một **Pre-signed URL** từ AWS S3.
  3. Trả Pre-signed URL về cho Client.
  4. Client trực tiếp upload file LÊN S3 bằng Pre-signed URL đó (Next.js không phải hứng traffic upload nặng).
  5. S3 upload thành công -> Client gọi lại Server lưu URL vào Database Prisma.

## 5. Idempotent API (Tính toàn vi)

Mọi POST/PUT request đến hệ thống (VD: Admin lưu bài viết mới), phải được thiết kế Idempotent (Dù retry do mạng lỗi 3-4 lần thì vẫn chỉ sinh ra 1 record duy nhất nếu request đó giống hệt nhau).
