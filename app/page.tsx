import { PrismaClient } from "@prisma/client";
import EditModal from "./edit-modal";
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
      <header className="header">
        <h1>Sistem Akademik Mahasiswa</h1>
        <p>Aplikasi CRUD Data Mahasiswa (Running on Next.js & Prisma)</p>
      </header>

      <main className="main-grid">
        <section className="card input-section">
          <div className="card-header">
            <h2>📝 Tambah Data Baru</h2>
          </div>
          <form action={tambahMahasiswa} className="form-content">
            <div className="form-group">
              <label htmlFor="nama">Nama Lengkap</label>
              <input
                type="text"
                name="nama"
                id="nama"
                placeholder="Contoh: Budi Santoso"
                required
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="nim">Nomor Induk (NIM)</label>
              <input
                type="text"
                name="nim"
                id="nim"
                placeholder="Contoh: 12345678"
                required
                className="input-field"
              />
            </div>
            <button type="submit" className="btn-primary">
              + Simpan Data
            </button>
          </form>
        </section>

        <section className="card list-section">
          <div className="card-header">
            <h2>🎓 Daftar Mahasiswa ({dataMahasiswa.length})</h2>
          </div>

          {dataMahasiswa.length === 0 ? (
            <p className="empty-state">Belum ada data mahasiswa.</p>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Mahasiswa</th>
                    <th>NIM</th>
                    <th className="text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {dataMahasiswa.map((mhs, index) => (
                    <tr key={mhs.id}>
                      <td>{index + 1}</td>
                      <td className="fw-bold">{mhs.nama}</td>
                      <td>
                        <span className="badge">{mhs.nim}</span>
                      </td>
                      <td className="text-right action-group">
                        <EditModal mahasiswa={mhs} />
                        <form action={hapusMahasiswa} className="delete-form">
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
