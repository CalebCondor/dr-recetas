"use server";

import { cookies } from "next/headers";

export async function checkPassword(password: string) {
  if (password === "Clave@2026") {
    const cookieStore = await cookies();
    cookieStore.set("site_access", "granted", {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return { success: true };
  }
  return { success: false, error: "Contraseña incorrecta" };
}
