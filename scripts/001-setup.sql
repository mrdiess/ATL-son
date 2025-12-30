-- ======================================
-- SUPABASE SETUP - TABLOLAR VE VERİ
-- ======================================

-- Mevcut tabloları sil (temiz başlangıç için)
DROP TABLE IF EXISTS activity_logs CASCADE;
DROP TABLE IF EXISTS analytics CASCADE;
DROP TABLE IF EXISTS sponsors CASCADE;
DROP TABLE IF EXISTS media CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- Admin kullanıcıları tablosu
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Site ayarları tablosu
DROP TABLE IF EXISTS site_settings CASCADE;

CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Medya tablosu (fotoğraflar)
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  storage_path TEXT,
  type TEXT DEFAULT 'image' CHECK (type IN ('image', 'video', 'document')),
  category TEXT DEFAULT 'gallery',
  size INTEGER,
  alt TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Sponsorlar tablosu
CREATE TABLE sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  website TEXT,
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Analitikler tablosu
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_type TEXT NOT NULL,
  metric_value INTEGER DEFAULT 0,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Activity log tablosu
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES admin_users(id),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ======================================
-- ROW LEVEL SECURITY (RLS)
-- ======================================

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin_users_public_read" ON admin_users FOR SELECT USING (true);
CREATE POLICY "admin_users_insert" ON admin_users FOR INSERT WITH CHECK (true);
CREATE POLICY "admin_users_update" ON admin_users FOR UPDATE WITH CHECK (true);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings_public_read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "settings_admin_write" ON site_settings FOR UPDATE WITH CHECK (true);
CREATE POLICY "settings_admin_insert" ON site_settings FOR INSERT WITH CHECK (true);

ALTER TABLE media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "media_public_read" ON media FOR SELECT USING (true);
CREATE POLICY "media_admin_insert" ON media FOR INSERT WITH CHECK (true);
CREATE POLICY "media_admin_delete" ON media FOR DELETE USING (true);

ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sponsors_public_read" ON sponsors FOR SELECT USING (active = true);
CREATE POLICY "sponsors_admin_all" ON sponsors FOR ALL USING (true);

ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "analytics_public_read" ON analytics FOR SELECT USING (true);
CREATE POLICY "analytics_admin_write" ON analytics FOR ALL USING (true);

ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "activity_logs_admin" ON activity_logs FOR ALL USING (true);

-- ======================================
-- BAŞLANGIÇ VERİLERİ
-- ======================================

-- Admin kullanıcı (şifre: admin123)
INSERT INTO admin_users (username, email, password_hash)
VALUES ('admin', 'admin@example.com', '$2b$10$slYQmyNdGzin0EEg7BGOM.gXjE4rfVOVGP5vLHxPl2jIKK4BukEMm')
ON CONFLICT DO NOTHING;

-- Site ayarları
INSERT INTO site_settings (key, value)
VALUES 
  ('company_name', 'ATL Yazılım'),
  ('company_description', 'Profesyonel yazılım ve web hizmetleri'),
  ('theme', 'light'),
  ('phone', ''),
  ('email', ''),
  ('address', '')
ON CONFLICT DO NOTHING;

-- Örnek sponsor
INSERT INTO sponsors (name, logo_url, website, sort_order, active)
VALUES ('Partner 1', 'https://via.placeholder.com/150', 'https://example.com', 1, true)
ON CONFLICT DO NOTHING;
