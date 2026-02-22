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

## 🚨 Bước 2: Chuẩn bị Git (Pre-branching) — BẮT BUỘC TRƯỚC KHI CODE

> **TUYỆT ĐỐI KHÔNG ĐƯỢC viết code trên nhánh `main` hoặc `develop`.**
> AI phải tạo feature branch TRƯỚC KHI viết BẤT KỲ dòng code nào.

// turbo-all
1. Kiểm tra Git local: `git status`. Xử lý code thừa.
2. Cập nhật nhánh gốc: Checkout `develop` và `git pull origin develop`.
   - Nếu chưa có nhánh `develop`, tạo mới: `git checkout -b develop`
3. Bắt đầu nhánh mới từ `develop`: `git checkout -b feat/<module>-<short_desc>`.
   - Ví dụ: `git checkout -b feat/SYS-sprint1-foundation`
4. Xác nhận đang ở đúng nhánh: `git branch --show-current` — phải trả về tên nhánh `feat/...`.

**Nếu đã lỡ code trên `main`:**
```bash
# Stash changes
git stash
# Create feature branch
git checkout -b feat/<module>-<short_desc>
# Apply stashed changes
git stash pop
```

## Bước 3: Thực thi Code (Execution)

1. Tham chiếu `skills/` (React, Next.js, System Design) để áp dụng best practices.
2. Viết code tuần tự từ Database (Prisma) -> Backend Action -> Frontend UI (Nếu là full-stack feature).
3. Đảm bảo UI/UX sử dụng Tailwind chuẩn xác, Responsive đầy đủ.

## Bước 4: Build & Kiểm tra Chất lượng (Verification) — Xem Rule 9

> Tham chiếu `project-rules.md` Rule 9 để chạy đầy đủ pipeline.

// turbo-all
1. Cài dependencies: `pnpm install`
2. Generate Prisma Client (nếu có schema changes): `npx prisma generate --config prisma.config.ts` (trong `packages/database/`)
3. Chạy Linter: `pnpm lint`. Sửa TẤT CẢ các lỗi nếu có.
4. Build thử: `pnpm build` để bắt lỗi Type checking hoặc Next.js build errors.
5. Nếu build fail → áp dụng Rule 8 (tự sửa tối đa 3 lần).
6. Tự kiểm tra giao diện bằng Tool duyệt web ẩn (nếu có UI changes).

## 🔍 Bước 5: Code Review Tự động — BẮT BUỘC (Xem Rule 10)

> Sau khi build pass, AI **BẮT BUỘC** tự review code theo `.agent/workflows/code-review.md`.

1. Chạy đầy đủ checklist review theo 4 layers (Database → Business Logic → Security → UI).
2. Kiểm tra Code Quality Checklist (no `any`, no dead code, proper naming, etc.).
3. Viết **Self-Review Report** tóm tắt.
4. Nếu phát hiện issues nghiêm trọng → Fix trước khi commit.
5. Gửi Review Report kèm kết quả cho User.

## Bước 6: Bàn giao (Delivery)

1. Add & Commit (`git commit -m "feat(<module>): <commit message>"`).
2. Push branch lên remote: `git push origin feat/<module>-<short_desc>`.
3. Report lại cho User qua hệ thống chat:
   - Liệt kê các file đã đổi
   - Self-Review Report tóm tắt
   - Yêu cầu User review Pull Request
