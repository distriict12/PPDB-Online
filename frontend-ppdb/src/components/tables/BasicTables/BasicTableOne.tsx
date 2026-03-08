// src/components/tables/BasicTables/BasicTableOne.tsx

import { useState, Fragment } from "react";
// Path-path ini sudah BENAR
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table"; 
import Badge from "../../ui/badge/Badge";
import { CloseIcon } from "../../../icons"; 

// ... (Interface Pendaftar dan dataPendaftar biarkan sama) ...
interface Pendaftar {
  id: number;
  nama: string;
  foto: string;
  jalurPilihan: string;
  asalSekolah: string;
  status: "Terverifikasi" | "Menunggu" | "Ditolak";
  nisn: string;
  namaAyah: string;
  namaIbu: string;
  pekerjaanAyah: string;
  fileKK: string;
  fileAkta: string;
  fileIjazah: string;
}
// Data dummy (Versi Sekolah Swasta)
const dataPendaftar: Pendaftar[] = [
  {
    id: 1,
    nama: "Mohamad Ali",
    foto: "/images/user/user-17.jpg",
    jalurPilihan: "Mandiri", // <-- Ganti Zonasi jadi Mandiri
    asalSekolah: "SMPN 1 Tegal",
    status: "Terverifikasi",
    nisn: "1234567890",
    namaAyah: "Ayah Ali",
    namaIbu: "Ibu Ali",
    pekerjaanAyah: "Wiraswasta",
    fileKK: "/#", fileAkta: "/#", fileIjazah: "/#"
  },
  {
    id: 2,
    nama: "Budi Santoso",
    foto: "/images/user/user-18.jpg",
    jalurPilihan: "Prestasi", // <-- Prestasi tetap ada
    asalSekolah: "SMPN 2 Brebes",
    status: "Menunggu",
    nisn: "0987654321",
    namaAyah: "Ayah Budi",
    namaIbu: "Ibu Budi",
    pekerjaanAyah: "PNS",
    fileKK: "/#", fileAkta: "/#", fileIjazah: "/#"
  },
  {
    id: 3,
    nama: "Citra Lestari",
    foto: "/images/user/user-17.jpg",
    jalurPilihan: "Afirmasi", // <-- Afirmasi tetap ada
    asalSekolah: "MTs Al-Ikhlas",
    status: "Ditolak",
    nisn: "1122334455",
    namaAyah: "Ayah Citra",
    namaIbu: "Ibu Citra",
    pekerjaanAyah: "Buruh",
    fileKK: "/#", fileAkta: "/#", fileIjazah: "/#"
  },
  {
    id: 4,
    nama: "Dewi Anggraini",
    foto: "/images/user/user-20.jpg",
    jalurPilihan: "Mandiri", // <-- Ganti Zonasi
    asalSekolah: "SMPN 5 Tegal",
    status: "Menunggu",
    nisn: "5566778899",
    namaAyah: "Ayah Dewi",
    namaIbu: "Ibu Dewi",
    pekerjaanAyah: "Karyawan Swasta",
    fileKK: "/#", fileAkta: "/#", fileIjazah: "/#"
  },
  {
    id: 5,
    nama: "Eka Prasetya",
    foto: "/images/user/user-21.jpg",
    jalurPilihan: "Prestasi",
    asalSekolah: "SMPN 1 Slawi",
    status: "Menunggu",
    nisn: "6677889900",
    namaAyah: "Ayah Eka",
    namaIbu: "Ibu Eka",
    pekerjaanAyah: "TNI/Polri",
    fileKK: "/#", fileAkta: "/#", fileIjazah: "/#"
  },
];

export default function BasicTableOne() {
  
  // State dan fungsi modal (biarkan sama)
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedData, setSelectedData] = useState<Pendaftar | null>(null);
  const openModal = (pendaftar: Pendaftar) => {
    setSelectedData(pendaftar); 
    setIsModalOpen(true); 
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedData(null); 
  };
  
  return (
    <Fragment> 
      {/* Tabel */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Header Tabel (Sudah benar) */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-black text-start text-theme-sm dark:text-white">Nama Siswa</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-black text-start text-theme-sm dark:text-white">Jalur Pilihan</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-black text-start text-theme-sm dark:text-white">Asal Sekolah</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-black text-start text-theme-sm dark:text-white">Status Berkas</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-black text-start text-theme-sm dark:text-white">Aksi</TableCell>
              </TableRow>
            </TableHeader>

            {/* Body Tabel (Sudah benar) */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {dataPendaftar.map((pendaftar) => (
                <TableRow key={pendaftar.id}>
                  {/* ... (Semua <TableCell> di body sudah benar) ... */}
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img width={40} height={40} src={pendaftar.foto} alt={pendaftar.nama} />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-gray-300">
                          {pendaftar.nama}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-gray-600 text-start text-theme-sm dark:text-gray-400">
                    {pendaftar.jalurPilihan}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-gray-600 text-start text-theme-sm dark:text-gray-400">
                    {pendaftar.asalSekolah}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm">
                    <Badge
                      size="sm"
                      color={
                        pendaftar.status === "Terverifikasi" ? "success"
                        : pendaftar.status === "Menunggu" ? "warning"
                        : "error"
                      }
                    >
                      {pendaftar.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => openModal(pendaftar)} 
                        className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                      >
                        Detail
                      </button>
                      {pendaftar.status === "Menunggu" && (
                        <>
                          <button className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700">Verifikasi</button>
                          <button className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700">Tolak</button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* === 8. KODE MODAL DETAIL (POP-UP) === */}
      {isModalOpen && selectedData && (
        
        // Wrapper Modal (z-index dan posisi sudah benar)
        <div className="fixed inset-0 z-[100000] flex items-start justify-center pt-12">
          {/* Komentar yang salah ('// === AKHIR PERBAIKAN ===') sudah dihapus */}
          
          {/* Backdrop (Area Gelap) */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeModal} 
          ></div>

          {/* Konten Modal (Box Putih) */}
          <div className="relative z-10 w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 max-h-[90vh] overflow-y-auto">
            {/* ... (Isi modal lainnya sudah benar) ... */}
            {/* Header Modal */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Detail Pendaftar: {selectedData.nama}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>
            {/* Body Modal */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Nama Lengkap</label>
                  <p className="text-base font-medium text-black dark:text-white">{selectedData.nama}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">NISN</label>
                  <p className="text-base font-medium text-black dark:text-white">{selectedData.nisn}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Asal Sekolah</label>
                  <p className="text-base font-medium text-black dark:text-white">{selectedData.asalSekolah}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Jalur Pilihan</label>
                  <p className="text-base font-medium text-black dark:text-white">{selectedData.jalurPilihan}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Nama Ayah</label>
                  <p className="text-base font-medium text-black dark:text-white">{selectedData.namaAyah}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Nama Ibu</label>
                  <p className="text-base font-medium text-black dark:text-white">{selectedData.namaIbu}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-black dark:text-white border-b pb-2 dark:border-gray-700">Berkas Terlampir</h4>
                <a href={selectedData.fileKK} target="_blank" rel="noopener noreferrer" 
                   className="block px-4 py-3 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800">
                  Lihat Kartu Keluarga (KK)
                </a>
                <a href={selectedData.fileAkta} target="_blank" rel="noopener noreferrer" 
                   className="block px-4 py-3 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800">
                  Lihat Akta Kelahiran
                </a>
                <a href={selectedData.fileIjazah} target="_blank" rel="noopener noreferrer" 
                   className="block px-4 py-3 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800">
                  Lihat Ijazah / SKL
                </a>
              </div>
            </div>
            {/* Footer Modal */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Tutup
              </button>
              {selectedData.status === "Menunggu" && (
                <>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
                    Tolak Berkas
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                    Verifikasi (Lolos)
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
    </Fragment> 
  );
}