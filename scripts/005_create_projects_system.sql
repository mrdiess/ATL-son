-- Projects tablosu - proje ana bilgileri
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'Genel',
  location TEXT,
  client_name TEXT,
  building_type TEXT,
  project_duration TEXT,
  start_date DATE,
  end_date DATE,
  featured_image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project Steps tablosu - yapım aşamaları
CREATE TABLE IF NOT EXISTS project_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL DEFAULT 1,
  title TEXT NOT NULL,
  description TEXT,
  technical_details TEXT,
  start_date DATE,
  end_date DATE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project Photos tablosu - fotoğraflar
CREATE TABLE IF NOT EXISTS project_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  step_id UUID REFERENCES project_steps(id) ON DELETE SET NULL,
  photo_url TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS politikaları
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_photos ENABLE ROW LEVEL SECURITY;

-- Public okuma izni
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read project_steps" ON project_steps FOR SELECT USING (true);
CREATE POLICY "Public read project_photos" ON project_photos FOR SELECT USING (true);

-- Service role tam erişim
CREATE POLICY "Service role full access projects" ON projects FOR ALL USING (true);
CREATE POLICY "Service role full access project_steps" ON project_steps FOR ALL USING (true);
CREATE POLICY "Service role full access project_photos" ON project_photos FOR ALL USING (true);

-- Örnek veriler
INSERT INTO projects (title, slug, description, category, location, building_type, project_duration, is_featured, featured_image_url) VALUES
('Sakarya Merdiven Projesi', 'sakarya-merdiven', 'Sakarya ilinde gerçekleştirilen endüstriyel merdiven imalatı ve montajı projesi', 'Merdiven', 'Sakarya', 'Endüstriyel', '2 Ay', true, '/placeholder.svg?height=400&width=600'),
('Düzce Depo Çelik Yapı', 'duzce-depo', 'Düzce Küçük Sanayi Sitesinde 500m² kapalı alan depo çelik konstrüksiyon projesi', 'Depo', 'Düzce', 'Depo', '3 Ay', true, '/placeholder.svg?height=400&width=600'),
('Bolu Fabrika Projesi', 'bolu-fabrika', 'Bolu Organize Sanayide 2000m² fabrika binası çelik yapı projesi', 'Fabrika', 'Bolu', 'Fabrika', '4 Ay', true, '/placeholder.svg?height=400&width=600')
ON CONFLICT (slug) DO NOTHING;
