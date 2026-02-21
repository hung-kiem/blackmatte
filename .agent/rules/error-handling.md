---
description: Quy chuẩn xử lý lỗi (Error Handling) trong toàn dự án
---

# Error Handling Rules

AI phải áp dụng nhất quán chiến lược xử lý lỗi sau. Code không theo pattern này sẽ bị coi là không đạt tiêu chuẩn.

---

## 1. Phân loại Lỗi (Error Types)

Dự án phân biệt 3 loại lỗi:

| Loại | Ví dụ | Cách xử lý |
|---|---|---|
| **User Error** | Form thiếu field, giá trị không hợp lệ | Trả về message thân thiện, hiển thị lên UI |
| **Auth Error** | Chưa đăng nhập, không đủ quyền | Redirect về login hoặc trả về 401/403 |
| **System Error** | DB crash, S3 timeout, bug trong code | Log chi tiết server-side, trả về message chung cho user |

---

## 2. Custom Error Classes

Định nghĩa tại `packages/database/src/errors.ts` hoặc `apps/*/src/lib/errors.ts`:

```ts
export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 400,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Bạn không có quyền thực hiện thao tác này') {
    super(message, 'UNAUTHORIZED', 401)
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400)
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} không tìm thấy`, 'NOT_FOUND', 404)
  }
}
```

---

## 3. Pattern cho Server Actions

```ts
'use server'

import { z } from 'zod'
import { UnauthorizedError, ValidationError } from '@/lib/errors'
import { getServerSession } from 'next-auth'

// Kiểu trả về chuẩn cho Server Actions
type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string }

export async function createPost(
  formData: unknown,
): Promise<ActionResult<Post>> {
  try {
    // 1. Auth check — LUÔN ĐẶT ĐẦU TIÊN
    const session = await getServerSession()
    if (!session?.user || session.user.role !== 'ADMIN') {
      throw new UnauthorizedError()
    }

    // 2. Validate input
    const parsed = CreatePostSchema.safeParse(formData)
    if (!parsed.success) {
      throw new ValidationError(parsed.error.errors[0].message)
    }

    // 3. Business logic
    const post = await postRepository.create(parsed.data)
    return { success: true, data: post }

  } catch (error) {
    // 4. Phân loại lỗi khi return về client
    if (error instanceof AppError) {
      return { success: false, error: error.message, code: error.code }
    }
    // System error — log chi tiết, trả về message chung
    console.error('[createPost] Unexpected error:', error)
    return { success: false, error: 'Có lỗi xảy ra, vui lòng thử lại sau.' }
  }
}
```

---

## 4. Pattern cho UI (Client Components)

```tsx
const handleSubmit = async (data: FormData) => {
  const result = await createPost(data)
  if (!result.success) {
    // Hiển thị lỗi lên UI — KHÔNG alert(), dùng toast hoặc inline error
    toast.error(result.error)
    return
  }
  toast.success('Tạo bài viết thành công!')
  router.push('/admin/posts')
}
```

---

## 5. Quy tắc Logging

- **Server-side**: Dùng `console.error` với prefix `[ActionName]` để dễ filter logs trên Vercel.
- **Client-side**: KHÔNG log thông tin nhạy cảm. KHÔNG log session token hay user data.
- **Không bao giờ**: Trả về stack trace hay database error message thẳng về phía client.

---

## 6. Next.js Error Boundaries

- Mọi route segment có thể fail phải có `error.tsx` cùng cấp.
- `error.tsx` chỉ hiển thị message thân thiện, không hiển thị technical details.

```tsx
// app/(admin)/posts/error.tsx
'use client'
export default function PostsError({ reset }: { reset: () => void }) {
  return (
    <div>
      <p>Không thể tải danh sách bài viết.</p>
      <button onClick={reset}>Thử lại</button>
    </div>
  )
}
```
