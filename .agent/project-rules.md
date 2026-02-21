---
description: Root project rules for the Blackmatte CV/Blog/Gallery project
---

# PROJECT ROOT RULES

Đây là file "Tôn chỉ" (Root Rule) phụ trách định hướng toàn bộ AI Agents khi làm việc trong dự án Blackmatte.
BẤT CỨ KHI NÀO AI bắt đầu một task mới, hoặc có sự nghi ngờ về context, AI BẮT BUỘC phải đọc file này và các file liên kết để tránh "ảo giác" (hallucination).

## 1. Directory Strict Rules & File Locations (Nơi AI cần đọc)

AI PHẢI tìm kiếm và đọc tài liệu đúng vị trí để đảm bảo ngữ cảnh chính xác. Không được tự suy diễn.

- **Cấu trúc Thư mục & Công nghệ (Project Structure)**: Nằm ở file `.agent/rules/tech-stack.md`. Đây là nơi mô tả kiến trúc Monorepo và vị trí các file code chính.
- **Rules Cốt Lõi**: `.agent/project-rules.md` (File này) và các file trong `.agent/rules/`.
- **Luồng Nghiệp vụ & Thiết kế hệ thống**: Đọc trong `.agent/docs/`.
- **Agile/Scrum (Epic, Sprint)**: Đọc trong `.agent/docs/agile/`.
- **Tasks đang thực hiện**: Đọc trong `.agent/tasks/`.
- **Kỹ năng chuyên môn (Skills)**: Đọc `.agent/skills/` tương ứng (VD: `react.md`, `nextjs.md`).
- **Quy trình (Workflows)**: Đọc `.agent/workflows/`.
- **Lỗi đã biết (Known Issues)**: Khi gặp lỗi lạ, bắt buộc tra cứu `.agent/docs/troubleshooting/known-issues.md` để không lặp lại sai lầm cũ.

## 2. Git & Branching Strategy

Chi tiết xem tại: `.agent/rules/git-branching.md`.
**Tóm tắt**:

- KHÔNG BAO GIỜ push trực tiếp lên `main`/`develop`.
- Đảm bảo "Pre-branching" (không để quên code local chưa push/commit).
- Format nhánh: `feat/<module>-<short_desc>` (VD: `feat/DB-schema-init`).

## 3. Quản lý Chất lượng Code (Linting & Styling)

Chi tiết xem tại: `.agent/rules/code-style.md`.
**Tóm tắt**:

- Tuân thủ Google Code Style.
- Bắt buộc vượt qua ESLint và Prettier trước khi run/build/commit. Lỗi ESLint phải được sửa triệt để.

## 4. Architectural Principles

Chi tiết xem tại: `.agent/rules/clean-architecture.md`.
**Tóm tắt**:

- **Clean Architecture**: Tách biệt rõ ràng Data Access (DB Layer), Business Logic (Core/Service Layer), và Presentation (UI/Controllers). Cấm viết Query DB hay Logic tính toán rườm rà chồng chéo trong cục diện UI Component/Server Actions.
- **Monorepo**: Các thư viện nội bộ (UI, Config, Database) nằm trong `packages/` và được tái sử dụng qua `apps/web` và `apps/admin`.
- **Document-Driven**: Bất cứ logic hay module phức tạp nào cũng phải được mô tả bằng Markdown ở `.agent/docs/` trước khi code.

## 5. Security Rules

Chi tiết xem tại: `.agent/rules/security.md`.
**Tóm tắt**:

- File `.env` và bí mật bị cấm push lên web. Cẩn thận với `NEXT_PUBLIC_`.
- Server Actions luôn phải Verify Authentication Authorization tại gốc. Không bao giờ tin tưởng Client/UI.
- Luôn kiểm soát dữ liệu trả về từ DB (Tránh rò rỉ password) và validate chặt chẽ input gửi lên bằng Zod schema.
