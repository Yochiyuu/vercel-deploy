'use server'

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function tambahMahasiswa(formData: FormData) {
  const nama = formData.get("nama") as string;
  const nim = formData.get("nim") as string;

  if (!nama || !nim) return;

  await prisma.mahasiswa.create({
    data: {
      nama: nama,
      nim: nim,
    },
  });

  revalidatePath("/mahasiswa");
}

export async function hapusMahasiswa(formData: FormData) {
    const id = formData.get("id") as string;

    await prisma.mahasiswa.delete({
        where: { id: parseInt(id) }
    });

    revalidatePath("/mahasiswa");
}