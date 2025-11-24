import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function MahasiswaPage() {
  const dataMahasiswa = await prisma.mahasiswa.findMany();

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Daftar Mahasiswa</h1>
      <p>Data ini diambil dari SQLite (Read Only di Vercel)</p>

      <ul>
        {dataMahasiswa.map((mhs) => (
          <li key={mhs.id} style={{ marginBottom: "10px" }}>
            <strong>{mhs.nama}</strong> - {mhs.nim}
          </li>
        ))}
      </ul>

      {dataMahasiswa.length === 0 && (
        <p>Belum ada data. Silakan isi lewat Prisma Studio di local!</p>
      )}
    </div>
  );
}
