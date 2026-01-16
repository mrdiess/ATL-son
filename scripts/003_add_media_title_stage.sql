-- Add title and stage columns to media table for project categorization
ALTER TABLE media
ADD COLUMN IF NOT EXISTS title TEXT,
ADD COLUMN IF NOT EXISTS stage TEXT,
ADD COLUMN IF NOT EXISTS project_slug TEXT;

-- Create index for faster project queries
CREATE INDEX IF NOT EXISTS idx_media_project_slug ON media(project_slug);
CREATE INDEX IF NOT EXISTS idx_media_stage ON media(stage);

-- Add comment
COMMENT ON COLUMN media.title IS 'Fotoğraf başlığı (ör: Fabrika İnşaatı)';
COMMENT ON COLUMN media.stage IS 'Yapım aşaması (ör: Öncesi, Aşama 1, Aşama 2, Son Hali)';
COMMENT ON COLUMN media.project_slug IS 'Proje slug (ör: fabrika-insaati)';
