---
description: Quy trình xử lý lỗi khẩn cấp trên Production (Hotfix Workflow)
---

# Hotfix Workflow (Sự cố Production)

Quy trình này áp dụng ĐỘC QUYỀN cho các lỗi nghiêm trọng (vỡ giao diện toàn trang, API sập, data hỏng) đang xảy ra trên môi trường Production (Go-live) và cần xử lý ngay lập tức.

## Bước 1: Khẩn trương tạo nhánh Hotfix (Preparation)

- **Tình huống khẩn cấp**: Không rẽ nhánh dài dòng từ `develop`.
- Cập nhật nhánh gốc production (thường là `main` hoặc nhánh deploy tương đương, ví dụ `production`):
  `git checkout main`
  `git pull origin main`
- Tạo nhánh hotfix mới:
  `git checkout -b hotfix/<module>-<short_desc>`
  _Ví dụ:_ `hotfix/FE-crash-gallery`, `hotfix/DB-missing-index`.

## Bước 2: Phân tích & Vá lỗi (Rapid Repair)

- Tập trung vào **nguyên nhân cốt lõi** (Root cause) và ưu tiên đưa hệ thống về trạng thái ổn định nhanh nhất, không đập đi xây lại trừ khi bắt buộc.
- Thay đổi phải được khoanh vùng hẹp nhất có thể để giảm rủi ro tạo ra lỗi mới (Regression bug).

## Bước 3: Kiểm định nhanh (Fast Verification)

Vì tính chất khẩn cấp, đôi lúc bỏ qua viết mới Unit Test/E2E Test nhưng **bắt buộc** phải:

1. Chạy Linter: `npm run lint`.
2. Build thử: `npm run build` trên local.
3. Test tay tối thiểu tính năng vừa vá.

## Bước 4: Triển khai khẩn cấp & Đồng bộ (Merge & Sync)

1. Thêm tag `[HOTFIX]` vào commit: `git commit -m "fix(module): [HOTFIX] <mô tả sửa lỗi>"`.
2. Báo cáo User để tạo Pull Request ghép thẳng vào `main` (Để vá Production liền).
3. **Cực kỳ Quan trọng (Sync-back)**: Lập tức tạo thêm một Pull Request để đồng bộ nhánh `hotfix/` ngược về nhánh `develop` để môi trường Dev không bị mất đoạn vá lỗi này trong tương lai.
