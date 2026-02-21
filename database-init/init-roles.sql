-- Thiết lập Role và Quyền hạn cho Database Local
-- Chạy tự động trong quá trình khởi tạo Container PostgreSQL lần đầu tiên

-- Tạo Role admin: Có quyền CRUD để dùng cho Admin Portal & DB Migration
CREATE ROLE admin_user WITH LOGIN PASSWORD 'admin_password_local';

-- Tạo Role web: Chỉ có quyền SELECT (Read-only) để dùng cho Frontend Web
CREATE ROLE web_user WITH LOGIN PASSWORD 'web_password_local';

-- Kết nối vào Database chính của dự án 
\c blackmatte_db;

-----------------------------------------------------------------------------
-- PHÂN QUYỀN CHO ADMIN USER (Toàn quyền CRUD)
-----------------------------------------------------------------------------
GRANT USAGE, CREATE ON SCHEMA public TO admin_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO admin_user;

-- Đảm bảo các bảng tạo mới trong tương lai cũng tự động cấp quyền cho Admin
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO admin_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO admin_user;


-----------------------------------------------------------------------------
-- PHÂN QUYỀN CHO WEB USER (Chỉ Read-Only)
-----------------------------------------------------------------------------
GRANT USAGE ON SCHEMA public TO web_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO web_user;

-- Đảm bảo Web User chỉ có quyền SELECT vào các bảng được tạo trong tương lai
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO web_user;
