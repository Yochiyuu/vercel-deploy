"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function tambahMahasiswa(formData: FormData) {
  const nama = formData.get("nama") as string;
  const nim = formData.get("nim") as string;

  if (!nama || !nim) return;

  try {
    await prisma.mahasiswa.create({
      data: { nama, nim },
    });
    revalidatePath("/mahasiswa");
  } catch (error) {
    console.log("Gagal simpan di Vercel (Expected):", error);
  }
}

export async function hapusMahasiswa(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.mahasiswa.delete({
    where: { id: parseInt(id) },
  });

  revalidatePath("/mahasiswa");
}
