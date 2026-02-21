---
description: Nơi lưu trữ tài liệu phân tích yêu cầu phần mềm
---

# Requirements Documentation (URD & SRS)

Thư mục này dùng để lưu trữ các tài liệu phân tích hệ thống TRƯỚC HẾT khi bắt tay vào code. Mọi tài liệu **BẮT BUỘC** phải có YAML Frontmatter ở đầu file để liên kết (link) ngược lại với Epic, Sprint, và Task tương ứng.

## 0. Quy tắc Metadata và Liên kết (Bắt buộc)

Mọi file Markdown trong thư mục này phải mở đầu bằng Block YAML sau:

```yaml
---
epic: docs/agile/epics/EPC-XXX.md
sprint: docs/agile/sprints/SPR-YYY.md
task: .agent/tasks/TSK-ZZZ.md
status: DRAFT | REVIEWING | APPROVED
---
```

Mục đích: Khi một Dev (hoặc AI) đọc file URD/SRS, họ có thể click ngay vào link để biết nó thuộc tính năng lớn nào (Epic), triển khai lúc nào (Sprint), và ai đang làm (Task).

## 1. URD (User Requirements Document)

- Dưới góc độ người dùng cuối (End-user) hoặc Business.
- **Quy tắc Đặt tên**: `urd-[epic_id]-[short_feature_name].md` (Ví dụ: `urd-epc01-blog-search.md`).
- File này sẽ mô tả: End-user muốn tìm kiếm bài viết nhanh bằng keyword, Admin muốn có nháp bài tiện lợi.

## 2. SRS (Software Requirements Specification)

- Bản dịch từ URD sang ngôn ngữ Kỹ thuật (Giao thức, Ràng buộc dữ liệu, API Specs).
- **Quy tắc Đặt tên**: `srs-[epic_id]-[short_feature_name].md` (Ví dụ: `srs-epc01-blog-search.md`).
- File SRS sẽ chỉ ra rõ: Feature này cần đổi Database Entity nào (link sang `docs/database/`), cần expose bao nhiêu Server Actions. Bắt buộc AI và Dev phải thống nhất file SRS này trước khi rẽ nhánh code Feature.
