# Agile Project Management for AI

Thư mục này dùng để quản lý tiến độ, quy mô và các đầu mục công việc theo chuẩn Agile, giúp User (Tech Lead) và Agent (Developer) đồng bộ ngữ cảnh hoàn hảo.

## Cấu trúc tương đối

1. `epics/`: Chứa các file mô tả tính năng lớn (Epic). Ví dụ: `epic-01-admin-portal.md`, `epic-02-gallery-aws.md`.
2. `sprints/`: Chứa các file theo dõi Sprint (1-2 tuần). Liệt kê các ticket/task sẽ làm trong Sprint đó.
3. `tasks/` (Nằm ở root `.agent/tasks`): Là đơn vị nhỏ nhất mà AI sẽ trực tiếp đọc để code.

## Quy trình (Workflow)

1. **User** định hình Epic trong `docs/agile/epics/`.
2. Đầu mỗi tuần, **User** vạch ra kế hoạch trong `docs/agile/sprints/sprint-1.md`.
3. **User** tạo các file task cụ thể (`task-01-init-monorepo.md`) tại `.agent/tasks/`.
4. Gọi AI đọc task và thực thi mã nguồn. Các file ở đây sẽ giúp AI hiểu Task 01 đóng góp gì bức tranh tổng thể (Sprint/Epic).
