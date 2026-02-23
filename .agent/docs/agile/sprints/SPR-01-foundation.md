---
id: SPR-01
goal: Xây dựng nền tảng hệ thống — DB Schema, Shared Packages, và Admin Authentication
start_date: TBD
end_date: TBD
status: PLANNED
total_points: 21
completed_points: 0
---

# SPR-01 — Foundation

## Sprint Goal

Hoàn thiện toàn bộ hạ tầng kỹ thuật để unblock mọi tính năng trong Sprint 2 và 3:
shared packages, database schema, Prisma migration, và Admin login/logout.

---

## Sprint Backlog

| Task | Tên | Points | Assignee | Status |
|---|---|---|---|---|
| TSK-01 | Setup `packages/config` (ESLint, TS configs) | 2 | AI | TODO |
| TSK-02 | Setup `packages/ui` (shadcn/ui base) | 3 | AI | TODO |
| TSK-03 | Define DB Schema + `migrate dev --name init` | 5 | AI | TODO |
| TSK-04 | Seed admin user từ `.env` credentials | 3 | AI | TODO |
| TSK-05 | Cài đặt NextAuth Credentials Provider (`apps/admin`) | 5 | AI | TODO |
| TSK-06 | UI trang Login + Logout (Admin Portal) | 3 | AI | TODO |

**Tổng Points commit: 21**

---

## Definition of Done (Sprint)

- [ ] `packages/config` được import thành công trong cả `apps/web` và `apps/admin`
- [ ] `packages/ui` export ít nhất Button, Input, Card components
- [ ] Migration file `init` tồn tại trong `prisma/migrations/` và đã apply thành công
- [ ] Admin có thể đăng nhập bằng email/password từ `.env`
- [ ] JWT token lưu trong HTTP-only cookie, expire sau 30 ngày
- [ ] Admin có thể đăng xuất, token bị xóa
- [ ] `pnpm lint` và `pnpm build` pass toàn bộ repo
