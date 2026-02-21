---
description: Tài liệu Test-Driven Development (TDD) và Test Cases
---

# Testing Documentation (TDD)

Thư mục này quản lý toàn bộ các kịch bản kiểm thử (Test Cases) và chiến lược TDD (Test-Driven Development) gắn chặt với từng Task / Epic.

## 0. Quy tắc Metadata và Liên kết (Bắt buộc)

Giống như URD và SRS, File Test Plan BẮT BUỘC phải liên kết ngược về cội nguồn của nó thông qua YAML frontmatter:

```yaml
---
epic: docs/agile/epics/EPC-XXX.md
task: .agent/tasks/TSK-ZZZ.md
srs_ref: docs/requirements/srs-epcxxx-feature.md
status: DRAFT | REVIEWING | APPROVED
---
```

Mục đích: Code sinh ra từ TDD phải được ánh xạ (map) 1-1 với file SRS đặc tả kỹ thuật tương ứng.

## 1. Phương pháp TDD trong dự án

Bất cứ khi nào làm một Feature mang tính logic cao (Service, Utilities, Calculations):

1. **Red Phase**: QA hoặc AI tạo mô tả kịch bản test (Test cases) ở thư mục này TRƯỚC. Hoặc viết luôn file `*.test.ts` trong source code với mục tiêu chạy LỖI.
2. **Green Phase**: Dev/AI viết code để pass qua các mock test đó.
3. **Refactor Phase**: Tối ưu lại code theo chuẩn Clean Architecture rổi chạy lại test.

## 2. Lưu trữ Test Plan (Kế hoạch Test)

- **Quy tắc Đặt tên file**: `testplan-[task_id]-[short_feature_name].md` (Ví dụ: `testplan-tsk05-auth-login.md`).
- Trong file Test Plan cần liệt kê:
  - **Unit Test Cases**: Các hàm cần test độc lập.
  - **Integration Test Cases**: Test luồng API, Server Actions.
  - **E2E Test Cases**: Mô phỏng hành vi User trên UI (ví dụ luồng Tạo bài Blog mới từ đầu đến cuối).

_Lưu ý_: Với Web UI cơ bản (Tailwind layout), không bắt buộc áp dụng TDD khắt khe. TDD tập trung chủ yếu vào **Lớp Core (Usecases/Services)** và các rule phân quyền.
