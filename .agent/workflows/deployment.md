---
description: Quy trình kiểm tra và chuẩn bị Deploy (Deployment Workflow)
---

# Deployment Workflow

Quy trình này áp dụng trước khi code đưa lên Production (Vercel cho Web/Admin, AWS cho DB/Storage).

## 1. Audit Phase

- Linter Check (`npm run lint`): Phải pass 100%.
- Type Check (`tsc --noEmit`): Phải pass 100%.
- Build Check (`npm run build`): Phải tạo ra được bundle cho tất cả workspace (`apps/web`, `apps/admin`).

## 2. Environment Variables Check

- Đảm bảo file `.env.example` đã bao gồm mọi biến môi trường cần thiết vừa mới thêm vào ở task hiện tại (DB URL, NextAuth Secret, S3 Keys, v.v.).

## 3. Database Migration

- Nếu task có thay đổi Prisma Schema, phải đảm bảo đã tạo file migration: `npx prisma migrate dev --name <migration_name>` ở môi trường dev.
- Khi Deploy lên remote DB, quy trình CD sẽ chạy `npx prisma migrate deploy`. AI không được gõ lệnh này tự động trên cấu hình Production trừ khi User yêu cầu rõ.

## 4. Báo cáo Tóm tắt Deploy

- AI phải tổng hợp 1 danh sách gửi User: Các tính năng sẽ deploy, Các biến môi trường cần update, và Các lệnh DB cần chạy.
