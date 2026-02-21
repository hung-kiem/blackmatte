---
description: Hạ tầng khởi động Local Development và Docker
---

# Infrastructure & Local Setup

Thư mục `infrastructure/` chứa các cấu hình để khởi chạy môi trường phát triển (Dev) và test (Staging) ở local bằng Docker.

## 1. Yêu cầu Hệ thống

- Docker Desktop / Docker Engine.
- Node.js 18+ (Dùng nvm để switch version).

## 2. Các file cấu hình chuẩn bị

- `docker-compose.yml`: File gốc nằm ở root directory để định nghĩa các Service.
- Các file tuỳ chỉnh đặc thù (nếu Dockerfile phức tạp) sẽ đặt bên trong `.agent/infrastructure/docker/`.

## 3. Quy trình khởi chạy Local (Local Development Workflow)

Khi Dev/AI bắt đầu setup máy mới hoặc pull code về:

1. Chạy Docker để khởi tạo Database PostgreSQL (và Redis/PgBouncer nếu có).
   ```bash
   docker-compose up -d
   ```
   _(File `docker-compose.yml` ở root chứa cấu hình tạo container PostgreSQL, map port `5432`, set user/password mặc định cho dev)._
2. Xây dựng các dependency ở Root:
   ```bash
   npm install
   ```
3. Khởi tạo Prisma Schema:
   ```bash
   npx prisma db push
   ```
   _(Đảm bảo file `.env` local đã map đúng chuỗi kết nối tới `postgresql://user:pass@localhost:5432/dbname`)._
4. Khởi chạy 2 apps cùng lúc:
   ```bash
   npm run dev
   ```
   _(Turborepo sẽ tự start cả `app/web` và `app/admin` ở 2 cổng khác nhau, vd 3000 và 3001)._

## 4. Port Convention (Quy ước Cổng mạng)

- `3000`: Web Frontend
- `3001`: Admin Portal
- `5432`: PostgreSQL
- `6432`: PgBouncer (Nếu dùng)
