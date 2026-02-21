---
description: Code Style and Quality Rules (Google Code Style)
---

# Code Style & Quality Rules

Toàn bộ dự án tuân theo **Google Code Style**. Bất cứ đoạn code nào AI viết ra không tuân thủ sẽ bị coi là không đạt yêu cầu.

## 1. ESLint & Prettier

- Cấu hình dự án sử dụng `eslint-config-google` làm base.
- **Quy tắc Vàng**: Mọi Warning/Error sinh ra bởi Linter ĐỀU PHẢI ĐƯỢC FIX trước khi commit. Không dùng đường tắt `// eslint-disable-next-line` ngoại trừ các trường hợp bất khả kháng và được sự đồng ý của User.

## 2. Formatting (Prettier)

- Dùng Prettier để tự động format code.
- Format tiêu chuẩn: 2 spaces indent, single quotes (đối với JS/TS), trailing commas, không dùng dấu chấm phẩy ở Tailwind config (nếu có yêu cầu riêng).

## 3. Type Checking (TypeScript)

- `strict: true` trong `tsconfig.json`.
- Không sử dụng `any`, `ts-ignore` bừa bãi.
- Khai báo trọn vẹn interface/type cho API responses, component props, database models.

## 4. File Structure Convention

- Tên file/folder component: PascalCase (e.g., `UserProfile.tsx`).
- Tên file utilities, actions, hooks: camelCase (e.g., `fetchPosts.ts`, `useAuth.ts`).
- Các file cấu hình chung: kebab-case (e.g., `tailwind.config.ts`, `project-rules.md`).
