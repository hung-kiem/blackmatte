# System Design & Scaling (10,000 requests / day)

## 1. Capacity Planning

- **Load traffic**: 10,000 requests/day.
- **Average**: ~ 400 requests/hour -> ~ 0.1 requests/second.
- **Peak hour**: Cho dù peak gấp 10 lần (1 request/second), đây vẫn là mức tải RẤT NHẸ đối với các hệ thống hiện đại.

## 2. Architecture Target

Với Next.js deployed trên Vercel (hoặc các nền tảng serverless/Edge tương tự):

- **Phần lớn traffic (Static/ISR)**: Các trang Blog, CV, Gallery sẽ được Vercel cache lại tại Edge CDN. Khi user truy cập, Request trả về ngay lập tức (vài chục ms) mà KHÔNG chạm tới Database. => Chịu tải hàng triệu request/ngày cũng được.
- **Dynamic traffic (Admin/Search/Write)**: Các thao tác update CMS từ Admin Portal hoặc tracking.

## 3. Potential Bottleneck (Điểm nghẽn tiềm năng)

Với Serverless Next.js + PostgreSQL, điểm nghẽn lớn nhất gây sập hệ thống không phải là CPU/RAM mà là **Connection Pooling của Database**.

- Vercel functions scale up có thể tạo ra hàng trăm kết nối đồng thời đập thẳng vào PostgreSQL, gây cạn kiệt Connection Limit.
- **Giải pháp bắt buộc**: Sử dụng **PgBouncer** (nếu tự host DB) hoặc **Prisma Accelerate** / tính năng Connection Pooling của Supabase/Neon.

## 4. Phase 2 (Media + AWS)

- Ảnh/Tài liệu (Gallery/CV PDF) không lưu trên repository hay DB.
- Database chỉ lưu chuỗi URL.
- Hệ thống Admin Portal sẽ request Pre-signed URL từ AWS S3 (thông qua AWS SDK), sau đó client tự upload file thẳng lên S3 để giảm tải cho Next.js server.
