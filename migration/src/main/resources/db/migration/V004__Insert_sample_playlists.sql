INSERT INTO playlists (name, slug, description, is_public, is_featured, display_order) VALUES
                                                                                           ('Java Programming Tutorials', 'java-programming-tutorials', 'Complete Java programming course from basics to advanced', true, true, 1),
                                                                                           ('Spring Boot Series', 'spring-boot-series', 'Learn Spring Boot framework step by step', true, true, 2),
                                                                                           ('Photography Tips', 'photography-tips', 'Tips and tricks for better photography', true, false, 3),
                                                                                           ('Travel Vlogs', 'travel-vlogs', 'My travel experiences around the world', true, false, 4),
                                                                                           ('Tech Reviews', 'tech-reviews', 'Reviews of latest technology and gadgets', true, false, 5)
    ON CONFLICT (slug) DO NOTHING;

INSERT INTO albums (name, slug, description, is_public, is_featured, display_order) VALUES
                                                                                        ('Vietnam Travel', 'vietnam-travel', 'Beautiful places in Vietnam', true, true, 1),
                                                                                        ('Street Photography', 'street-photography', 'Street photography collection', true, true, 2),
                                                                                        ('Nature & Landscape', 'nature-landscape', 'Nature and landscape photography', true, false, 3),
                                                                                        ('City Life', 'city-life', 'Urban photography and city scenes', true, false, 4),
                                                                                        ('Portrait Sessions', 'portrait-sessions', 'Portrait photography collection', false, false, 5)
    ON CONFLICT (slug) DO NOTHING;

INSERT INTO tags (name, slug) VALUES
                                  ('Playlist', 'playlist'),
                                  ('Video Series', 'video-series'),
                                  ('Tutorial', 'tutorial'),
                                  ('Photo Album', 'photo-album'),
                                  ('Collection', 'collection')
    ON CONFLICT (slug) DO NOTHING;

DO $$
DECLARE
java_playlist_id BIGINT;
    spring_playlist_id BIGINT;
BEGIN
SELECT id INTO java_playlist_id FROM playlists WHERE slug = 'java-programming-tutorials';
SELECT id INTO spring_playlist_id FROM playlists WHERE slug = 'spring-boot-series';

UPDATE youtube_videos
SET playlist_id = java_playlist_id,
    playlist_order = 1,
    status = 'PUBLISHED',
    is_public = true
WHERE LOWER(title) LIKE '%java%' AND playlist_id IS NULL;

UPDATE youtube_videos
SET playlist_id = spring_playlist_id,
    playlist_order = 1,
    status = 'PUBLISHED',
    is_public = true
WHERE LOWER(title) LIKE '%spring%' AND playlist_id IS NULL;
END $$;

DO $$
DECLARE
vietnam_album_id BIGINT;
    street_album_id BIGINT;
BEGIN
SELECT id INTO vietnam_album_id FROM albums WHERE slug = 'vietnam-travel';
SELECT id INTO street_album_id FROM albums WHERE slug = 'street-photography';

UPDATE gallery_photos
SET album_id = vietnam_album_id,
    album_order = 1,
    status = 'PUBLISHED',
    is_public = true
WHERE LOWER(title) LIKE '%vietnam%' AND album_id IS NULL;

UPDATE gallery_photos
SET album_id = vietnam_album_id,
    album_order = 2,
    status = 'PUBLISHED',
    is_public = true
WHERE (LOWER(location) LIKE '%hanoi%'
    OR LOWER(location) LIKE '%ho chi minh%'
    OR LOWER(location) LIKE '%da nang%')
  AND album_id IS NULL;
END $$;

DO $$
DECLARE
playlist_tag_id BIGINT;
    album_tag_id BIGINT;
    tutorial_tag_id BIGINT;
BEGIN
SELECT id INTO playlist_tag_id FROM tags WHERE slug = 'playlist';
SELECT id INTO album_tag_id FROM tags WHERE slug = 'photo-album';
SELECT id INTO tutorial_tag_id FROM tags WHERE slug = 'tutorial';

INSERT INTO taggable (tag_id, taggable_id, taggable_type)
SELECT playlist_tag_id, id, 'PLAYLIST'
FROM playlists
    ON CONFLICT DO NOTHING;

INSERT INTO taggable (tag_id, taggable_id, taggable_type)
SELECT tutorial_tag_id, id, 'PLAYLIST'
FROM playlists
WHERE slug IN ('java-programming-tutorials', 'spring-boot-series', 'photography-tips')
    ON CONFLICT DO NOTHING;

INSERT INTO taggable (tag_id, taggable_id, taggable_type)
SELECT album_tag_id, id, 'ALBUM'
FROM albums
    ON CONFLICT DO NOTHING;
END $$;

DO $$
BEGIN
BEGIN
ALTER TABLE taggable DROP CONSTRAINT IF EXISTS taggable_taggable_type_check;
ALTER TABLE taggable ADD CONSTRAINT taggable_taggable_type_check
    CHECK (taggable_type IN ('POST', 'VIDEO', 'PHOTO', 'PROJECT', 'PLAYLIST', 'ALBUM'));
EXCEPTION WHEN OTHERS THEN
        NULL;
END;
END $$;