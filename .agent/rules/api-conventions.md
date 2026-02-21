---
description: Quy ước API Response & Route conventions (cho các route không dùng Server Actions)
---

# API Conventions

Dù project ưu tiên Server Actions, một số trường hợp vẫn cần API Routes (webhooks, third-party callbacks, public JSON endpoints). Tất cả API Routes phải tuân thủ chuẩn sau.

---

## 1. Khi nào dùng API Route thay vì Server Action?

| Dùng Server Action | Dùng API Route |
|---|---|
| Form submissions | Nhận webhook từ Stripe/S3/etc. |
| CRUD từ Admin UI | Cần public REST endpoint (cho mobile app, v.v.) |
| Data mutations | Third-party OAuth callbacks |
| Redirect sau action | Cần CORS headers |

---

## 2. Response Shape Chuẩn (JSON)

**Mọi** API Route phải trả về theo format này:

```ts
// Success Response
{
  "success": true,
  "data": { ... }          // Kết quả thực sự
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",   // Error code (dạng SCREAMING_SNAKE)
    "message": "Tiêu đề không được để trống"  // User-friendly message
  }
}
```

---

## 3. HTTP Status Codes

| Tình huống | Status Code |
|---|---|
| Thành công GET/POST | `200 OK` |
| Tạo mới thành công | `201 Created` |
| Không có nội dung trả về | `204 No Content` |
| Lỗi validation (dữ liệu sai) | `400 Bad Request` |
| Chưa đăng nhập | `401 Unauthorized` |
| Đã đăng nhập nhưng không đủ quyền | `403 Forbidden` |
| Không tìm thấy resource | `404 Not Found` |
| Lỗi server không xác định | `500 Internal Server Error` |

---

## 4. Ví dụ API Route Handler

```ts
// app/api/webhooks/s3/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const S3WebhookSchema = z.object({
  key: z.string(),
  size: z.number(),
})

export async function POST(req: NextRequest) {
  try {
    // 1. Verify webhook signature (nếu có)
    const signature = req.headers.get('x-webhook-signature')
    if (!isValidSignature(signature)) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_SIGNATURE', message: 'Webhook không hợp lệ' } },
        { status: 401 },
      )
    }

    // 2. Parse & validate body
    const body = await req.json()
    const parsed = S3WebhookSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Dữ liệu không hợp lệ' } },
        { status: 400 },
      )
    }

    // 3. Business logic
    await updateMediaRecord(parsed.data)

    return NextResponse.json({ success: true, data: null }, { status: 200 })
  } catch (error) {
    console.error('[POST /api/webhooks/s3]', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Lỗi server' } },
      { status: 500 },
    )
  }
}
```

---

## 5. Naming Convention cho API Routes

| Pattern | Ví dụ |
|---|---|
| RESTful resource paths | `/api/posts`, `/api/posts/[id]` |
| Webhook paths | `/api/webhooks/[provider]` |
| Không dùng verbs trong URL | `/api/posts` ✅, `/api/getPosts` ❌ |
| Lowercase, kebab-case | `/api/gallery-items` ✅ |

---

## 6. CORS

- **Mặc định**: Không cần CORS headers — Next.js Route Handlers chỉ nhận request từ same origin.
- **Nếu cần CORS** (cho mobile app): Khai báo rõ trong `next.config.mjs` và chỉ whitelist domain cụ thể, không dùng wildcard `*` cho production.
