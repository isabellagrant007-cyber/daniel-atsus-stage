
-- Restrict bucket listing: drop broad SELECT, allow viewing individual objects only via URL is still public for public bucket.
DROP POLICY IF EXISTS "Public can view media files" ON storage.objects;

CREATE POLICY "Anyone can read media files" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');

-- Revoke has_role from anon
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, app_role) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, app_role) TO authenticated;
