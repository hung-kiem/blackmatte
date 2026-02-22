---
id: SPR-04
goal: Xây dựng Website public (apps/web) — khách truy cập đọc Blog và xem Portfolio
start_date: TBD
end_date: TBD
status: PLANNED
total_points: 29
completed_points: 0
---

# SPR-04 — Website Public (apps/web)

## Sprint Goal

Hoàn thiện toàn bộ `apps/web` — Website công khai theo phong cách Medium.com — để khách truy cập có thể đọc Blog và xem Portfolio / CV. Thông luồng end-to-end: Admin publish bài → website hiển thị bài trong vòng 5 phút.

---

## Sprint Backlog

| Task | Tên | Points | Assignee | Status |
|---|---|---|---|---|
| TSK-16 | Layout: Header navigation + Footer | 3 | AI | TODO |
| TSK-17 | Homepage — hero section + preview Blog & Portfolio | 3 | AI | TODO |
| TSK-18 | Blog list page — ISR + filter theo tag | 5 | AI | TODO |
| TSK-19 | Blog detail page — render rich text (Tiptap HTML) + ISR | 5 | AI | TODO |
| TSK-20 | Portfolio list page — ISR, sort priority | 3 | AI | TODO |
| TSK-21 | Portfolio detail page — full fields, ISR | 3 | AI | TODO |
| TSK-22 | CV / Profile page — ISR | 3 | AI | TODO |
| TSK-23 | ISR revalidation trigger — gọi `revalidatePath` khi Admin publish | 4 | AI | TODO |

**Tổng Points commit: 29**

---

## Technical Notes

- **DB User**: `web_user` (SELECT only) — cấu hình qua `DATABASE_URL_WEB`
- **Caching**: ISR với `revalidate: 300` (5 phút) cho tất cả trang public
- **On-demand revalidation**: Khi Admin publish/unpublish bài, Server Action gọi `revalidatePath('/blog')` và `revalidateTag('posts')` để xóa cache ngay
- **XSS Protection**: Tiptap rendered HTML phải qua `DOMPurify` hoặc thư viện sanitize trước khi render bằng `dangerouslySetInnerHTML`
- **SEO**: Mọi `page.tsx` cần `generateMetadata` đầy đủ (title, description, og:image)
- **Responsive**: Mobile-first, tham khảo Medium.com layout

---

## Definition of Done (Sprint)

- [ ] Homepage hiển thị với hero section và preview các bài viết mới nhất
- [ ] Blog list hiển thị danh sách bài published, filter được theo tag
- [ ] Blog detail render đúng nội dung Tiptap, code highlight hoạt động
- [ ] Portfolio list và detail hiển thị đầy đủ thông tin
- [ ] CV/Profile page hiển thị thông tin từ `Profile` table
- [ ] Header và Footer hoạt động, navigation đúng routes
- [ ] Publish bài từ Admin → website cập nhật trong ≤ 5 phút (ISR)
- [ ] SEO metadata đầy đủ trên tất cả trang
- [ ] `web_user` database connection hoạt động (chỉ SELECT)
- [ ] `pnpm lint` và `pnpm build` pass
