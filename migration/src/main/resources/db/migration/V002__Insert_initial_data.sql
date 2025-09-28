INSERT INTO site_settings (setting_key, setting_value)
VALUES ('site_title', 'BlackMatte Blog'),
       ('site_description', 'Blog cá nhân - Chia sẻ về công nghệ và cuộc sống'),
       ('site_author', 'BlackMatte'),
       ('site_email', 'contact@blackmatte.dev'),
       ('youtube_channel_url', 'https://youtube.com/@blackmatte'),
       ('github_url', 'https://github.com/blackmatte'),
       ('about_me',
        'Chào mừng bạn đến với blog cá nhân của tôi! Tôi chia sẻ về công nghệ, ' ||
        'dự án và những điều thú vị trong cuộc sống.'),
       ('posts_per_page', '10'),
       ('projects_per_page', '6'),
       ('photos_per_page', '12'),
       ('videos_per_page', '8');

INSERT INTO tags (name, slug)
VALUES ('Java', 'java'),
       ('Spring Boot', 'spring-boot'),
       ('PostgreSQL', 'postgresql'),
       ('React', 'react'),
       ('JavaScript', 'javascript'),
       ('Photography', 'photography'),
       ('Travel', 'travel'),
       ('Tutorial', 'tutorial'),
       ('Personal Project', 'personal-project'),
       ('Web Development', 'web-development'),
       ('Backend', 'backend'),
       ('Frontend', 'frontend'),
       ('Database', 'database'),
       ('API', 'api'),
       ('Docker', 'docker');

INSERT INTO posts (title, slug, content, excerpt, status, published_at, meta_title, meta_description)
VALUES ('Chào mừng đến với BlackMatte Blog!',
        'chao-mung-den-voi-blackmatte-blog',
        '<h2>Xin chào và chào mừng!</h2>
        <p>Đây là bài viết đầu tiên trên blog cá nhân của tôi. Tôi sẽ chia sẻ những kiến thức về:</p>
        <ul>
            <li>Lập trình và công nghệ</li>
            <li>Các dự án cá nhân</li>
            <li>Photography và những chuyến đi</li>
            <li>Những suy nghĩ và trải nghiệm cá nhân</li>
        </ul>
        <p>Hãy theo dõi blog để không bỏ lỡ những nội dung thú vị nhé!</p>',
        'Bài viết đầu tiên giới thiệu về blog và những nội dung sẽ được chia sẻ',
        'PUBLISHED',
        CURRENT_TIMESTAMP,
        'Chào mừng đến với BlackMatte Blog - Blog cá nhân về công nghệ',
        'Bài viết đầu tiên trên BlackMatte Blog, giới thiệu về những nội dung sẽ được chia sẻ: ' ||
        'công nghệ, dự án cá nhân, photography và nhiều hơn nữa.');

INSERT INTO projects (name, slug, description, content, project_type,
                      my_role, technologies, is_featured, status)
VALUES ('BlackMatte Blog',
        'blackmatte-blog',
        'Blog cá nhân được xây dựng bằng Spring Boot và React',
        '<h3>Giới thiệu dự án</h3>
        <p>BlackMatte Blog là dự án blog cá nhân được phát triển để chia sẻ kiến thức và kinh nghiệm.</p>

        <h3>Tính năng chính</h3>
        <ul>
            <li>Quản lý bài viết với Markdown support</li>
            <li>Chia sẻ video YouTube</li>
            <li>Thư viện ảnh cá nhân</li>
            <li>Showcase các dự án đã thực hiện</li>
            <li>SEO-friendly URLs</li>
            <li>Responsive design</li>
        </ul>

        <h3>Kiến trúc hệ thống</h3>
        <p>Backend sử dụng Spring Boot với PostgreSQL, Frontend sử dụng React.
        Database migration được quản lý bằng Flyway.</p>',
        'PERSONAL',
        'Full-stack Developer',
        '["Spring Boot 3", "PostgreSQL", "Flyway", "React", "Tailwind CSS", "Docker"]',
        TRUE,
        'ONGOING');

INSERT INTO taggable (tag_id, taggable_id, taggable_type)
VALUES ((SELECT id FROM tags WHERE slug = 'personal-project'), 1, 'POST');

INSERT INTO taggable (tag_id, taggable_id, taggable_type)
VALUES ((SELECT id FROM tags WHERE slug = 'java'), 1, 'PROJECT'),
       ((SELECT id FROM tags WHERE slug = 'spring-boot'), 1, 'PROJECT'),
       ((SELECT id FROM tags WHERE slug = 'postgresql'), 1, 'PROJECT'),
       ((SELECT id FROM tags WHERE slug = 'react'), 1, 'PROJECT'),
       ((SELECT id FROM tags WHERE slug = 'web-development'), 1, 'PROJECT'),
       ((SELECT id FROM tags WHERE slug = 'personal-project'), 1, 'PROJECT');