CREATE TABLE IF NOT EXISTS playlists
(
    id            BIGSERIAL PRIMARY KEY,
    name          VARCHAR(255)        NOT NULL,
    slug          VARCHAR(255) UNIQUE NOT NULL,
    description   TEXT,
    thumbnail_url VARCHAR(500),
    is_public     BOOLEAN   DEFAULT TRUE,
    is_featured   BOOLEAN   DEFAULT FALSE,
    display_order INTEGER   DEFAULT 0,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1
                       FROM information_schema.columns
                       WHERE table_name = 'youtube_videos'
                         AND column_name = 'status') THEN
            ALTER TABLE youtube_videos
                ADD COLUMN status VARCHAR(20) DEFAULT 'DRAFT'
                    CHECK (status IN ('DRAFT', 'PUBLISHED', 'PRIVATE', 'UNLISTED'));
        END IF;

        IF NOT EXISTS (SELECT 1
                       FROM information_schema.columns
                       WHERE table_name = 'youtube_videos'
                         AND column_name = 'is_public') THEN
            ALTER TABLE youtube_videos
                ADD COLUMN is_public BOOLEAN DEFAULT TRUE;
        END IF;

        IF NOT EXISTS (SELECT 1
                       FROM information_schema.columns
                       WHERE table_name = 'youtube_videos'
                         AND column_name = 'playlist_id') THEN
            ALTER TABLE youtube_videos
                ADD COLUMN playlist_id BIGINT REFERENCES playlists (id) ON DELETE SET NULL;
        END IF;

        IF NOT EXISTS (SELECT 1
                       FROM information_schema.columns
                       WHERE table_name = 'youtube_videos'
                         AND column_name = 'playlist_order') THEN
            ALTER TABLE youtube_videos
                ADD COLUMN playlist_order INTEGER DEFAULT 0;
        END IF;

        IF NOT EXISTS (SELECT 1
                       FROM information_schema.columns
                       WHERE table_name = 'youtube_videos'
                         AND column_name = 'duration') THEN
            ALTER TABLE youtube_videos
                ADD COLUMN duration INTEGER; -- Duration in seconds
        END IF;
    END
$$;

DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1
                       FROM information_schema.columns
                       WHERE table_name = 'gallery_photos'
                         AND column_name = 'status') THEN
            ALTER TABLE gallery_photos
                ADD COLUMN status VARCHAR(20) DEFAULT 'DRAFT'
                    CHECK (status IN ('DRAFT', 'PUBLISHED', 'PRIVATE'));
        END IF;

        IF NOT EXISTS (SELECT 1
                       FROM information_schema.columns
                       WHERE table_name = 'gallery_photos'
                         AND column_name = 'is_public') THEN
            ALTER TABLE gallery_photos
                ADD COLUMN is_public BOOLEAN DEFAULT TRUE;
        END IF;

        IF NOT EXISTS (SELECT 1
                       FROM information_schema.columns
                       WHERE table_name = 'gallery_photos'
                         AND column_name = 'album_id') THEN
            ALTER TABLE gallery_photos
                ADD COLUMN album_id BIGINT;
        END IF;

        IF NOT EXISTS (SELECT 1
                       FROM information_schema.columns
                       WHERE table_name = 'gallery_photos'
                         AND column_name = 'album_order') THEN
            ALTER TABLE gallery_photos
                ADD COLUMN album_order INTEGER DEFAULT 0;
        END IF;
    END
$$;

CREATE TABLE IF NOT EXISTS albums
(
    id             BIGSERIAL PRIMARY KEY,
    name           VARCHAR(255)        NOT NULL,
    slug           VARCHAR(255) UNIQUE NOT NULL,
    description    TEXT,
    cover_photo_id BIGINT,
    is_public      BOOLEAN   DEFAULT TRUE,
    is_featured    BOOLEAN   DEFAULT FALSE,
    display_order  INTEGER   DEFAULT 0,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1
                       FROM information_schema.table_constraints
                       WHERE constraint_name = 'gallery_photos_album_id_fkey'
                         AND table_name = 'gallery_photos') THEN
            ALTER TABLE gallery_photos
                ADD CONSTRAINT gallery_photos_album_id_fkey
                    FOREIGN KEY (album_id) REFERENCES albums (id) ON DELETE SET NULL;
        END IF;
    END
$$;

DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1
                       FROM information_schema.table_constraints
                       WHERE constraint_name = 'albums_cover_photo_id_fkey'
                         AND table_name = 'albums') THEN
            ALTER TABLE albums
                ADD CONSTRAINT albums_cover_photo_id_fkey
                    FOREIGN KEY (cover_photo_id) REFERENCES gallery_photos (id) ON DELETE SET NULL;
        END IF;
    END
$$;

CREATE INDEX IF NOT EXISTS idx_youtube_videos_status ON youtube_videos (status);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_is_public ON youtube_videos (is_public);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_playlist_id ON youtube_videos (playlist_id);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_playlist_order ON youtube_videos (playlist_id, playlist_order);

CREATE INDEX IF NOT EXISTS idx_gallery_photos_status ON gallery_photos (status);
CREATE INDEX IF NOT EXISTS idx_gallery_photos_is_public ON gallery_photos (is_public);
CREATE INDEX IF NOT EXISTS idx_gallery_photos_album_id ON gallery_photos (album_id);
CREATE INDEX IF NOT EXISTS idx_gallery_photos_album_order ON gallery_photos (album_id, album_order);

CREATE INDEX IF NOT EXISTS idx_playlists_is_public ON playlists (is_public);
CREATE INDEX IF NOT EXISTS idx_playlists_is_featured ON playlists (is_featured);
CREATE INDEX IF NOT EXISTS idx_playlists_slug ON playlists (slug);

CREATE INDEX IF NOT EXISTS idx_albums_is_public ON albums (is_public);
CREATE INDEX IF NOT EXISTS idx_albums_is_featured ON albums (is_featured);
CREATE INDEX IF NOT EXISTS idx_albums_slug ON albums (slug);

DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1
                       FROM information_schema.triggers
                       WHERE trigger_name = 'update_playlists_updated_at') THEN
            CREATE TRIGGER update_playlists_updated_at
                BEFORE UPDATE
                ON playlists
                FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
        END IF;

        IF NOT EXISTS (SELECT 1
                       FROM information_schema.triggers
                       WHERE trigger_name = 'update_albums_updated_at') THEN
            CREATE TRIGGER update_albums_updated_at
                BEFORE UPDATE
                ON albums
                FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
        END IF;
    END
$$;