-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  slug TEXT UNIQUE NOT NULL,
  category TEXT,
  location TEXT,
  client_name TEXT,
  start_date DATE,
  end_date DATE,
  featured_image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_steps table for timeline/phases
CREATE TABLE IF NOT EXISTS public.project_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_photos table
CREATE TABLE IF NOT EXISTS public.project_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_step_id UUID NOT NULL REFERENCES public.project_steps(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_photos ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Service role full access projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read project_steps" ON public.project_steps FOR SELECT USING (true);
CREATE POLICY "Service role full access project_steps" ON public.project_steps FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read project_photos" ON public.project_photos FOR SELECT USING (true);
CREATE POLICY "Service role full access project_photos" ON public.project_photos FOR ALL USING (true) WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_projects_slug ON public.projects(slug);
CREATE INDEX idx_projects_active ON public.projects(is_active);
CREATE INDEX idx_project_steps_project_id ON public.project_steps(project_id);
CREATE INDEX idx_project_photos_step_id ON public.project_photos(project_step_id);
