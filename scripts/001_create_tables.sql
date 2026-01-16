-- Media table for storing uploaded images and files
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  category TEXT DEFAULT 'Tümü',
  size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sliders table for hero slider management
CREATE TABLE IF NOT EXISTS sliders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  button_text TEXT DEFAULT 'Keşfet',
  button_link TEXT DEFAULT '#hizmetler',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Videos table for YouTube videos
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  youtube_url TEXT NOT NULL,
  youtube_id TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT DEFAULT 'Tümü',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sponsors/Partners table
CREATE TABLE IF NOT EXISTS sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site settings table
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity logs
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  details TEXT,
  user_name TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables (public read for most, admin write)
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE sliders ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Public read policies for frontend
CREATE POLICY "Public read media" ON media FOR SELECT USING (true);
CREATE POLICY "Public read sliders" ON sliders FOR SELECT USING (is_active = true);
CREATE POLICY "Public read videos" ON videos FOR SELECT USING (is_active = true);
CREATE POLICY "Public read sponsors" ON sponsors FOR SELECT USING (is_active = true);
CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);

-- Service role can do everything (for admin panel)
CREATE POLICY "Service role full access media" ON media FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access sliders" ON sliders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access videos" ON videos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access sponsors" ON sponsors FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access settings" ON settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access contact" ON contact_submissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access logs" ON activity_logs FOR ALL USING (true) WITH CHECK (true);

-- Insert default settings
INSERT INTO settings (key, value) VALUES
  ('company_name', 'ATL Çelik Yapı'),
  ('slogan', 'Güvenilir Çelik Çözümleri'),
  ('phone', '+90 537 339 39 47'),
  ('email', 'info@atlcelikyapi.com'),
  ('address', 'Küçük Sanayi Sitesi Merkez, Düzce, Türkiye')
ON CONFLICT (key) DO NOTHING;
