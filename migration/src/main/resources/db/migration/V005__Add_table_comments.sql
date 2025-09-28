-- =====================================================
-- POSTS TABLE - Bài viết blog
-- =====================================================
COMMENT ON TABLE posts IS 'Bảng lưu trữ các bài viết blog của website';

COMMENT ON COLUMN posts.id IS 'ID duy nhất của bài viết, tự động tăng';
COMMENT ON COLUMN posts.title IS 'Tiêu đề bài viết, tối đa 255 ký tự';
COMMENT ON COLUMN posts.slug IS 'URL thân thiện cho SEO (VD: bai-viet-dau-tien), phải unique';
COMMENT ON COLUMN posts.content IS 'Nội dung đầy đủ của bài viết, có thể chứa HTML hoặc Markdown';
COMMENT ON COLUMN posts.excerpt IS 'Tóm tắt ngắn của bài viết để hiển thị ở trang chủ hoặc danh sách';
COMMENT ON COLUMN posts.featured_image_url IS 'URL ảnh đại diện của bài viết';
COMMENT ON COLUMN posts.status IS 'Trạng thái bài viết: DRAFT (nháp), PUBLISHED (đã xuất bản)';
COMMENT ON COLUMN posts.published_at IS 'Thời điểm xuất bản bài viết, có thể khác với created_at';
COMMENT ON COLUMN posts.view_count IS 'Số lượt xem bài viết, mặc định 0';
COMMENT ON COLUMN posts.meta_title IS 'Tiêu đề SEO cho thẻ <title>, có thể khác với title chính';
COMMENT ON COLUMN posts.meta_description IS 'Mô tả SEO cho thẻ meta description, tối đa 500 ký tự';
COMMENT ON COLUMN posts.created_at IS 'Thời điểm tạo bài viết';
COMMENT ON COLUMN posts.updated_at IS 'Thời điểm cập nhật cuối cùng, tự động update khi có thay đổi';

-- =====================================================
-- YOUTUBE_VIDEOS TABLE - Video YouTube
-- =====================================================
COMMENT ON TABLE youtube_videos IS 'Bảng lưu trữ thông tin các video YouTube được chia sẻ trên blog';

COMMENT ON COLUMN youtube_videos.id IS 'ID duy nhất của video, tự động tăng';
COMMENT ON COLUMN youtube_videos.title IS 'Tiêu đề video YouTube';
COMMENT ON COLUMN youtube_videos.youtube_id IS 'ID video từ YouTube (VD: dQw4w9WgXcQ từ URL youtube.com/watch?v=dQw4w9WgXcQ)';
COMMENT ON COLUMN youtube_videos.youtube_url IS 'URL đầy đủ của video YouTube';
COMMENT ON COLUMN youtube_videos.description IS 'Mô tả video hoặc ghi chú thêm từ admin';
COMMENT ON COLUMN youtube_videos.thumbnail_url IS 'URL ảnh thumbnail của video (có thể lấy từ YouTube API)';
COMMENT ON COLUMN youtube_videos.published_at IS 'Thời điểm xuất bản video trên blog (khác với ngày upload YouTube)';
COMMENT ON COLUMN youtube_videos.view_count IS 'Số lượt xem video trên blog, mặc định 0';
COMMENT ON COLUMN youtube_videos.status IS 'Trạng thái video: DRAFT (nháp), PUBLISHED (công khai), PRIVATE (riêng tư), UNLISTED (không niêm yết)';
COMMENT ON COLUMN youtube_videos.is_public IS 'Có hiển thị công khai trên blog hay không (true/false)';
COMMENT ON COLUMN youtube_videos.playlist_id IS 'ID của playlist chứa video này, có thể NULL';
COMMENT ON COLUMN youtube_videos.playlist_order IS 'Thứ tự video trong playlist, mặc định 0';
COMMENT ON COLUMN youtube_videos.duration IS 'Thời lượng video tính bằng giây (VD: 300 = 5 phút)';
COMMENT ON COLUMN youtube_videos.created_at IS 'Thời điểm thêm video vào hệ thống';
COMMENT ON COLUMN youtube_videos.updated_at IS 'Thời điểm cập nhật cuối cùng';

-- =====================================================
-- GALLERY_PHOTOS TABLE - Thư viện ảnh
-- =====================================================
COMMENT ON TABLE gallery_photos IS 'Bảng lưu trữ các ảnh trong thư viện cá nhân';

COMMENT ON COLUMN gallery_photos.id IS 'ID duy nhất của ảnh, tự động tăng';
COMMENT ON COLUMN gallery_photos.title IS 'Tiêu đề hoặc tên của ảnh';
COMMENT ON COLUMN gallery_photos.description IS 'Mô tả chi tiết về ảnh, câu chuyện đằng sau ảnh';
COMMENT ON COLUMN gallery_photos.image_url IS 'URL công khai để truy cập ảnh (CDN, cloud storage...)';
COMMENT ON COLUMN gallery_photos.image_path IS 'Đường dẫn lưu trữ file ảnh trên server';
COMMENT ON COLUMN gallery_photos.file_size IS 'Kích thước file ảnh tính bằng bytes';
COMMENT ON COLUMN gallery_photos.width IS 'Chiều rộng ảnh tính bằng pixel';
COMMENT ON COLUMN gallery_photos.height IS 'Chiều cao ảnh tính bằng pixel';
COMMENT ON COLUMN gallery_photos.taken_at IS 'Thời điểm chụp ảnh (EXIF data)';
COMMENT ON COLUMN gallery_photos.location IS 'Địa điểm chụp ảnh (VD: Hạ Long Bay, Việt Nam)';
COMMENT ON COLUMN gallery_photos.camera_info IS 'Thông tin máy ảnh và setting (VD: Canon EOS R5, f/2.8, ISO 100)';
COMMENT ON COLUMN gallery_photos.is_featured IS 'Ảnh nổi bật được hiển thị ở trang chủ hay không';
COMMENT ON COLUMN gallery_photos.view_count IS 'Số lượt xem ảnh';
COMMENT ON COLUMN gallery_photos.status IS 'Trạng thái ảnh: DRAFT (nháp), PUBLISHED (công khai), PRIVATE (riêng tư)';
COMMENT ON COLUMN gallery_photos.is_public IS 'Có hiển thị công khai hay không';
COMMENT ON COLUMN gallery_photos.album_id IS 'ID của album chứa ảnh này, có thể NULL';
COMMENT ON COLUMN gallery_photos.album_order IS 'Thứ tự ảnh trong album';
COMMENT ON COLUMN gallery_photos.created_at IS 'Thời điểm upload ảnh lên hệ thống';
COMMENT ON COLUMN gallery_photos.updated_at IS 'Thời điểm cập nhật thông tin ảnh cuối cùng';

-- =====================================================
-- PROJECTS TABLE - Thông tin dự án
-- =====================================================
COMMENT ON TABLE projects IS 'Bảng lưu trữ thông tin các dự án đã thực hiện (cá nhân, công ty, freelance)';

COMMENT ON COLUMN projects.id IS 'ID duy nhất của dự án, tự động tăng';
COMMENT ON COLUMN projects.name IS 'Tên dự án';
COMMENT ON COLUMN projects.slug IS 'URL thân thiện cho dự án (VD: blackmatte-blog)';
COMMENT ON COLUMN projects.description IS 'Mô tả ngắn gọn về dự án';
COMMENT ON COLUMN projects.content IS 'Mô tả chi tiết về dự án, có thể chứa HTML';
COMMENT ON COLUMN projects.project_type IS 'Loại dự án: PERSONAL (cá nhân), COMPANY (công ty), FREELANCE (tự do), OPENSOURCE (mã nguồn mở)';
COMMENT ON COLUMN projects.company_name IS 'Tên công ty thực hiện dự án (nếu là dự án công ty)';
COMMENT ON COLUMN projects.team_size IS 'Số lượng thành viên trong team';
COMMENT ON COLUMN projects.my_role IS 'Vai trò của tôi trong dự án (VD: Full-stack Developer, Team Lead)';
COMMENT ON COLUMN projects.technologies IS 'Các công nghệ sử dụng, lưu dạng JSON array (VD: ["Java", "Spring Boot", "React"])';
COMMENT ON COLUMN projects.project_url IS 'URL demo hoặc production của dự án';
COMMENT ON COLUMN projects.github_url IS 'URL repository GitHub của dự án';
COMMENT ON COLUMN projects.thumbnail_url IS 'URL ảnh đại diện của dự án';
COMMENT ON COLUMN projects.start_date IS 'Ngày bắt đầu dự án';
COMMENT ON COLUMN projects.end_date IS 'Ngày kết thúc dự án, NULL nếu đang ongoing';
COMMENT ON COLUMN projects.is_featured IS 'Dự án nổi bật được hiển thị ở trang chủ hay không';
COMMENT ON COLUMN projects.status IS 'Trạng thái dự án: COMPLETED (hoàn thành), ONGOING (đang thực hiện), PAUSED (tạm dừng), CANCELLED (hủy bỏ)';
COMMENT ON COLUMN projects.view_count IS 'Số lượt xem chi tiết dự án';
COMMENT ON COLUMN projects.created_at IS 'Thời điểm thêm dự án vào hệ thống';
COMMENT ON COLUMN projects.updated_at IS 'Thời điểm cập nhật thông tin dự án cuối cùng';

-- =====================================================
-- PROJECT_IMAGES TABLE - Ảnh minh họa dự án
-- =====================================================
COMMENT ON TABLE project_images IS 'Bảng lưu trữ các ảnh screenshot, demo của từng dự án';

COMMENT ON COLUMN project_images.id IS 'ID duy nhất của ảnh dự án, tự động tăng';
COMMENT ON COLUMN project_images.project_id IS 'ID của dự án chứa ảnh này';
COMMENT ON COLUMN project_images.image_url IS 'URL công khai để truy cập ảnh';
COMMENT ON COLUMN project_images.image_path IS 'Đường dẫn lưu trữ file ảnh trên server';
COMMENT ON COLUMN project_images.caption IS 'Chú thích cho ảnh (VD: Homepage Design, Admin Dashboard)';
COMMENT ON COLUMN project_images.display_order IS 'Thứ tự hiển thị ảnh trong dự án';
COMMENT ON COLUMN project_images.created_at IS 'Thời điểm upload ảnh';

-- =====================================================
-- TAGS TABLE - Thẻ phân loại
-- =====================================================
COMMENT ON TABLE tags IS 'Bảng lưu trữ các thẻ (tags) để phân loại nội dung';

COMMENT ON COLUMN tags.id IS 'ID duy nhất của tag, tự động tăng';
COMMENT ON COLUMN tags.name IS 'Tên hiển thị của tag (VD: Java, Spring Boot, Photography)';
COMMENT ON COLUMN tags.slug IS 'URL thân thiện của tag (VD: java, spring-boot, photography)';
COMMENT ON COLUMN tags.created_at IS 'Thời điểm tạo tag';

-- =====================================================
-- TAGGABLE TABLE - Quan hệ polymorphic tags
-- =====================================================
COMMENT ON TABLE taggable IS 'Bảng junction để liên kết tags với các loại nội dung khác nhau (posts, videos, photos, projects, playlists, albums)';

COMMENT ON COLUMN taggable.tag_id IS 'ID của tag';
COMMENT ON COLUMN taggable.taggable_id IS 'ID của object được gắn tag (có thể là post_id, video_id, photo_id, project_id...)';
COMMENT ON COLUMN taggable.taggable_type IS 'Loại object: POST (bài viết), VIDEO (video), PHOTO (ảnh), PROJECT (dự án), PLAYLIST (danh sách phát), ALBUM (album ảnh)';

-- =====================================================
-- SITE_SETTINGS TABLE - Cài đặt website
-- =====================================================
COMMENT ON TABLE site_settings IS 'Bảng lưu trữ các cài đặt cấu hình của website';

COMMENT ON COLUMN site_settings.id IS 'ID duy nhất của setting, tự động tăng';
COMMENT ON COLUMN site_settings.setting_key IS 'Khóa cài đặt (VD: site_title, site_description, youtube_channel_url)';
COMMENT ON COLUMN site_settings.setting_value IS 'Giá trị của cài đặt';
COMMENT ON COLUMN site_settings.created_at IS 'Thời điểm tạo setting';
COMMENT ON COLUMN site_settings.updated_at IS 'Thời điểm cập nhật setting cuối cùng';

-- =====================================================
-- PLAYLISTS TABLE - Danh sách phát video
-- =====================================================
COMMENT ON TABLE playlists IS 'Bảng lưu trữ các playlist để nhóm các video YouTube theo chủ đề';

COMMENT ON COLUMN playlists.id IS 'ID duy nhất của playlist, tự động tăng';
COMMENT ON COLUMN playlists.name IS 'Tên playlist (VD: Java Programming Course, Travel Vlogs)';
COMMENT ON COLUMN playlists.slug IS 'URL thân thiện của playlist (VD: java-programming-course)';
COMMENT ON COLUMN playlists.description IS 'Mô tả chi tiết về playlist';
COMMENT ON COLUMN playlists.thumbnail_url IS 'URL ảnh đại diện của playlist';
COMMENT ON COLUMN playlists.is_public IS 'Playlist có công khai hay không';
COMMENT ON COLUMN playlists.is_featured IS 'Playlist nổi bật được hiển thị ở trang chủ hay không';
COMMENT ON COLUMN playlists.display_order IS 'Thứ tự hiển thị playlist';
COMMENT ON COLUMN playlists.created_at IS 'Thời điểm tạo playlist';
COMMENT ON COLUMN playlists.updated_at IS 'Thời điểm cập nhật playlist cuối cùng';

-- =====================================================
-- ALBUMS TABLE - Album ảnh
-- =====================================================
COMMENT ON TABLE albums IS 'Bảng lưu trữ các album để nhóm các ảnh theo chủ đề';

COMMENT ON COLUMN albums.id IS 'ID duy nhất của album, tự động tăng';
COMMENT ON COLUMN albums.name IS 'Tên album (VD: Vietnam Travel, Street Photography)';
COMMENT ON COLUMN albums.slug IS 'URL thân thiện của album (VD: vietnam-travel)';
COMMENT ON COLUMN albums.description IS 'Mô tả chi tiết về album';
COMMENT ON COLUMN albums.cover_photo_id IS 'ID của ảnh làm cover cho album';
COMMENT ON COLUMN albums.is_public IS 'Album có công khai hay không';
COMMENT ON COLUMN albums.is_featured IS 'Album nổi bật được hiển thị ở trang chủ hay không';
COMMENT ON COLUMN albums.display_order IS 'Thứ tự hiển thị album';
COMMENT ON COLUMN albums.created_at IS 'Thời điểm tạo album';
COMMENT ON COLUMN albums.updated_at IS 'Thời điểm cập nhật album cuối cùng';

-- =====================================================
-- ENUM VALUES DOCUMENTATION
-- =====================================================

-- Tạo bảng documentation cho các enum values
CREATE TABLE IF NOT EXISTS enum_documentation (
                                                  id BIGSERIAL PRIMARY KEY,
                                                  table_name VARCHAR(50) NOT NULL,
    column_name VARCHAR(50) NOT NULL,
    enum_value VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    example TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

COMMENT ON TABLE enum_documentation IS 'Bảng tài liệu hóa ý nghĩa các giá trị enum trong hệ thống';

-- Insert enum documentation
INSERT INTO enum_documentation (table_name, column_name, enum_value, description, example) VALUES
-- posts.status
('posts', 'status', 'DRAFT', 'Bài viết đang trong quá trình soạn thảo, chưa xuất bản', 'Bài viết mới tạo, chưa hoàn thiện nội dung'),
('posts', 'status', 'PUBLISHED', 'Bài viết đã được xuất bản và hiển thị công khai', 'Bài viết đã hoàn thành và sẵn sàng cho độc giả'),

-- youtube_videos.status
('youtube_videos', 'status', 'DRAFT', 'Video đang trong quá trình chuẩn bị, chưa hiển thị công khai', 'Video mới thêm, chưa viết mô tả'),
('youtube_videos', 'status', 'PUBLISHED', 'Video đã được xuất bản và hiển thị công khai trên blog', 'Video đã sẵn sàng cho người xem'),
('youtube_videos', 'status', 'PRIVATE', 'Video riêng tư, chỉ admin có thể xem', 'Video cá nhân không muốn chia sẻ'),
('youtube_videos', 'status', 'UNLISTED', 'Video không được liệt kê trong danh sách nhưng có thể truy cập qua link trực tiếp', 'Video chia sẻ với một nhóm người cụ thể'),

-- gallery_photos.status
('gallery_photos', 'status', 'DRAFT', 'Ảnh đang trong quá trình xử lý, chưa hiển thị công khai', 'Ảnh mới upload, chưa chỉnh sửa'),
('gallery_photos', 'status', 'PUBLISHED', 'Ảnh đã được xuất bản và hiển thị trong thư viện', 'Ảnh đã chỉnh sửa xong và sẵn sàng hiển thị'),
('gallery_photos', 'status', 'PRIVATE', 'Ảnh riêng tư, chỉ admin có thể xem', 'Ảnh cá nhân không muốn chia sẻ công khai'),

-- projects.project_type
('projects', 'project_type', 'PERSONAL', 'Dự án cá nhân, tự thực hiện trong thời gian rảnh', 'Blog cá nhân, ứng dụng mobile cho bản thân'),
('projects', 'project_type', 'COMPANY', 'Dự án của công ty, thực hiện trong thời gian làm việc', 'Hệ thống ERP, website công ty'),
('projects', 'project_type', 'FREELANCE', 'Dự án freelance, nhận từ khách hàng bên ngoài', 'Website bán hàng cho khách hàng, ứng dụng đặt hàng'),
('projects', 'project_type', 'OPENSOURCE', 'Dự án mã nguồn mở, đóng góp cho cộng đồng', 'Library JavaScript, plugin WordPress'),

-- projects.status
('projects', 'status', 'COMPLETED', 'Dự án đã hoàn thành và đã bàn giao', 'Website đã launch thành công'),
('projects', 'status', 'ONGOING', 'Dự án đang trong quá trình thực hiện', 'Đang phát triển phase 2 của ứng dụng'),
('projects', 'status', 'PAUSED', 'Dự án tạm dừng do các lý do khách quan', 'Tạm dừng do thay đổi yêu cầu khách hàng'),
('projects', 'status', 'CANCELLED', 'Dự án đã bị hủy bỏ', 'Khách hàng hủy dự án, thay đổi chiến lược'),

-- taggable.taggable_type
('taggable', 'taggable_type', 'POST', 'Tag được gắn cho bài viết blog', 'Tag "Java" cho bài viết về Spring Boot'),
('taggable', 'taggable_type', 'VIDEO', 'Tag được gắn cho video YouTube', 'Tag "Tutorial" cho video hướng dẫn'),
('taggable', 'taggable_type', 'PHOTO', 'Tag được gắn cho ảnh trong thư viện', 'Tag "Travel" cho ảnh du lịch'),
('taggable', 'taggable_type', 'PROJECT', 'Tag được gắn cho dự án', 'Tag "React" cho dự án web app'),
('taggable', 'taggable_type', 'PLAYLIST', 'Tag được gắn cho playlist video', 'Tag "Education" cho playlist học tập'),
('taggable', 'taggable_type', 'ALBUM', 'Tag được gắn cho album ảnh', 'Tag "Nature" cho album ảnh thiên nhiên')

    ON CONFLICT DO NOTHING;

-- =====================================================
-- ADDITIONAL HELPFUL QUERIES DOCUMENTATION
-- =====================================================

CREATE OR REPLACE VIEW enum_reference AS
SELECT
    table_name as "Bảng",
    column_name as "Cột",
    enum_value as "Giá trị",
    description as "Ý nghĩa",
    example as "Ví dụ"
FROM enum_documentation
ORDER BY table_name, column_name, enum_value;

COMMENT ON VIEW enum_reference IS 'View hiển thị tài liệu tham khảo các giá trị enum trong hệ thống';