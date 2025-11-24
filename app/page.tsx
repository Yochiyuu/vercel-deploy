import { PrismaClient } from "@prisma/client";
import { hapusMahasiswa, tambahMahasiswa } from "./mahasiswa/actions";

const prisma = new PrismaClient();

export default async function Home() {
  const dataMahasiswa = await prisma.mahasiswa.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <div className="container">
      <main className="main-content">
        <header className="header">
          <h1>Sistem Data Mahasiswa</h1>
        </header>

        <section className="card form-card">
          <h2>📝 Tambah Data Baru</h2>
          <form action={tambahMahasiswa} className="form">
            <div className="input-group">
              <label htmlFor="nama">Nama Lengkap</label>
              <input
                type="text"
                name="nama"
                id="nama"
                placeholder="Contoh: Budi Santoso"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="nim">Nomor Induk (NIM)</label>
              <input
                type="text"
                name="nim"
                id="nim"
                placeholder="Contoh: 12345678"
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              + Simpan Data
            </button>
          </form>
        </section>

        <section className="card list-card">
          <h2>🎓 Daftar Mahasiswa ({dataMahasiswa.length})</h2>

          {dataMahasiswa.length === 0 ? (
            <p className="empty-state">Belum ada data mahasiswa.</p>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>NIM</th>
                    <th style={{ textAlign: "right" }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {dataMahasiswa.map((mhs) => (
                    <tr key={mhs.id}>
                      <td>{mhs.nama}</td>
                      <td>
                        <span className="badge">{mhs.nim}</span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <form action={hapusMahasiswa}>
                          <input type="hidden" name="id" value={mhs.id} />
                          <button type="submit" className="btn-delete">
                            Hapus
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Week 15 Project</p>
      </footer>
    </div>
  );
}
