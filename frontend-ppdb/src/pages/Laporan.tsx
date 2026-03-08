// src/pages/Laporan.tsx

import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

export default function Laporan() {
  
  // Simulasi fungsi download
  const handleDownload = () => {
    // Nanti di sini panggil API Backend untuk generate Excel
    alert("Memulai proses download data pendaftar...");
  };

  return (
    <>
      <PageMeta
        title="Laporan & Export Data | Dashboard PPDB"
        description="Halaman untuk mengunduh laporan data pendaftar"
      />
      
      <PageBreadcrumb pageTitle="Laporan / Export Data" />

      <div className="space-y-6">
        
        {/* CONTAINER UTAMA (Style disamakan dengan halaman lain) */}
        <div className="rounded-lg border border-gray-700 bg-[#1A222C] shadow-sm">
          
          {/* Header Card */}
          <div className="border-b border-gray-700 py-4 px-6">
            <h3 className="font-medium text-white text-xl">Pusat Unduhan Data</h3>
          </div>
          
          {/* Body Card */}
          <div className="p-6">
            
            {/* ITEM DOWNLOAD: Dibuat seperti kartu di dalam kartu agar rapi */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-[#24303F] p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition">
              
              {/* Ikon Excel Besar */}
              <div className="flex-shrink-0 p-4 bg-green-900/20 rounded-xl border border-green-900/30">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>

              {/* Teks Penjelasan */}
              <div className="flex-1">
                <h4 className="text-lg font-bold text-white mb-2">Laporan Lengkap Pendaftar (Excel)</h4>
                <p className="text-sm text-gray-400 leading-relaxed mb-4 md:mb-0">
                  Unduh rekapitulasi seluruh data calon siswa dalam format <strong>.xlsx</strong> (Microsoft Excel). 
                  Data mencakup Biodata, Nilai Rapor, Jurusan Pilihan, dan Status Kelulusan saat ini.
                </p>
              </div>

              {/* Tombol Download */}
              <div className="flex-shrink-0">
                <button 
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition shadow-lg shadow-green-900/20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                  Download .xlsx
                </button>
              </div>

            </div>

            {/* Jika nanti ada laporan lain (misal PDF), tinggal copy div di atas dan taruh di sini */}

          </div>
        </div>
      </div>
    </>
  );
}