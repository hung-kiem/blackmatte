---
description: Quy trình nâng cấp/sửa đổi tính năng đã chạy (Feature Update Workflow)
---

# Feature Update Workflow (Tính năng đã Go-live)

Khác với làm tính năng mới từ đầu, việc cập nhật hàm lượng logic, UI hoặc Database trên một tính năng đang chạy (Go-live) có rủi ro rất cao về "Regression Bug" (Làm hỏng tính năng cũ). AI phải tuân thủ quy trình bảo vệ này.

## Bước 1: Khảo sát Hiện trạng (Audit Before Touch)

1. Xác định Task từ User (`task-xxx.md`).
2. **Scan Code**: Dùng công cụ tìm kiếm (`grep_search`, `codebase_search`) để tìm TẤT CẢ các file đang gọi đến Component, Hàm (Function), hoặc Component được yêu cầu sửa.
3. Chú ý các dependency liên quan (VD: Thay đổi Prisma Schema `User` phải check cả JWT Auth, Admin Dashboard, Profile Page).

## Bước 2: Thiết lập Nhánh (Branching)

- Từ nhánh `develop` mới nhất, rẽ nhánh với tag `fix/` (nếu là sửa nhỏ) hoặc `feat/` (nếu là tính năng to).
- Lời khuyên: Đặt tên dạng `feat/update-<module>-<desc>` để User dễ nhận diện.

## Bước 3: Phát triển an toàn (Safe Execution)

1. **Database (nếu có)**: Không bao giờ `DROP` hay xóa cột dữ liệu đang chạy nếu chưa rõ tác động. Hãy thêm cột mới thay vì xóa cột cũ cho an toàn (Trừ khi User chủ động đồng ý xóa).
2. **Backward Compatibility**: Nếu sửa chữ ký hàm (Function Signature) hay API Route, phải đảm bảo code cũ gọi đến nó không bị crash (Hoặc phải update đồng loạt các chỗ gọi nó).
3. **Refactor**: Nếu thấy code cũ quá rối rắm, đừng lẳng lặng "đập đi xây lại" tiện thể (overhaul). Hãy xin phép User: _"Tôi thấy đoạn này rườm rà, tôi có thể refactor không hay chỉ focus vào sửa task?"_

## Bước 4: Kiểm tra & Bàn giao (Verification)

1. Build & Lint: `npm run lint` & `npm run build`. Đảm bảo các khu vực xung quanh không bị "hiệu ứng cánh bướm" bóp nghẹt.
2. Commit message rõ ràng những phần đã bị ảnh hưởng.
3. Báo cáo User tạo PR Review ghép về `develop`.
