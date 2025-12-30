-- Create media table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  storage_path TEXT,
  type TEXT DEFAULT 'image',
  category TEXT DEFAULT 'gallery',
  size INTEGER,
  alt TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create sponsors table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  website TEXT,
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for media
DROP POLICY IF EXISTS "media_public_read" ON media;
DROP POLICY IF EXISTS "media_admin_insert" ON media;
DROP POLICY IF EXISTS "media_admin_delete" ON media;

CREATE POLICY "media_public_read" ON media FOR SELECT USING (true);
CREATE POLICY "media_admin_insert" ON media FOR INSERT WITH CHECK (true);
CREATE POLICY "media_admin_update" ON media FOR UPDATE USING (true);
CREATE POLICY "media_admin_delete" ON media FOR DELETE USING (true);

-- Create RLS Policies for sponsors
DROP POLICY IF EXISTS "sponsors_public_read" ON sponsors;
DROP POLICY IF EXISTS "sponsors_admin_all" ON sponsors;

CREATE POLICY "sponsors_public_read" ON sponsors FOR SELECT USING (true);
CREATE POLICY "sponsors_admin_insert" ON sponsors FOR INSERT WITH CHECK (true);
CREATE POLICY "sponsors_admin_update" ON sponsors FOR UPDATE USING (true);
CREATE POLICY "sponsors_admin_delete" ON sponsors FOR DELETE USING (true);

-- Insert example sponsor data
INSERT INTO sponsors (name, logo_url, website, sort_order, active)
VALUES 
  ('Partner 1', 'https://via.placeholder.com/150?text=Partner+1', 'https://example.com', 1, true),
  ('Partner 2', 'https://via.placeholder.com/150?text=Partner+2', 'https://example.com', 2, true)
ON CONFLICT DO NOTHING;
