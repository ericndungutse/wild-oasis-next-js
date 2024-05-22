import { createClient } from '@supabase/supabase-js';

export const supabaseUrl =
  'https://icrkpoqouzjshpkthrio.supabase.co';

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
