# Mẫu Backoffice

Đây là một **template back-office** được xây dựng bằng **Next.js 14** và **React 18**, được thiết kế để giúp xây dựng 1 project back-office chung cho nhiều dự án.
Template này dành cho các hệ thống quản lý nội bộ của HST VNPAY.

---

## **Mục lục**

- [Giới thiệu](#giới-thiệu)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Hướng dẫn khởi động](#hướng-dẫn-khởi-động)
- [Quá trình phát triển](#quá-trình-phát-triển)
- [Triển khai](#triển-khai)

---

## **Giới thiệu**

Mẫu này cung cấp cấu trúc cơ bản cho một hệ thống quản lý backoffice. Dự án sử dụng Next.js 14 và React 18.

---

## **Công nghệ sử dụng**

- **Next.js 14**: Framework React SSR.
- **React 18**: Thư viện giao diện.
- **TypeScript**: Kiểu dữ liệu.
- **Zustand**: Quản lý store.
- **Tailwind CSS**: Framework CSS
- **ESLint & Prettier**: Đảm bảo chất lượng code.
- **Axios**: Gọi API.

---

## **Cấu trúc thư mục**

Cấu trúc của dự án và ý nghĩa của từng thư mục:

```
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   │   │signIn
│   │   │   │   │   ├── page.tsx
│   │   ├── (signed)/
│   │   │   │   │home
│   │   │   │   │   ├── page.tsx
│   │   │   ├── error.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── not-found.tsx
│   │   ├── api/
│   │   │   │[path]
│   │   │   │   ├── route.ts
│   │   │   │authorized-sso
│   │   │   │   ├── route.ts
│   │   │   │sign-out
│   │   │   │   ├── route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   ├── components/
│   ├── │   ├── shared/
│   ├── │   ├── common/
│   ├── │   ├── ClickOutside.tsx
│   ├── config/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── stores/
│   ├── styles/
│   ├── types/
│   ├── middleware.ts
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.mjs
├── prettier.config.js
├── tailwind.config.js
├── tsconfig.json
├── .env.example
├── .env.local
├── .env.production
├── .env.staging
├── .env.development
└── README.md
```

### **Chi tiết thư mục**

| Thư mục              | Mô tả                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `public/`            | - Chứa các file tĩnh như hình ảnh, font, và các tài nguyên không qua xử lý bởi Webpack.                                  |
|                      | - Các file ở thư mục này được truy cập thông qua đường dẫn `/`.                                                          |
| `src/app/`           | - Chứa các trang và layout của dự án.                                                                                    |
|                      | - Sử dụng App Router với các nhóm route `(auth)/` và `(signed)/`.                                                        |
|                      | - Chứa các file như `layout.tsx`, `loading.tsx`, `error.tsx`, và `not-found.tsx`.                                        |
| `src/app/api`        | - Chứa các route API tại server-side: `[path]` (xử lý API chung), `authorized_sso` (xử lý đăng nhập SSO), và `sign_out`. |
| `src/components/`    | - Chứa các component dùng chung trong dự án.                                                                             |
|                      | - Gồm hai nhóm chính: `shared/` (component tái sử dụng) và `common/` (component đặc thù).                                |
| `src/config/`        | - Chứa các file cấu hình toàn cục, như URL API (e.g., `NEXT_PUBLIC_API_BASE_URL`) và logger.                             |
| `src/hooks/`         | - Chứa các hook React tùy chỉnh như `useAuth`.                                                                           |
| `src/lib/`           | - Thư viện và helper dùng chung trong nhiều phần của dự án.                                                              |
| `src/services/`      | - Chứa logic giao tiếp với backend API, tách biệt với giao diện.                                                         |
| `src/stores/`        | - Chứa Zustand stores hoặc Redux stores dùng để quản lý trạng thái toàn cục.                                             |
| `src/styles/`        | - Chứa các file CSS toàn cục hoặc cấu hình Tailwind.                                                                     |
| `src/types/`         | - Chứa các interface và type của TypeScript.                                                                             |
| `.env.*`             | - Chứa các file cấu hình môi trường như `.env.local`, `.env.development`, `.env.staging`, và `.env.production`.          |
| `next.config.js`     | - File cấu hình Next.js để điều chỉnh hành vi ứng dụng.                                                                  |
|                      | - Cài đặt các tính năng như React strict mode, tối ưu hóa hình ảnh, và biến môi trường.                                  |
| `tailwind.config.js` | - File cấu hình Tailwind CSS, dùng để mở rộng theme, plugin, và cài đặt khác.                                            |
|                      | - Bao gồm cấu hình màu sắc (`primary`, `secondary`), plugin (e.g., typography, forms).                                   |
| `tsconfig.json`      | - File cấu hình TypeScript, dùng để cấu hình kiểu dữ liệu và tùy chỉnh compiler.                                         |
| `prettier.config.js` | - File cấu hình Prettier để định dạng mã nguồn tự động theo quy chuẩn.                                                   |

---

## **Hướng dẫn khởi động**

### Yêu cầu

- Node.js 16+
- npm hoặc yarn

### Cài đặt

1. Clone dự án:

    ```bash
    git clone https://git.vnpay.vn/dvtt/vnpay-ecos-01/base-project/base-ui.git
    cd base-ui
    ```

2. Cài đặt các thư viện:

    ```bash
    yarn install
    ```

3. Cấu hình biến môi trường:

    - Tạo file `.env.local` và thêm:
        ```
        NEXT_PUBLIC_API_BASE_URL=https://api.example.com
        ```

4. Khởi chạy server phát triển:

    ```bash
    npm run dev
    ```

5. Truy cập ứng dụng tại [http://localhost:3000](http://localhost:3000).

---

## **Quá trình phát triển**

### Các lệnh hữu ích

- `npm run dev`: Khởi chạy server phát triển.
- `npm run build`: Build dự án cho môi trường production.
- `npm run start`: Chạy server production.
- `npm run lint`: Chạy ESLint kiểm tra code.

---

## **Triển khai**

- Có thể triển khai trên các nền tảng như **Vercel**, **AWS**, hoặc **Docker**.
- Ví dụ triển khai trên Vercel:
    ```bash
    npm run build
    vercel deploy
    ```
