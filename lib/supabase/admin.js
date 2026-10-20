import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Koneksi Supabase di server untuk sesi admin menggunakan SUPABASE_PUBLISHABLE_KEY dan cookie.
// Dipakai untuk login, logout, ganti password, dan aksi perubahan data.
export async function createAdminClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_PUBLISHABLE_KEY belum diatur di environment variable."
    );
  }

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Dipanggil dari Server Component di mana cookie tidak dapat dimutasi langsung.
        }
      },
    },
  });
}

export { createAdminClient as createSessionClient };
export default createAdminClient;

