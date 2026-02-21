---
description: Testing Strategy toàn dự án — Unit, Integration, E2E
---

# Testing Strategy

Dự án Blackmatte áp dụng **Testing Pyramid** với 3 tầng kiểm thử, ưu tiên tốc độ và ROI cao.

---

## 1. Testing Pyramid

```
        /\
       /  \   E2E Tests (ít nhất)
      /    \  → Playwright: Critical user flows
     /------\
    /        \ Integration Tests (vừa)
   /          \ → Vitest: Server Actions + DB queries
  /------------\
 /              \ Unit Tests (nhiều nhất)
/                \ → Vitest: Pure functions, utils, validators
```

---

## 2. Unit Tests

**Tool**: Vitest  
**Target**: Pure functions, utils, Zod validators, helper functions  
**Location**: `__tests__/unit/` hoặc file `.test.ts` cạnh source file  
**Coverage Target**: ≥ 80% với business logic

```ts
// Ví dụ: test Zod schema validator
import { describe, it, expect } from 'vitest'
import { CreatePostSchema } from '@/lib/validators/post'

describe('CreatePostSchema', () => {
  it('should reject empty title', () => {
    const result = CreatePostSchema.safeParse({ title: '', content: 'x' })
    expect(result.success).toBe(false)
  })
})
```

**Lệnh chạy**:
```bash
npm run test:unit          # Chạy unit tests
npm run test:unit -- --coverage  # Kèm coverage report
```

---

## 3. Integration Tests

**Tool**: Vitest + Prisma Test Client (test DB riêng)  
**Target**: Server Actions, Repository functions, DB queries  
**Location**: `__tests__/integration/`  
**Setup**: Dùng biến môi trường `DATABASE_URL_TEST` trỏ vào test database riêng

```ts
// Ví dụ: test Server Action createPost
import { createPost } from '@/actions/post'
import { prisma } from '@repo/database'

describe('createPost Action', () => {
  afterEach(async () => {
    await prisma.post.deleteMany()  // Cleanup sau mỗi test
  })

  it('should create a post when authenticated as admin', async () => {
    // ...
  })
})
```

**Lệnh chạy**:
```bash
npm run test:integration
```

---

## 4. E2E Tests (End-to-End)

**Tool**: Playwright  
**Target**: Critical user flows — không test mọi thứ, chỉ test flow quan trọng nhất  
**Location**: `e2e/`  
**Môi trường**: Chạy trên local dev server (`npm run dev`)

### Danh sách E2E flows ưu tiên

| Flow | Mô tả | Priority |
|---|---|---|
| Admin Login | Đăng nhập admin thành công/thất bại | HIGH |
| Create Blog Post | Admin tạo bài viết và publish | HIGH |
| Public Blog View | Khách đọc bài blog | MEDIUM |
| Gallery View | Khách xem gallery | MEDIUM |

**Lệnh chạy**:
```bash
npm run test:e2e           # Headless mode
npm run test:e2e -- --ui   # UI mode (debug)
```

---

## 5. Test File Naming Convention

| Loại | Pattern | Ví dụ |
|---|---|---|
| Unit | `*.test.ts` | `createSlug.test.ts` |
| Integration | `*.integration.test.ts` | `createPost.integration.test.ts` |
| E2E | `*.spec.ts` | `admin-login.spec.ts` |

---

## 6. CI/CD Testing

- **Pull Request**: Chạy `test:unit` + `test:integration` + `lint` + `build`
- **Merge to main**: Chạy tất cả bao gồm `test:e2e`
- **Không merge nếu**: Có test fail hoặc coverage < 80%

---

## 7. Môi trường Test

```bash
# .env.test (không commit — chỉ để local)
DATABASE_URL_TEST="postgresql://superadmin:superadmin_password@localhost:5432/blackmatte_test"
```
