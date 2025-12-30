-- ======================================
-- SUPABASE SETUP - TAM KURULUM
-- ======================================

-- Eski tabloları sil
DROP TABLE IF EXISTS activity_logs CASCADE;
DROP TABLE IF EXISTS analytics CASCADE;
DROP TABLE IF EXISTS sponsors CASCADE;
DROP TABLE IF EXISTS media CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- Admin Kullanıcıları Tablosu
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin',
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Site Ayarları Tablosu
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Medya Tablosu
CREATE TABLE media (
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

-- Sponsorlar Tablosu
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

-- Analitikler Tablosu
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_type TEXT NOT NULL,
  metric_value INTEGER DEFAULT 0,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Aktivite Logları Tablosu
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES admin_users(id),
  user_name TEXT,
  user_role TEXT,
  action TEXT NOT NULL,
  action_type TEXT,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ======================================
-- ROW LEVEL SECURITY (RLS)
-- ======================================

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Admin Users Policies
CREATE POLICY "admin_users_select" ON admin_users FOR SELECT USING (true);
CREATE POLICY "admin_users_insert" ON admin_users FOR INSERT WITH CHECK (true);
CREATE POLICY "admin_users_update" ON admin_users FOR UPDATE WITH CHECK (true);

-- Site Settings Policies
CREATE POLICY "settings_select" ON site_settings FOR SELECT USING (true);
CREATE POLICY "settings_update" ON site_settings FOR UPDATE WITH CHECK (true);
CREATE POLICY "settings_insert" ON site_settings FOR INSERT WITH CHECK (true);

-- Media Policies
CREATE POLICY "media_select" ON media FOR SELECT USING (true);
CREATE POLICY "media_insert" ON media FOR INSERT WITH CHECK (true);
CREATE POLICY "media_delete" ON media FOR DELETE USING (true);

-- Sponsors Policies
CREATE POLICY "sponsors_select" ON sponsors FOR SELECT USING (true);
CREATE POLICY "sponsors_all" ON sponsors FOR ALL USING (true);

-- Analytics Policies
CREATE POLICY "analytics_select" ON analytics FOR SELECT USING (true);
CREATE POLICY "analytics_all" ON analytics FOR ALL USING (true);

-- Activity Logs Policies
CREATE POLICY "activity_logs_all" ON activity_logs FOR ALL USING (true);

-- ======================================
-- BAŞLANGIÇ VERİLERİ
-- ======================================

-- Admin Kullanıcı (şifre: admin123)
INSERT INTO admin_users (username, email, password_hash, name, role)
VALUES ('admin', 'admin@example.com', 'admin123', 'Admin', 'admin')
ON CONFLICT DO NOTHING;

-- Örnek Sponsor
INSERT INTO sponsors (name, logo_url, website, sort_order, active)
VALUES ('Örnek Partner', 'https://via.placeholder.com/150', 'https://example.com', 1, true)
ON CONFLICT DO NOTHING;

-- Site Ayarları
INSERT INTO site_settings (key, value)
VALUES 
  ('company_name', 'ATL Çelik Yapı'),
  ('company_description', 'Profesyonel yapı yönetim hizmetleri'),
  ('theme', 'light')
ON CONFLICT DO NOTHING;
