// src/lib/storage.ts
import { supabase } from './supabase';

export function uniqueName(name: string) {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}-${name}`;
}

/**
 * Upload a file to Supabase Storage and return a **public URL**.
 * Make sure your bucket is **public**, or switch to getSignedUrl() if private.
 */
export async function uploadFileToSupabase(
  file: File,
  path: string,
  bucket = 'project-hive',
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true, // set to false if you want to prevent overwrites
      contentType: file.type || 'application/octet-stream',
    });

  if (error) {
    console.error('Supabase upload error:', error);
    throw error;
  }

  // If the bucket is public:
  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return publicUrlData.publicUrl;
}
