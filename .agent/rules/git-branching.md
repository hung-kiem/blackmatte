---
description: Branching and Git Rules for AI Agents
---

# Git & Branching Rules

AI hoạt động trong dự án này BẮT BUỘC tuân thủ luồng quản lý mã nguồn sau. KHÔNG BAO GIỜ push trực tiếp lên `main` hoặc `develop`.

## 1. Môi trường Local (Pre-branching)

- Trước khi checkout / tạo một nhánh mới, BẮT BUỘC kiểm tra trạng thái Git hiện tại (`git status`).
- Nếu có code chưa commit trên nhánh hiện tại, yêu cầu User cho phép commit hoặc stash lại.
- Luôn pull code mới nhất từ nhánh gốc (Ví dụ: `git pull origin develop`) trước khi tạo nhánh mới để tránh xung đột.

## 2. Naming Convention (Đặt tên nhánh)

Mọi tính năng/fix lỗi phải nằm ở nhánh riêng, tuân theo định dạng:
`<type>/<module>-<short_description>`

**Type:**

- `feat`: Tính năng mới.
- `fix`: Sửa lỗi.
- `chore`: Cập nhật cấu hình, thư viện (không làm thay đổi logic code).
- `docs`: Viết/Cập nhật document.

**Module:**

- `FE`: Giao diện Web (CV, Blog, Gallery).
- `ADMIN`: Giao diện Admin Portal.
- `DB`: Database (Prisma, Schema, Migration).
- `SYS`: System, Cấu hình chung, CI/CD.

**Ví dụ:**

- `feat/DB-schema-init`
- `fix/FE-cv-layout-bug`

## 3. Commit Messages

- Sử dụng chuẩn Conventional Commits.
- Ví dụ: `feat(db): add user schema and migration`

## 4. Pull Requests

- Mọi nhánh `feat/`, `fix/` phải tạo Pull Request (PR) ghép vào `develop`.
- Không tự merge. Chờ User (Tech Lead) review và approve.
