---
description: Kỹ năng và Best Practices dành cho React.js (Sử dụng trong Web & Admin)
---

# React.js Skills & Best Practices

AI khi làm việc với React.js trong dự án này BẮT BUỘC tuân thủ các quy định sau để đảm bảo Google Style Guide và hiệu suất cao.

## 1. Functional Components & Hooks

- BẮT BUỘC sử dụng Functional Components thay cho Class Components.
- Sử dụng Arrow functions để định nghĩa component: `const MyComponent = () => {}`
- Phân tách logic ra khỏi UI bằng cách sử dụng Custom Hooks (`useFetch`, `useAuth`, v.v.).

## 2. Quản lý trạng thái (State Management)

- Ưu tiên sử dụng `useState` và `useReducer` cho các state nhỏ, gắn liền với component.
- Trích xuất state chung bằng React Context API. Đặc biệt, nếu state đó ít thay đổi (Ví dụ: Theme, User Session).
- Tuyệt đối không over-engineer kết nối Redux/Zustand nếu không thực sự cần thiết.

## 3. Performance & Memoization

- Chỉ sử dụng `React.memo`, `useMemo`, và `useCallback` khi phát hiện có vấn đề về hiệu suất (Render quá nhiều lần). Không dùng bừa bãi tránh làm code phức tạp.
- Đảm bảo các mảng dependency trong `useEffect` luôn đầy đủ (Sử dụng `eslint-plugin-react-hooks`).

## 4. Styling (Tailwind CSS)

- Toàn bộ component sử dụng Tailwind CSS.
- Với các block CSS phức tạp có tính tái sử dụng, dùng `twMerge` và `clsx` (thông qua utilities như `cn()`).

## 5. Type Safety (TypeScript)

- Định nghĩa rõ ràng Props và State interfaces/types.
- Không dùng `any`. Mọi variable phải xác định kiểu rõ ràng.
