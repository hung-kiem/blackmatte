---
description: Quy trình thực thi một chức năng mới (Feature Development Workflow)
---

# Feature Development Workflow

AI khi nhận một task lập trình tính năng mới phải đi qua đúng trình tự sau:

## Bước 1: Phân tích, Lên kế hoạch & Chuẩn hóa Tài liệu (Planning & Documentation)

1. Đọc file task do User giao.
2. **[QUAN TRỌNG] Kiểm tra & Bổ sung Tài liệu Agile**:
   - Kiểm tra xem task này đã có Epic (`docs/agile/epics/`) và Sprint (`docs/agile/sprints/`) tương ứng chưa.
   - Kiểm tra file mô tả Task (`.agent/tasks/`) đã điền đủ thông tin theo `task-template.md` chưa.
   - CHỈ ĐẠO CHO AI: Nếu tài liệu thiếu (Ví dụ User chỉ bảo "hãy làm chức năng X"), AI BẮT BUỘC phải dùng template sinh ra đầy đủ file Markdown cho Epic/Sprint/Task.
3. **[TIỀN QUYẾT] Viết tài liệu Phân tích & Kiểm thử (URD, SRS, TDD)**:
   - Dựa vào Epic/Task, AI phải kiểm tra xem tính năng này đã có URD (`docs/requirements/urd-...`) và SRS (`docs/requirements/srs-...`) chưa.
   - Nếu chưa có, AI và User cùng thảo luận để sinh ra file URD & SRS trước.
   - Từ SRS, AI sinh tiếp tài liệu Test-Driven Development (TDD) tại `docs/testing/testplan-...`. Kịch bản Test này sẽ định hình input/output của code.
   - **Tuyệt đối không lao vào code** khi chưa có URD, SRS, hoặc TDD test plan nếu đây là một tính năng phức tạp.
4. Tìm hiểu ngữ cảnh: Đọc các file liên quan trong thư mục dự án và `docs/database/`.
5. Gửi **Implementation Plan** (Kế hoạch thực thi) cho User duyệt TRƯỚC KHI tạo nhánh hay viết code.

## Bước 2: Chuẩn bị Git (Pre-branching)

1. Kiểm tra Git local: `git status`. Xử lý code thừa.
2. Cập nhật nhánh gốc: Checkout `develop` và `git pull origin develop`.
3. Bắt đầu nhánh mới: `git checkout -b feat/<module>-<short_desc>`.

## Bước 3: Thực thi Code (Execution)

1. Tham chiếu `skills/` (React, Next.js, System Design) để áp dụng best practices.
2. Viết code tuần tự từ Database (Prisma) -> Backend Action -> Frontend UI (Nếu là full-stack feature).
3. Đảm bảo UI/UX sử dụng Tailwind chuẩn xác, Responsive đầy đủ.

## Bước 4: Kiểm tra Chất lượng (Verification)

1. Chạy Linter: `npm run lint`. Sửa TẤT CẢ các lỗi Google Code Style nếu có.
2. Chạy Format: `npm run format` (Prettier).
3. Build thử: `npm run build` để bắt lỗi Type checking hoặc Next.js build errors.
4. Tự kiểm tra giao diện bằng Tool duyệt web ẩn.

## Bước 5: Bàn giao (Delivery)

1. Add & Commit (`git commit -m "feat(<module>): <commit message>"`).
2. Report lại cho User qua hệ thống chat: Liệt kê các file đã đổi, tóm tắt kết quả, và yêu cầu User review Pull Request.
