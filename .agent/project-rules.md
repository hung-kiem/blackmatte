---
description: Root project rules for the Blackmatte CV/Blog/Gallery project
---

# PROJECT ROOT RULES

Đây là file "Tôn chỉ" (Root Rule) phụ trách định hướng toàn bộ AI Agents khi làm việc trong dự án Blackmatte.
BẤT CỨ KHI NÀO AI bắt đầu một task mới, hoặc có sự nghi ngờ về context, AI BẮT BUỘC phải đọc file này và các file liên kết để tránh "ảo giác" (hallucination).

## 1. Directory Strict Rules & File Locations (Nơi AI cần đọc)

AI PHẢI tìm kiếm và đọc tài liệu đúng vị trí để đảm bảo ngữ cảnh chính xác. Không được tự suy diễn.

- **⭐ Trạng thái Project hiện tại**: `.agent/AGENT_CONTEXT.md` — Đọc file này ĐẦU TIÊN mỗi session để biết Sprint/Task/Branch đang active.
- **Cấu trúc Thư mục & Công nghệ**: `.agent/rules/tech-stack.md`.
- **Rules Cốt Lõi**: `.agent/project-rules.md` (File này) và toàn bộ `.agent/rules/`:
  - `clean-architecture.md` — Phân tầng kiến trúc
  - `code-style.md` — Google Style, ESLint, Prettier
  - `git-branching.md` — Branching & commit convention
  - `security.md` — Auth, secrets, input validation
  - `error-handling.md` — Error types & patterns ⭐ NEW
  - `api-conventions.md` — API Route response shape ⭐ NEW
- **Kỹ năng chuyên môn (Skills)**: `.agent/skills/`:
  - `nextjs.md`, `react.md`, `system-design.md`
  - `prisma.md` — Repository pattern, transactions ⭐ NEW
  - `typescript.md` — strict conventions, type sharing ⭐ NEW
- **Quy trình (Workflows)**: `.agent/workflows/`:
  - `feature-development.md`, `update-feature.md`, `hotfix.md`, `deployment.md`
  - `code-review.md` — Checklist review theo Layer ⭐ NEW
- **Thiết kế Hệ thống**: `.agent/docs/system-design.md`
- **Database Design**: `.agent/docs/database/` ⭐ NEW
  - `erd.md` — Entity Relationship Diagram
  - `naming-convention.md` — Table/column/enum naming
  - `index-strategy.md` — Khi nào cần index
- **Agile/Scrum**: `.agent/docs/agile/` (Epic, Sprint, Task templates trong `templates/`)
- **Requirements**: `.agent/docs/requirements/` (URD, SRS templates trong `templates/`)
- **Testing**: `.agent/docs/testing/testing-strategy.md` ⭐ NEW
- **Architecture Decisions**: `.agent/docs/decisions/` ⭐ NEW (ADR-XXX files)
- **Tasks đang thực hiện**: `.agent/tasks/` (dùng template từ `docs/agile/templates/task-template.md`)
- **Lỗi đã biết (Known Issues)**: `.agent/docs/troubleshooting/known-issues.md`

## 2. Git & Branching Strategy

Chi tiết xem tại: `.agent/rules/git-branching.md`.
**Tóm tắt**:

- KHÔNG BAO GIỜ push trực tiếp lên `main`/`develop`.
- Đảm bảo "Pre-branching" (không để quên code local chưa push/commit).
- Format nhánh: `feat/<module>-<short_desc>` (VD: `feat/DB-schema-init`).

## 3. Quản lý Chất lượng Code (Linting & Styling)

Chi tiết xem tại: `.agent/rules/code-style.md`.
**Tóm tắt**:

- Tuân thủ Google Code Style.
- Bắt buộc vượt qua ESLint và Prettier trước khi run/build/commit. Lỗi ESLint phải được sửa triệt để.

## 4. Architectural Principles

Chi tiết xem tại: `.agent/rules/clean-architecture.md`.
**Tóm tắt**:

- **Clean Architecture**: Tách biệt rõ ràng Data Access (DB Layer), Business Logic (Core/Service Layer), và Presentation (UI/Controllers). Cấm viết Query DB hay Logic tính toán rườm rà chồng chéo trong cục diện UI Component/Server Actions.
- **Monorepo**: Các thư viện nội bộ (UI, Config, Database) nằm trong `packages/` và được tái sử dụng qua `apps/web` và `apps/admin`.
- **Document-Driven**: Bất cứ logic hay module phức tạp nào cũng phải được mô tả bằng Markdown ở `.agent/docs/` trước khi code.

## 5. Security Rules

Chi tiết xem tại: `.agent/rules/security.md`.
**Tóm tắt**:

- File `.env` và bí mật bị cấm push lên web. Cẩn thận với `NEXT_PUBLIC_`.
- Server Actions luôn phải Verify Authentication Authorization tại gốc. Không bao giờ tin tưởng Client/UI.
- Luôn kiểm soát dữ liệu trả về từ DB (Tránh rò rỉ password) và validate chặt chẽ input gửi lên bằng Zod schema.

## 6. 🚨 Quy tắc Vàng — Hỏi Trước, Code Sau

> Đây là quy tắc quan trọng nhất. Vi phạm quy tắc này gây ra lãng phí công sức và sai hướng.

- **AI PHẢI ĐẶT CÂU HỎI ngay cả khi chỉ có 1% thắc mắc** về yêu cầu, trước khi bắt đầu viết code hoặc tạo tài liệu.
- **TUYỆT ĐỐI KHÔNG tự suy luận** hay đặt giả thuyết về những gì User muốn. Nếu không rõ → HỎI.
- **TUYỆT ĐỐI KHÔNG tự ý thêm entity, field, tính năng** vào schema hoặc code khi chưa được User xác nhận.
- **Khi nhận yêu cầu mơ hồ**: Liệt kê danh sách câu hỏi ngắn gọn, súc tích. Chờ User trả lời đầy đủ mới bắt đầu.
- **Không làm thay vì hỏi**: Nếu có thể hỏi để chắc chắn, luôn ưu tiên hỏi thay vì làm rồi sửa.

**Ví dụ đúng:**
> User: "Thêm tính năng tìm kiếm"
> AI: "Tìm kiếm theo tiêu đề bài viết, hay cả nội dung? Có cần filter theo tag không? Hiển thị kết quả dạng list hay dropdown?"

**Ví dụ sai:**
> User: "Thêm tính năng tìm kiếm"
> AI: *[Tự động viết full-text search với filter tag và dropdown UI]*

## 7. 🚨 Quy tắc Bắt buộc — Plan Trước, Code Sau

> AI **KHÔNG ĐƯỢC** tự ý sinh code khi chưa có tài liệu được User phê duyệt.

### Chuỗi tài liệu bắt buộc (Theo thứ tự)

```
PRD (Product Requirements Doc)
 └─► URD (User Requirements Doc)
      └─► SRS (Software Requirements Spec)
           └─► TDD (Technical Design Doc)
                └─► Test Plan / Testcases
                     └─► ✅ Code được phép viết
```

### Quy trình bắt buộc

1. **Nhận yêu cầu** → Đặt câu hỏi làm rõ nếu có bất kỳ điểm mơ hồ nào (dù 1%).
2. **Tạo Epic file** → (`docs/agile/epics/EPC-XXX.md`) → Gửi User duyệt.
3. **Tạo Sprint file** → (`docs/agile/sprints/SPR-XXX.md`) → Gửi User duyệt.
4. **Tạo Task files** → (`.agent/tasks/TSK-XXX.md`) cho từng task.
5. **Viết PRD** → Gửi User duyệt.
6. **Viết URD** → (dựa trên PRD đã approve) → Gửi User duyệt.
7. **Viết SRS** → (dựa trên URD đã approve) → Gửi User duyệt.
8. **Viết TDD** → (Technical Design) → Gửi User duyệt.
9. **Viết Test Plan / Testcases** → Gửi User duyệt.
10. **Chỉ sau khi có ít nhất SRS được approve** → AI mới bắt đầu viết code.

### Tiêu chuẩn tài liệu

- Dùng **User Story** format ở URD và SRS: *"As a [role], I want [action] so that [benefit]."*
- Chuẩn quốc tế: Mỗi requirement có ID duy nhất (VD: `FR-001`, `NFR-001`).
- Mọi field của entity phải được mô tả rõ: tên, kiểu dữ liệu, bắt buộc/tùy chọn, validation rule.

## 8. 🔧 Quy tắc Tự động Sửa lỗi khi Code

> Khi AI đang generate code theo TDD/SRS đã approve, gặp lỗi kỹ thuật thì **tự sửa — không dừng lại hỏi User**.

### Áp dụng khi

- Build error / compile error (TypeScript, ESLint) sau khi viết code
- Runtime error khi chạy test / lệnh terminal
- Import path sai, missing dependency, type mismatch
- Lint error có thể fix tự động

### Quy trình

```
1. Gặp lỗi kỹ thuật
    ├─► Đọc error message đầy đủ
    ├─► Xác định root cause
    ├─► Fix code / cấu hình
    ├─► Chạy lại lệnh / test
    └─► Lặp lại tối đa 3 lần cho cùng 1 lỗi

2. Sau khi fix xong → tiếp tục công việc bình thường

3. Nếu sau 3 lần thử vẫn thất bại → BÁO CÁO User:
   - Mô tả lỗi chính xác
   - Những gì đã thử
   - Đề xuất hướng giải quyết
```

### KHÔNG áp dụng khi

- Lỗi liên quan đến **yêu cầu chưa rõ** (phải hỏi User — Rule 6)
- Lỗi yêu cầu **thay đổi thiết kế** so với TDD đã approve (phải báo cáo User)
- Lỗi liên quan đến **môi trường / infrastructure** (Docker down, missing env var)

**Ví dụ đúng:**
> AI viết code → `tsc` báo lỗi type → AI sửa type signature → chạy lại `tsc` → pass → tiếp tục

**Ví dụ sai:**
> AI viết code → gặp lỗi import → hỏi User "Package này cài chưa ạ?"

## 9. 🏗️ Quy tắc Bắt buộc — Luôn Build Sau Khi Code

> AI **BẮT BUỘC** phải chạy đầy đủ pipeline build sau khi viết/sửa code, TRƯỚC KHI commit hoặc báo cáo User.

### Pipeline Build bắt buộc (theo thứ tự)

```
1. pnpm install          # Cài dependencies mới (nếu package.json thay đổi)
2. prisma generate       # Generate Prisma Client (nếu schema.prisma thay đổi)
3. prisma migrate dev    # Tạo migration (nếu schema.prisma thay đổi)
4. pnpm lint             # ESLint — phải pass 100%
5. pnpm build            # TypeScript + Next.js build — phải exit code 0
```

### Quy tắc

- **KHÔNG BAO GIỜ** báo cáo "hoàn thành" khi chưa chạy `pnpm build` thành công
- **KHÔNG BAO GIỜ** commit code khi build chưa pass
- Nếu `pnpm build` fail → áp dụng Rule 8 (tự sửa tối đa 3 lần)
- Nếu thay đổi `packages/database/prisma/schema.prisma` → **BẮT BUỘC** chạy `prisma generate` và `prisma migrate dev`
- Sau khi `pnpm install` → kiểm tra native modules đã build (bcrypt, prisma) — nếu bị ignored, chạy `pnpm rebuild`

### Điều kiện "Hoàn thành" (Definition of Done cho code)

- [ ] `pnpm install` — no errors
- [ ] `prisma generate` — generated successfully (nếu có schema changes)
- [ ] `pnpm lint` — 0 errors
- [ ] `pnpm build` — exit code 0
- [ ] Không còn file trùng lặp hoặc file thừa

## 10. 🔍 Quy tắc Bắt buộc — Code Review Tự động

> Sau khi code + build pass, AI **BẮT BUỘC** phải tự review code trước khi commit.

### Trigger

- Khi AI hoàn thành viết code mới (feature, fix, refactor)
- Sau khi `pnpm build` pass thành công (Rule 9)
- TRƯỚC KHI commit hoặc báo cáo User

### Quy trình

```
1. pnpm build PASS ✅
    └─► Tự chạy Code Review Workflow (.agent/workflows/code-review.md)
         ├─► Layer 1: Database changes
         ├─► Layer 2: Business Logic
         ├─► Layer 3: Security
         ├─► Layer 4: UI/Frontend
         ├─► Code Quality Checklist
         └─► Viết Review Report tóm tắt

2. Nếu review phát hiện issues:
    ├─► Issues nghiêm trọng → Fix trước khi commit
    └─► Suggestions → Ghi chú trong report, không cần fix ngay

3. Gửi Review Report cho User kèm code delivery
```

### Output Format

Khi báo cáo kết quả code cho User, AI phải kèm theo Review Report ngắn gọn:

```markdown
## 🔍 Self-Review Report
- ✅ Build: pass
- ✅/⚠️ Security: [tóm tắt]
- ✅/⚠️ Code Quality: [tóm tắt]
- 💡 Suggestions: [nếu có]
```
