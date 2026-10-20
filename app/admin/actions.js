"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

export async function login(prevState, formData) {
  const form = formData instanceof FormData ? formData : prevState;
  const email = form?.get("email");
  const password = form?.get("password");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  let errorMessage = null;

  try {
    const supabase = await createAdminClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: String(email).trim(),
      password: String(password),
    });

    if (error) {
      if (
        error.message.includes("Invalid login credentials") ||
        error.message.includes("invalid_credentials")
      ) {
        errorMessage = "Email atau password salah.";
      } else {
        errorMessage = error.message;
      }
    }
  } catch (err) {
    errorMessage = err.message || "Gagal menghubungi server autentikasi.";
  }

  if (errorMessage) {
    return { error: errorMessage };
  }

  redirect("/admin");
}

export async function logout() {
  try {
    const supabase = await createAdminClient();
    await supabase.auth.signOut();
  } catch {
    // Abaikan jika sudah tidak ada sesi aktif
  }

  redirect("/admin/login");
}

export async function keluar() {
  return logout();
}

export async function gantiPassword(prevState, formData) {
  const form = formData instanceof FormData ? formData : prevState;
  const passwordBaru = form?.get("password_baru");
  const konfirmasiPassword = form?.get("konfirmasi_password");

  if (!passwordBaru || !konfirmasiPassword) {
    return { error: "Password baru dan konfirmasi password wajib diisi." };
  }

  if (passwordBaru.length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }

  if (passwordBaru !== konfirmasiPassword) {
    return { error: "Konfirmasi password tidak cocok dengan password baru." };
  }

  try {
    const supabase = await createAdminClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: "Anda harus login terlebih dahulu untuk mengganti password." };
    }

    const { error } = await supabase.auth.updateUser({
      password: String(passwordBaru),
    });

    if (error) {
      return { error: error.message || "Gagal mengganti password." };
    }

    return { success: "Password berhasil diperbarui." };
  } catch (err) {
    return { error: err.message || "Terjadi kesalahan saat mengganti password." };
  }
}

export async function tambahProduk(prevState, formData) {
  const form = formData instanceof FormData ? formData : prevState;
  const nama = form?.get("nama")?.toString().trim();
  const hargaRaw = form?.get("harga");
  const harga = parseInt(hargaRaw, 10);
  const kategori = form?.get("kategori")?.toString().trim() || null;
  const foto_url = form?.get("foto_url")?.toString().trim() || null;
  const deskripsi = form?.get("deskripsi")?.toString().trim() || null;

  if (!nama || isNaN(harga)) {
    return { error: "Nama dan harga produk wajib diisi dengan benar." };
  }

  try {
    const supabase = await createAdminClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: "Akses ditolak: Anda harus login terlebih dahulu." };
    }

    const { error } = await supabase.from("produk").insert({
      nama,
      harga,
      kategori,
      foto_url,
      deskripsi,
    });

    if (error) {
      return { error: error.message || "Gagal menambah produk." };
    }
  } catch (err) {
    return { error: err.message || "Terjadi kesalahan pada server." };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

export async function ubahProduk(prevState, formData) {
  const form = formData instanceof FormData ? formData : prevState;
  const id = form?.get("id");
  const nama = form?.get("nama")?.toString().trim();
  const hargaRaw = form?.get("harga");
  const harga = parseInt(hargaRaw, 10);
  const kategori = form?.get("kategori")?.toString().trim() || null;
  const foto_url = form?.get("foto_url")?.toString().trim() || null;
  const deskripsi = form?.get("deskripsi")?.toString().trim() || null;

  if (!id || !nama || isNaN(harga)) {
    return { error: "ID, nama, dan harga produk wajib diisi dengan benar." };
  }

  try {
    const supabase = await createAdminClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: "Akses ditolak: Anda harus login terlebih dahulu." };
    }

    const { error } = await supabase
      .from("produk")
      .update({
        nama,
        harga,
        kategori,
        foto_url,
        deskripsi,
      })
      .eq("id", id);

    if (error) {
      return { error: error.message || "Gagal mengubah produk." };
    }
  } catch (err) {
    return { error: err.message || "Terjadi kesalahan pada server." };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath(`/produk/${id}`);
  redirect("/admin");
}

export async function hapusProduk(formData) {
  const id = formData.get("id");
  if (!id) return;

  const supabase = await createAdminClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Akses ditolak: Anda harus login terlebih dahulu.");
  }

  const { error } = await supabase.from("produk").delete().eq("id", id);
  if (error) {
    throw new Error(error.message || "Gagal menghapus produk.");
  }

  revalidatePath("/admin");
  revalidatePath("/");
}

