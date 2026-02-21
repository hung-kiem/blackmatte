---
description: Kỹ năng & Best Practices cho Prisma ORM trong Monorepo
---

# Prisma Skills & Best Practices

AI khi làm việc với Database layer (`packages/database`) phải tuân thủ các pattern sau.

---

## 1. Client Singleton (Quan trọng với Serverless)

Do Next.js dev server hot-reload liên tục, phải dùng singleton pattern để tránh tạo quá nhiều connection:

```ts
// packages/database/src/client.ts
import { PrismaClient } from '../generated/prisma'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

---

## 2. Repository Pattern (Bắt buộc)

Không được phép gọi `prisma.*` trực tiếp trong Server Actions hay UI. Phải đi qua Repository:

```ts
// packages/database/src/repositories/post.repository.ts
import { prisma } from '../client'
import type { Post, Prisma } from '../generated/prisma'

export const postRepository = {
  async findById(id: string): Promise<Post | null> {
    return prisma.post.findUnique({ where: { id } })
  },

  async findAllPublished(): Promise<Post[]> {
    return prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      select: {         // LUÔN select cụ thể, không select *
        id: true,
        title: true,
        slug: true,
        publishedAt: true,
      },
    })
  },

  async create(data: Prisma.PostCreateInput): Promise<Post> {
    return prisma.post.create({ data })
  },

  async update(id: string, data: Prisma.PostUpdateInput): Promise<Post> {
    return prisma.post.update({ where: { id }, data })
  },

  async delete(id: string): Promise<void> {
    await prisma.post.delete({ where: { id } })
  },
}
```

---

## 3. Select Cụ thể — Không dùng mặc định

```ts
// ❌ Sai — trả về toàn bộ object kể cả passwordHash
const user = await prisma.user.findUnique({ where: { id } })

// ✅ Đúng — chỉ lấy field cần thiết
const user = await prisma.user.findUnique({
  where: { id },
  select: { id: true, email: true, role: true },
})
```

---

## 4. Transactions

Khi cần đảm bảo atomic (nhiều thao tác DB phải cùng thành công hoặc cùng fail):

```ts
const result = await prisma.$transaction(async (tx) => {
  const post = await tx.post.create({ data: postData })
  await tx.activityLog.create({ data: { action: 'CREATE_POST', postId: post.id } })
  return post
})
```

---

## 5. Upsert Pattern

Khi muốn create-or-update (tránh duplicate):

```ts
const tag = await prisma.tag.upsert({
  where: { slug: 'nextjs' },
  update: { name: 'Next.js' },
  create: { slug: 'nextjs', name: 'Next.js' },
})
```

---

## 6. Migration Workflow

```bash
# Dev: Tạo migration mới khi thay đổi schema
npx prisma migrate dev --name add_gallery_item_table

# Production: Chỉ apply migration đã có, không tạo mới
npx prisma migrate deploy

# Inspect DB hiện tại (không thay đổi gì)
npx prisma studio
```

> ⚠️ **Không bao giờ** dùng `migrate deploy` trên Production mà không có User (Tech Lead) approval.

---

## 7. Raw Query — Chỉ khi bất khả kháng

```ts
// ❌ Nguy hiểm — SQL Injection
const result = await prisma.$queryRaw(`SELECT * FROM Post WHERE slug = '${slug}'`)

// ✅ An toàn — dùng tagged template literal
const result = await prisma.$queryRaw<Post[]>`
  SELECT * FROM "Post" WHERE slug = ${slug}
`
```
