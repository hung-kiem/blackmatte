---
description: TypeScript conventions và best practices trong Monorepo
---

# TypeScript Skills & Conventions

AI phải áp dụng TypeScript một cách nghiêm túc. Dự án dùng `strict: true` và không chấp nhận `any` bừa bãi.

---

## 1. Cấu hình `tsconfig.json` Cơ sở

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

> **`noUncheckedIndexedAccess`**: Khi access array/object bằng index, TypeScript sẽ ép phải check `undefined` – tránh runtime crash.

---

## 2. Type vs Interface

| Dùng `type` | Dùng `interface` |
|---|---|
| Union types, mapped types, utility types | Định nghĩa shape của object có thể extend |
| `type Status = 'active' \| 'inactive'` | `interface UserProfile { id: string; name: string }` |
| Alias phức tạp | Props của React component |

```ts
// Union type → dùng type
type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

// Object shape → dùng interface (có thể extend)
interface CreatePostInput {
  title: string
  content: string
  status?: PostStatus
}
```

---

## 3. React Component Props

```ts
// Luôn define Props interface rõ ràng
interface PostCardProps {
  post: Pick<Post, 'id' | 'title' | 'slug' | 'publishedAt'>
  className?: string
  onDelete?: (id: string) => void  // Optional handler
}

const PostCard = ({ post, className, onDelete }: PostCardProps) => {
  // ...
}
```

---

## 4. Không dùng `any` — Dùng `unknown` thay thế

```ts
// ❌ Sai
function parseResponse(data: any) { ... }

// ✅ Đúng — dùng unknown, buộc phải narrow type trước khi dùng
function parseResponse(data: unknown) {
  if (typeof data !== 'object' || data === null) throw new Error('Invalid data')
  // Safe từ đây
}
```

---

## 5. Utility Types thường dùng

```ts
// Chỉ lấy một số field từ type lớn hơn
type PostSummary = Pick<Post, 'id' | 'title' | 'slug'>

// Loại bỏ field nhạy cảm
type SafeUser = Omit<User, 'passwordHash'>

// Tất cả field optional (dùng cho PATCH/update)
type UpdatePostInput = Partial<CreatePostInput>

// Infer kiểu từ Zod schema
import { z } from 'zod'
const CreatePostSchema = z.object({ title: z.string(), content: z.string() })
type CreatePostInput = z.infer<typeof CreatePostSchema>
```

---

## 6. Monorepo Type Sharing

Các type dùng chung giữa `apps/web` và `apps/admin` phải đặt trong `packages/`:

```ts
// packages/database/src/types.ts — export từ Prisma-generated types
export type { Post, User, GalleryItem } from '../generated/prisma'

// packages/database/src/types.ts — thêm custom types chia sẻ
export type SafeUser = Omit<import('../generated/prisma').User, 'passwordHash'>
```

---

## 7. Async/Await & Error Typing

```ts
// TypeScript không type lỗi trong catch, dùng pattern này:
try {
  // ...
} catch (error) {
  if (error instanceof AppError) {
    // handle known error
  }
  // Unknown error — chỉ log, không expose
  const message = error instanceof Error ? error.message : 'Unknown error'
  console.error(message)
}
```
