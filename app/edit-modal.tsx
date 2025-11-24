"use client";

import { Mahasiswa } from "@prisma/client";
import { useState } from "react";
import { updateMahasiswa } from "./mahasiswa/actions";

export default function EditModal({ mahasiswa }: { mahasiswa: Mahasiswa }) {
  const [isOpen, setIsOpen] = useState(false);

  const wrapperAction = async (formData: FormData) => {
    await updateMahasiswa(formData);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        className="btn-edit"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        Edit
      </button>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="card modal-content">
        <div className="card-header">
          <h2>✏️ Edit Mahasiswa</h2>
        </div>

        <form action={wrapperAction} className="form-content">
          <input type="hidden" name="id" value={mahasiswa.id} />

          <div className="form-group">
            <label>Nama Lengkap</label>
            <input
              type="text"
              name="nama"
              defaultValue={mahasiswa.nama}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>NIM</label>
            <input
              type="text"
              name="nim"
              defaultValue={mahasiswa.nim}
              required
              className="input-field"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setIsOpen(false)}
            >
              Batal
            </button>
            <button type="submit" className="btn-primary">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
