import { PrismaClient } from "@prisma/client";
import { hapusMahasiswa, tambahMahasiswa } from "./actions";

const prisma = new PrismaClient();

export default async function MahasiswaPage() {
  const dataMahasiswa = await prisma.mahasiswa.findMany();

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px" }}
    >
      <h1>Daftar Mahasiswa</h1>
      <div
        style={{
          marginBottom: "20px",
          border: "1px solid #333",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        <h3>Tambah Mahasiswa Baru</h3>
        <form
          action={tambahMahasiswa}
          style={{ display: "flex", gap: "10px", flexDirection: "column" }}
        >
          <input
            type="text"
            name="nama"
            placeholder="Nama Mahasiswa"
            style={{ padding: "8px", color: "black" }}
            required
          />
          <input
            type="text"
            name="nim"
            placeholder="NIM"
            style={{ padding: "8px", color: "black" }}
            required
          />
          <button
            type="submit"
            style={{
              padding: "10px",
              background: "white",
              color: "black",
              border: "none",
              cursor: "pointer",
            }}
          >
            Simpan Data
          </button>
        </form>
      </div>

      <hr style={{ margin: "20px 0" }} />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {dataMahasiswa.map((mhs) => (
          <li
            key={mhs.id}
            style={{
              marginBottom: "10px",
              background: "#222",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              <strong>{mhs.nama}</strong> - {mhs.nim}
            </span>

            <form action={hapusMahasiswa}>
              <input type="hidden" name="id" value={mhs.id} />
              <button
                type="submit"
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                X
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
