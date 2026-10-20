import { createClient } from "@supabase/supabase-js";

// Koneksi Supabase di server untuk pengunjung menggunakan SUPABASE_SECRET_KEY.
// Melewati RLS untuk membaca data publik (katalog & detail produk) tanpa mengekspos kunci ke browser.
export function createServerClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_SECRET_KEY belum diatur di environment variable."
    );
  }

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export default createServerClient;

