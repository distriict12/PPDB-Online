// src/pages/SiswaDashboard.tsx

import PageMeta from "../components/common/PageMeta";
import { Link } from "react-router";

// --- 1. IMPORT HOOK AUTH & PENDAFTARAN ---
import { useAuthUser } from "../hooks/auth/useAuthUser";
import { useRegistrations, Registration } from "../hooks/registration/useRegistrations";

export default function SiswaDashboard() {
  const user = useAuthUser();

  // --- 2. TARIK DATA DARI DATABASE ---
  const { data: pendaftar, isLoading } = useRegistrations();

  // --- 3. CARI DATA MILIK SISWA ---
  const myRegistration = (pendaftar || []).find((item: Registration) => item.user_id === user?.id);

  // --- 4. LOGIKA DINAMIS SAKTI ---
  const statusPendaftaran = myRegistration ? myRegistration.status : "DRAFT"; 
  const catatanAdmin = myRegistration?.catatan || "";

  // --- HELPER WARNA & TEMA BANNER ---
  const getBannerTheme = (status: string) => {
    switch (status) {
      case "LULUS": return "bg-green-900/20 border-green-500 shadow-green-900/20 text-green-400";
      case "TERVERIFIKASI": return "bg-blue-900/20 border-blue-500 shadow-blue-900/20 text-blue-400";
      case "TIDAK_LULUS": 
      case "DITOLAK": return "bg-red-900/20 border-red-500 shadow-red-900/20 text-red-400";
      case "PERLU_PERBAIKAN": return "bg-orange-900/20 border-orange-500 shadow-orange-900/20 text-orange-400";
      case "MENUNGGU": return "bg-yellow-900/20 border-yellow-500 shadow-yellow-900/20 text-yellow-400";
      default: return "bg-gray-800/50 border-gray-600 shadow-gray-900/20 text-gray-400"; // DRAFT
    }
  };

  // --- HELPER STEPPER TIMELINE ---
  const currentStep = () => {
    if (statusPendaftaran === "DRAFT") return 1;
    if (statusPendaftaran === "MENUNGGU" || statusPendaftaran === "PERLU_PERBAIKAN") return 2;
    if (statusPendaftaran === "TERVERIFIKASI" || statusPendaftaran === "DITOLAK") return 3;
    if (statusPendaftaran === "LULUS" || statusPendaftaran === "TIDAK_LULUS") return 4;
    return 1;
  };
  const step = currentStep();

  if (isLoading) {
      return (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400">Mempersiapkan Dashboard Anda...</p>
          </div>
      );
  }

  return (
    <>
      <PageMeta title="Dashboard Siswa | PPDB Online" />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Halo, <span className="text-blue-400 capitalize">{user?.name || "Calon Siswa"}</span>! 👋
        </h1>
        <p className="text-gray-400 mt-2">Pantau status pendaftaran dan jadwal seleksi PPDB Anda di sini.</p>
      </div>

      {/* --- TIMELINE PROGRESS BAR (NEW!) --- */}
      <div className="mb-8 p-6 rounded-lg border border-gray-700 bg-[#1A222C] shadow-sm overflow-x-auto">
        <div className="min-w-[600px] flex items-center justify-between relative">
           {/* Garis Latar Belakang */}
           <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-700 z-0"></div>
           {/* Garis Progress Aktif */}
           <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-500 z-0 transition-all duration-1000`} style={{ width: `${((step - 1) / 3) * 100}%` }}></div>

           {/* Step 1 */}
           <div className="relative z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-[#1A222C] ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}>1</div>
              <span className={`mt-2 text-xs font-semibold uppercase tracking-wider ${step >= 1 ? 'text-blue-400' : 'text-gray-500'}`}>Buat Akun</span>
           </div>
           {/* Step 2 */}
           <div className="relative z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-[#1A222C] ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}>2</div>
              <span className={`mt-2 text-xs font-semibold uppercase tracking-wider ${step >= 2 ? 'text-blue-400' : 'text-gray-500'}`}>Isi Formulir</span>
           </div>
           {/* Step 3 */}
           <div className="relative z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-[#1A222C] ${step >= 3 ? 'bg-blue-500 text-white' : (step === 2 && statusPendaftaran === 'MENUNGGU') ? 'bg-yellow-500 text-white animate-pulse' : 'bg-gray-700 text-gray-400'}`}>3</div>
              <span className={`mt-2 text-xs font-semibold uppercase tracking-wider ${step >= 3 ? 'text-blue-400' : (step === 2 && statusPendaftaran === 'MENUNGGU') ? 'text-yellow-500' : 'text-gray-500'}`}>Verifikasi</span>
           </div>
           {/* Step 4 */}
           <div className="relative z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-[#1A222C] ${step >= 4 ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'}`}>4</div>
              <span className={`mt-2 text-xs font-semibold uppercase tracking-wider ${step >= 4 ? 'text-green-400' : 'text-gray-500'}`}>Hasil Akhir</span>
           </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* --- KARTU UTAMA (GIANT STATUS BANNER) --- */}
        <div className={`col-span-1 lg:col-span-2 rounded-xl border-2 p-8 shadow-xl transition-all duration-500 ${getBannerTheme(statusPendaftaran)}`}>
          <div className="flex flex-col items-center text-center">
            
            {/* IKON STATUS */}
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 bg-[#1A222C] border-4 shadow-lg ${getBannerTheme(statusPendaftaran).split(' ')[1]}`}>
               {statusPendaftaran === "LULUS" && <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
               {(statusPendaftaran === "TIDAK_LULUS" || statusPendaftaran === "DITOLAK") && <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
               {statusPendaftaran === "TERVERIFIKASI" && <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
               {statusPendaftaran === "PERLU_PERBAIKAN" && <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
               {(statusPendaftaran === "MENUNGGU" || statusPendaftaran === "DRAFT") && <svg className={`w-12 h-12 ${statusPendaftaran === "MENUNGGU" ? "animate-bounce" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            </div>

            {/* TEKS JUDUL */}
            <h2 className="text-3xl font-extrabold text-white mb-3 tracking-wide">
              {statusPendaftaran === "LULUS" && "SELAMAT! ANDA DITERIMA 🎉"}
              {statusPendaftaran === "TIDAK_LULUS" && "MOHON MAAF, ANDA BELUM LOLOS"}
              {statusPendaftaran === "DITOLAK" && "MOHON MAAF, BERKAS DITOLAK"}
              {statusPendaftaran === "TERVERIFIKASI" && "BERKAS TERVERIFIKASI"}
              {statusPendaftaran === "PERLU_PERBAIKAN" && "PERBAIKAN DATA DIPERLUKAN!"}
              {statusPendaftaran === "MENUNGGU" && "MENUNGGU VERIFIKASI ADMIN"}
              {statusPendaftaran === "DRAFT" && "BELUM MENDAFTAR"}
            </h2>

            {/* DESKRIPSI */}
            <p className="text-gray-300 max-w-lg mb-8 text-lg">
              {statusPendaftaran === "LULUS" && "Selamat! Anda dinyatakan LULUS seleksi PPDB. Silakan unduh Surat Keterangan Lulus di bawah ini untuk daftar ulang."}
              {statusPendaftaran === "TIDAK_LULUS" && "Nilai akhir Anda belum memenuhi passing grade untuk jurusan yang dipilih. Tetap semangat!"}
              {statusPendaftaran === "DITOLAK" && "Berkas pendaftaran Anda tidak memenuhi syarat verifikasi administrasi. Silakan cek alasan di bawah ini."}
              {statusPendaftaran === "TERVERIFIKASI" && "Selamat, berkas Anda sudah valid! Data Anda akan diikutsertakan dalam seleksi akhir. Silakan unduh KARTU PESERTA ujian."}
              {statusPendaftaran === "PERLU_PERBAIKAN" && "Terdapat kesalahan pada data atau berkas yang Anda kirim. Waktu perbaikan sangat terbatas, segera perbaiki!"}
              {statusPendaftaran === "MENUNGGU" && "Data Anda sudah masuk ke sistem dan sedang dalam antrean pemeriksaan oleh panitia. Pantau terus halaman ini."}
              {statusPendaftaran === "DRAFT" && "Anda belum melengkapi formulir pendaftaran. Segera isi formulir dan upload dokumen sebelum kuota ditutup!"}
            </p>

            {/* KOTAK CATATAN ADMIN */}
            {catatanAdmin && (statusPendaftaran === "PERLU_PERBAIKAN" || statusPendaftaran === "DITOLAK") && (
                <div className="w-full max-w-lg rounded-xl p-5 mb-8 text-left bg-[#1A222C] border-l-4 border-orange-500 shadow-xl">
                    <h4 className="text-orange-400 font-bold flex items-center gap-2 mb-3 uppercase text-sm tracking-wider">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        Pesan dari Panitia PPDB:
                    </h4>
                    <p className="text-white text-base font-medium italic leading-relaxed">
                        "{catatanAdmin}"
                    </p>
                </div>
            )}

            {/* TOMBOL AKSI (CALL TO ACTION) */}
            {statusPendaftaran === "LULUS" && (
                <button className="flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(22,163,74,0.4)] transition transform hover:-translate-y-1">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Unduh Surat Kelulusan
                </button>
            )}

            {statusPendaftaran === "TERVERIFIKASI" && (
                <button className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] transition transform hover:-translate-y-1">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                    Cetak Kartu Ujian
                </button>
            )}

            {statusPendaftaran === "PERLU_PERBAIKAN" && (
                <div className="relative">
                   <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-yellow-500 rounded-xl blur opacity-75 animate-pulse"></div>
                   <Link to="/siswa/formulir" className="relative flex items-center gap-3 px-8 py-4 bg-orange-600 text-white rounded-xl font-bold text-lg hover:bg-orange-500 transition">
                       Perbaiki Data Sekarang <span className="text-2xl">&rarr;</span>
                   </Link>
                </div>
            )}

            {statusPendaftaran === "DRAFT" && (
                <div className="relative mt-4">
                   <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-75 animate-pulse"></div>
                   <Link to="/siswa/formulir" className="relative flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-500 transition">
                       Mulai Lengkapi Formulir <span className="text-2xl">&rarr;</span>
                   </Link>
                </div>
            )}

            {statusPendaftaran === "MENUNGGU" && (
                <div className="px-8 py-4 bg-[#1A222C] text-yellow-500 border border-yellow-500/50 rounded-xl font-bold text-lg opacity-80 cursor-not-allowed flex items-center gap-3">
                    <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Menunggu Verifikasi...
                </div>
            )}

          </div>
        </div>

        {/* KARTU JADWAL */}
        <div className="col-span-1 rounded-xl border border-gray-700 bg-[#1A222C] p-6 shadow-sm h-fit">
          <h3 className="font-bold text-white text-xl mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Jadwal PPDB
          </h3>
          <ul className="space-y-6 relative border-l-2 border-gray-700 ml-3 pl-6 py-2">
            <li className="relative">
               <span className="absolute -left-[33px] top-1 w-4 h-4 bg-blue-500 rounded-full border-4 border-[#1A222C] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
               <p className="text-white font-bold text-base">Pendaftaran & Upload</p>
               <p className="text-sm text-blue-400 mt-1 font-medium bg-blue-900/20 inline-block px-2 py-0.5 rounded border border-blue-800/50">1 - 10 Juli 2025</p>
            </li>
            <li className="relative">
               <span className="absolute -left-[33px] top-1 w-4 h-4 bg-yellow-500 rounded-full border-4 border-[#1A222C]"></span>
               <p className="text-white font-bold text-base">Verifikasi Berkas</p>
               <p className="text-sm text-gray-400 mt-1">2 - 12 Juli 2025</p>
            </li>
            <li className="relative">
               <span className="absolute -left-[33px] top-1 w-4 h-4 bg-purple-500 rounded-full border-4 border-[#1A222C]"></span>
               <p className="text-white font-bold text-base">Tes Seleksi</p>
               <p className="text-sm text-gray-400 mt-1">15 Juli 2025</p>
            </li>
            <li className="relative">
               <span className="absolute -left-[33px] top-1 w-4 h-4 bg-green-500 rounded-full border-4 border-[#1A222C]"></span>
               <p className="text-white font-bold text-base">Pengumuman Lulus</p>
               <p className="text-sm text-gray-400 mt-1">20 Juli 2025</p>
            </li>
          </ul>
        </div>

      </div>
    </>
  );
}