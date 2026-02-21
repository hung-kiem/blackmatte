---
description: Root project rules for the Blackmatte CV/Blog/Gallery project
---

# PROJECT ROOT RULES

Đây là file "Tôn chỉ" (Root Rule) phụ trách định hướng toàn bộ AI Agents khi làm việc trong dự án Blackmatte.
BẤT CỨ KHI NÀO AI bắt đầu một task mới, hoặc có sự nghi ngờ về context, AI BẮT BUỘC phải đọc file này và các file liên kết để tránh "ảo giác" (hallucination).

## 1. Directory Strict Rules & File Locations (Nơi AI cần đọc)

AI PHẢI tìm kiếm và đọc tài liệu đúng vị trí để đảm bảo ngữ cảnh chính xác. Không được tự suy diễn.

- **⭐ Trạng thái Project hiện tại**: `.agent/AGENT_CONTEXT.md` — Đọc file này ĐẦU TIÊN mỗi session để biết Sprint/Task/Branch đang active.
- **Cấu trúc Thư mục & Công nghệ**: `.agent/rules/tech-stack.md`.
- **Rules Cốt Lõi**: `.agent/project-rules.md` (File này) và toàn bộ `.agent/rules/`:
  - `clean-architecture.md` — Phân tầng kiến trúc
  - `code-style.md` — Google Style, ESLint, Prettier
  - `git-branching.md` — Branching & commit convention
  - `security.md` — Auth, secrets, input validation
  - `error-handling.md` — Error types & patterns ⭐ NEW
  - `api-conventions.md` — API Route response shape ⭐ NEW
- **Kỹ năng chuyên môn (Skills)**: `.agent/skills/`:
  - `nextjs.md`, `react.md`, `system-design.md`
  - `prisma.md` — Repository pattern, transactions ⭐ NEW
  - `typescript.md` — strict conventions, type sharing ⭐ NEW
- **Quy trình (Workflows)**: `.agent/workflows/`:
  - `feature-development.md`, `update-feature.md`, `hotfix.md`, `deployment.md`
  - `code-review.md` — Checklist review theo Layer ⭐ NEW
- **Thiết kế Hệ thống**: `.agent/docs/system-design.md`
- **Database Design**: `.agent/docs/database/` ⭐ NEW
  - `erd.md` — Entity Relationship Diagram
  - `naming-convention.md` — Table/column/enum naming
  - `index-strategy.md` — Khi nào cần index
- **Agile/Scrum**: `.agent/docs/agile/` (Epic, Sprint, Task templates trong `templates/`)
- **Requirements**: `.agent/docs/requirements/` (URD, SRS templates trong `templates/`)
- **Testing**: `.agent/docs/testing/testing-strategy.md` ⭐ NEW
- **Architecture Decisions**: `.agent/docs/decisions/` ⭐ NEW (ADR-XXX files)
- **Tasks đang thực hiện**: `.agent/tasks/` (dùng template từ `docs/agile/templates/task-template.md`)
- **Lỗi đã biết (Known Issues)**: `.agent/docs/troubleshooting/known-issues.md`

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
