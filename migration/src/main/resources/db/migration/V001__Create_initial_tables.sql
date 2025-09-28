CREATE TABLE IF NOT EXISTS posts (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image_url VARCHAR(500),
    status VARCHAR(20) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED')),
    published_at TIMESTAMP,
    view_count INTEGER DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS youtube_videos (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    youtube_id VARCHAR(50) NOT NULL,
    youtube_url VARCHAR(500) NOT NULL,
    description TEXT,
    thumbnail_url VARCHAR(500),
    published_at TIMESTAMP,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS gallery_photos (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    image_url VARCHAR(500) NOT NULL,
    image_path VARCHAR(500) NOT NULL,
    file_size BIGINT,
    width INTEGER,
    height INTEGER,
    taken_at TIMESTAMP,
    location VARCHAR(255),
    camera_info VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS projects (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    content TEXT,
    project_type VARCHAR(20) NOT NULL CHECK (project_type IN ('PERSONAL', 'COMPANY', 'FREELANCE', 'OPENSOURCE')),
    company_name VARCHAR(255),
    team_size INTEGER,
    my_role VARCHAR(255) NOT NULL,
    technologies TEXT NOT NULL,
    project_url VARCHAR(500),
    github_url VARCHAR(500),
    thumbnail_url VARCHAR(500),
    start_date DATE,
    end_date DATE,
    is_featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'COMPLETED' CHECK (status IN ('COMPLETED', 'ONGOING', 'PAUSED', 'CANCELLED')),
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS project_images (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    image_path VARCHAR(500) NOT NULL,
    caption VARCHAR(255),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS tags (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS taggable (
    tag_id BIGINT NOT NULL,
    taggable_id BIGINT NOT NULL,
    taggable_type VARCHAR(20) NOT NULL CHECK (taggable_type IN ('POST', 'VIDEO', 'PHOTO', 'PROJECT')),
    PRIMARY KEY (tag_id, taggable_id, taggable_type)
    );

CREATE TABLE IF NOT EXISTS site_settings (
    id BIGSERIAL PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'project_images_project_id_fkey'
        AND table_name = 'project_images'
    ) THEN
ALTER TABLE project_images
    ADD CONSTRAINT project_images_project_id_fkey
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;
END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'taggable_tag_id_fkey'
        AND table_name = 'taggable'
    ) THEN
ALTER TABLE taggable
    ADD CONSTRAINT taggable_tag_id_fkey
        FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE;
END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_project_type ON projects(project_type);

CREATE INDEX IF NOT EXISTS idx_gallery_photos_is_featured ON gallery_photos(is_featured);

CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);

CREATE INDEX IF NOT EXISTS idx_taggable_type_id ON taggable(taggable_type, taggable_id);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.triggers
        WHERE trigger_name = 'update_posts_updated_at'
    ) THEN
CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.triggers
        WHERE trigger_name = 'update_youtube_videos_updated_at'
    ) THEN
CREATE TRIGGER update_youtube_videos_updated_at
    BEFORE UPDATE ON youtube_videos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.triggers
        WHERE trigger_name = 'update_gallery_photos_updated_at'
    ) THEN
CREATE TRIGGER update_gallery_photos_updated_at
    BEFORE UPDATE ON gallery_photos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.triggers
        WHERE trigger_name = 'update_projects_updated_at'
    ) THEN
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.triggers
        WHERE trigger_name = 'update_site_settings_updated_at'
    ) THEN
CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
END IF;
END $$;