# Blackmatte — System Design

> Tài liệu này giải thích hệ thống Blackmatte cho tất cả thành viên, kể cả những người không có nền tảng kỹ thuật sâu.

---

## Hệ thống này là gì?

**Blackmatte** là nền tảng cá nhân gồm 3 phần:

| Phần | Tên | Ai sử dụng |
|---|---|---|
| 📖 **Blog & CV** | Website công khai | Ai cũng xem được |
| 🖼️ **Gallery** | Album ảnh / tác phẩm | Ai cũng xem được |
| 🔐 **Admin Portal** | Trang quản trị | Chỉ chủ trang |

---

## Kiến trúc tổng thể — Nhìn từ góc người dùng

```
┌─────────────────────────────────────────────────────────────────┐
│                        INTERNET                                   │
├───────────────────────────┬─────────────────────────────────────┤
│     👤 Khách truy cập     │        🔐 Admin (chủ trang)          │
│    blackmatte.io          │       admin.blackmatte.io            │
└───────────────────────────┴─────────────────────────────────────┘
             │                              │
             ▼                              ▼
┌─────────────────────────┐    ┌────────────────────────────────┐
│   🌐 Vercel Edge CDN    │    │   🖥️  Admin Portal (Next.js)   │
│  Cache tĩnh — rất nhanh │    │  Dashboard CRUD nội dung       │
│  99% request không cần  │    │  Đăng nhập bằng tài khoản      │
│  chạm tới Database      │    │  (NextAuth / JWT)              │
└────────────┬────────────┘    └──────────────┬─────────────────┘
             │ Cache miss                      │
             ▼                                ▼
┌────────────────────────────────────────────────────────────────┐
│                  📦 Website (Next.js · apps/web)               │
│      Server render trang Blog, CV, Gallery                     │
│      Chỉ ĐỌC dữ liệu từ Database (không thể ghi)              │
└──────────────────────────────┬─────────────────────────────────┘
                               │
              ┌────────────────┴────────────────┐
              ▼                                 ▼
┌─────────────────────────┐       ┌─────────────────────────────┐
│  🗄️  PostgreSQL Database │       │     ☁️  AWS S3               │
│   blackmatte_db          │       │  Lưu ảnh, PDF, video        │
│   3 users khác nhau      │       │  (không qua Next.js server) │
└─────────────────────────┘       └─────────────────────────────┘
```

---

## Database — 3 tầng người dùng

Để bảo mật, database có **3 user khác nhau** với quyền khác nhau:

```
┌──────────────────────────────────────────────────────────────┐
│              PostgreSQL — blackmatte_db                       │
├────────────────┬─────────────────────┬───────────────────────┤
│  superadmin    │    admin_user        │      web_user         │
│  🔴 Toàn quyền │  🟢 CRUD đầy đủ     │  🔵 Chỉ đọc          │
│                │  (Thêm/Sửa/Xóa/Đọc) │  (SELECT only)       │
├────────────────┼─────────────────────┼───────────────────────┤
│ Dùng khi:      │ Dùng khi:           │ Dùng khi:             │
│ - Migrate DB   │ - Admin Portal      │ - Website công khai   │
│ - Setup ban    │   thêm bài viết     │   hiển thị blog       │
│   đầu          │ - Upload ảnh        │ - Render gallery      │
│ - DBA tasks    │ - Xóa nội dung      │ - Hiển thị CV         │
└────────────────┴─────────────────────┴───────────────────────┘
```

> **Tại sao cần 3 user?** — Nếu website bị hack, kẻ tấn công chỉ có quyền đọc dữ liệu, **không thể xóa hay sửa gì**.

---

## Luồng hoạt động chính

### A. Khách truy cập đọc Blog

```
Khách → Vercel CDN → (Có cache?) 
                         │
                   CÓ ──→ Trả HTML ngay (< 10ms)
                         │
                   KHÔNG → Next.js đọc DB (web_user) → Cache → Trả HTML
```

**Kết quả**: 99% request được phục vụ từ cache, **gần như không tốn tài nguyên DB**.

---

### B. Admin đăng bài mới

```
Admin đăng nhập 
    → Điền form tạo bài
    → Server Action gọi DB (admin_user · CRUD)
    → Lưu bài vào PostgreSQL
    → Báo Vercel xóa cache cũ (revalidatePath)
    → Lần sau khách vào sẽ thấy bài mới
```

---

### C. Admin upload ảnh (AWS S3)

```
Admin chọn file ảnh
    → Yêu cầu "link upload tạm" từ server
    → Server (đã xác thực) xin Presigned URL từ AWS S3
    → Trả link tạm về cho trình duyệt
    → Trình duyệt upload THẲNG lên S3 (không qua Next.js)
    → Upload xong → Lưu URL ảnh vào Database
```

> **Lợi ích**: Next.js server **không phải xử lý file lớn**, tránh tốn băng thông và timeout.

---

## Codebase — Cấu trúc thư mục

```
blackmatte/
│
├── project/
│   ├── apps/
│   │   ├── web/          ← Website công khai (blog, cv, gallery)
│   │   └── admin/        ← Trang quản trị (chỉ chủ trang)
│   │
│   └── packages/
│       ├── database/     ← Kết nối DB, Prisma schema, Repositories
│       ├── ui/           ← Component dùng chung (Button, Card...)
│       └── config/       ← Cấu hình ESLint, TypeScript dùng chung
│
├── .agent/               ← Tài liệu hướng dẫn cho AI & Dev
├── docker-compose.yml    ← Setup PostgreSQL local bằng Docker
└── .env                  ← Biến cấu hình (không được commit lên Git)
```

---

## Môi trường chạy

| | Local (Máy Dev) | Production |
|---|---|---|
| **Website** | `localhost:3000` | `blackmatte.io` (Vercel) |
| **Admin** | `localhost:3001` | `admin.blackmatte.io` (Vercel) |
| **Database** | Docker · `localhost:5432` | PostgreSQL trên cloud |
| **Ảnh/Media** | Chưa setup | AWS S3 |
| **Cache** | Không có (dev mode) | Vercel Edge CDN |

---

## Tech Stack — Tóm gọn

| Mục | Công nghệ | Lý do chọn |
|---|---|---|
| Framework | **Next.js 14** | SSR + cache tốt, SEO mạnh |
| Giao diện | **Tailwind CSS** | Nhanh, nhất quán |
| Database | **PostgreSQL 16** | Ổn định, open source |
| ORM | **Prisma** | Type-safe, migration dễ |
| Auth | **NextAuth** | JWT chuẩn, tích hợp Next.js |
| Media | **AWS S3** | Rẻ, scale không giới hạn |
| Monorepo | **Turborepo + pnpm** | Build song song, share code |
| Host | **Vercel** | Tích hợp Next.js, CDN global |
