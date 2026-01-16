-- Create storage bucket for media files
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to media bucket
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'media');

-- Allow authenticated users to upload to media bucket
CREATE POLICY "Allow uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'media');

-- Allow authenticated users to delete from media bucket
CREATE POLICY "Allow deletes" ON storage.objects
FOR DELETE USING (bucket_id = 'media');

-- Allow authenticated users to update media bucket
CREATE POLICY "Allow updates" ON storage.objects
FOR UPDATE USING (bucket_id = 'media');
