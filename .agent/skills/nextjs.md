---
description: Kỹ năng và Best Practices dành cho Next.js 14+ (App Router)
---

# Next.js Skills & Best Practices

AI khi làm việc trên `apps/web` hoặc `apps/admin` (Sử dụng Next.js App Router) phải tuân thủ nghiêm ngặt các điều sau.

## 1. Data Fetching (Server Components vs Client Components)

- Mặc định mọi component là **Server Components**. Chỉ dùng `"use client"` khi BẮT BUỘC phải dùng React hooks (useState, useEffect, onClick).
- Data fetching nên được thực hiện ở Server Components để tối ưu SEO và giảm bundle size. Điển hình như các trang Blog, CV, Timeline.
- Sử dụng `fetch` API mở rộng của Next.js (chứa các tính năng caching, revalidation) thay vì axios, trừ khi gọi API bên thứ 3 phức tạp.

## 2. Server Actions (Mutations)

- Thay vì viết các API Routes truyền thống (`/api/...`), hãy dùng **Server Actions** để thêm/sửa/xóa dữ liệu. (Ví dụ: Create Blog Post, Update Profile).
- Đặt Server Actions trong thư mục `actions/` và phân tách rõ logic. Đừng mix quá nhiều vào file UI.
- Luôn validate input ở Server Actions (ví dụ: dùng Zod) để tránh lỗi bảo mật (SQL Injection, XSS).

## 3. Routing & Layouts

- Dùng `layout.tsx` cho phần giao diện dùng chung (Header, Footer, Sidebar).
- Dùng `loading.tsx` với skeleton UI để cải thiện UX khi data đang được fetch.
- Dùng `error.tsx` để bắt và hiển thị lỗi thân thiện với người dùng, thay vì crash app.
- Khi điều hướng, luôn dùng `next/link` `<Link>` thay cho thẻ `<a>`. Dùng `useRouter` của `next/navigation`, không dùng `next/router`.

## 4. Tối ưu ảnh (Image Optimization)

- Sử dụng `next/image` (`<Image />`) cho 100% hình ảnh tĩnh và động để Next.js pre-optimize (WebP/AVIF, lazy loading).

## 5. SEO (Metadata)

- Khai báo Metadata tĩnh (`metadata`) hoặc động (`generateMetadata`) trên tất cả các pages (`page.tsx`) trong `apps/web` để SEO tốt nhất.
