import React from "react";

/**
 * Memformat deadline ke tampilan lokal Indonesia, contoh: "03 Jul 2026, 23.59".
 *
 * @param {string} deadline Tanggal dan jam deadline dari API.
 * @returns {string}
 */
function formatTanggal(tanggal) {
  const d = new Date(tanggal);
  return d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

/**
 * Card satu tugas pada halaman Daftar Tugas.
 *
 * @param {object} props
 * @param {object} props.task Data tugas dari API (termasuk `mata_kuliah`).
 * @param {(task: object) => void} props.onToggleStatus Dipanggil saat tombol status ditekan.
 * @param {(id: number) => void} props.onDelete Dipanggil saat tombol hapus ditekan.
 *
 * CATATAN UNTUK PESERTA STUDI KASUS:
 * Komponen inilah yang merender setiap card tugas pada halaman Daftar Tugas.
 * Penanda visual "Mendekati Deadline" untuk fitur baru kemungkinan besar
 * akan ditambahkan di sekitar sini (atau dengan menambah prop baru ke
 * komponen ini), tergantung rancangan Anda.
 */
export default function TaskCard({ task, onToggleStatus, onDelete }) {
  
  const statusLabel = {
    belum: "Belum",
    "mendekati deadline": "Mendekati Deadline",
    overdue: "Overdue",
    "dikumpulkan terlambat": "Dikumpulkan Terlambat",
    selesai: "Selesai",
  };

  const status = task.status ?? "belum";
  const dikumpulkan = status === "selesai" || status === "dikumpulkan terlambat";
  const statusClass = status.replace(/\s+/g, "-");

  return (
    <div className={`card task-card ${statusClass}`}>
      <div>
        <strong>{task.judul}</strong>
        <div className="meta">{task.mata_kuliah}</div>
        <div className="meta">Deadline: {formatTanggal(task.deadline)}</div>
        {task.submitted_at && (<div className="meta">Dikumpulkan: {formatTanggal(task.submitted_at)}</div>)}
        {task.deskripsi && <div className="meta">{task.deskripsi}</div>}
      </div>
      <div style={{ textAlign: "right" }}>
        <span className={`badge ${statusClass}`}>
          {statusLabel[status] ?? status}
        </span>
        <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
          <button className="btn" onClick={() => onToggleStatus(task)}>
            {dikumpulkan ? "Tandai Belum" : "Tandai Selesai"}
          </button>
          <button className="btn" onClick={() => onDelete(task.id)}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
