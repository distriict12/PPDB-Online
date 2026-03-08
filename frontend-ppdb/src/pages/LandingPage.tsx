// src/pages/LandingPage.tsx

import { Link } from "react-router";

export default function LandingPage() {
  return (
    <div className="bg-[#1A222C] min-h-screen font-sans text-white">
      
      {/* === 1. HERO SECTION + STATISTIK === */}
      <section id="beranda" className="relative pt-32 pb-24 overflow-hidden">
        
        {/* Efek Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 blur-[100px] rounded-full -z-10 opacity-50"></div>

        <div className="container mx-auto px-6 text-center">
          
          <span className="inline-block py-1 px-3 rounded-full bg-blue-900/30 border border-blue-700 text-blue-400 text-sm font-medium mb-6">
            Penerimaan Peserta Didik Baru 2025
          </span>
          
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-white">
            Masa Depan Cerah <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Dimulai Di Sini
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Bergabunglah dengan sekolah unggulan berbasis teknologi dan karakter. 
            Proses pendaftaran mudah, transparan, dan sepenuhnya digital.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link 
              to="/signup" 
              className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition shadow-lg shadow-blue-900/20 w-full sm:w-auto"
            >
              Daftar Sekarang
            </Link>
            <a 
              href="#alur" 
              className="px-8 py-4 rounded-full border border-gray-700 hover:bg-gray-800 text-white font-medium text-lg transition w-full sm:w-auto"
            >
              Pelajari Alur
            </a>
          </div>

          {/* STATISTIK */}
          <div className="max-w-5xl mx-auto border-t border-gray-800 pt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-1">1,250+</h3>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Pendaftar</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-400 mb-1">A</h3>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Akreditasi</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-green-400 mb-1">98%</h3>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Kelulusan</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-purple-400 mb-1">24 Jam</h3>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Layanan Online</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* === 2. ALUR PENDAFTARAN === */}
      <section id="alur" className="py-24 bg-[#1e2936]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Alur Pendaftaran</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Ikuti 4 langkah mudah berikut untuk menjadi bagian dari keluarga besar kami.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#24303F] p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition group relative">
              <div className="absolute top-0 right-0 p-4 opacity-100 text-6xl font-bold text-white">01</div>
              <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-400 mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Buat Akun</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Klik tombol Daftar, isi data diri awal (Email & NISN) untuk membuat akun siswa.</p>
            </div>

            <div className="bg-[#24303F] p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition group relative">
              <div className="absolute top-0 right-0 p-4 opacity-100 text-6xl font-bold text-white">02</div>
              <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-400 mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Lengkapi Biodata</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Login ke dashboard, lalu isi formulir pendaftaran dan pilih jurusan yang diminati.</p>
            </div>

            <div className="bg-[#24303F] p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition group relative">
              <div className="absolute top-0 right-0 p-4 opacity-100 text-6xl font-bold text-white">03</div>
              <div className="w-12 h-12 bg-yellow-900/30 rounded-lg flex items-center justify-center text-yellow-400 mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Upload Berkas</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Unggah dokumen wajib seperti KK, Akta, dan Ijazah/SKL dalam format PDF/Foto.</p>
            </div>

            <div className="bg-[#24303F] p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition group relative">
              <div className="absolute top-0 right-0 p-4 opacity-100 text-6xl font-bold text-white">04</div>
              <div className="w-12 h-12 bg-green-900/30 rounded-lg flex items-center justify-center text-green-400 mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Verifikasi & Lolos</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Admin memverifikasi data. Pantau status kelulusan langsung di dashboard Anda.</p>
            </div>
          </div>
        </div>
      </section>

      {/* === 3. FAQ & KONTAK (BAGIAN BARU) === */}
      <section className="py-20 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Kolom Kiri: Call Center / Kontak */}
            <div className="md:w-1/3">
              <h3 className="text-2xl font-bold text-white mb-4">Butuh Bantuan?</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Jika Anda mengalami kendala saat mendaftar atau memiliki pertanyaan lain, jangan ragu untuk menghubungi panitia.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-300 bg-[#24303F] p-4 rounded-lg border border-gray-700">
                  <div className="w-10 h-10 bg-blue-900/30 rounded-full flex items-center justify-center text-blue-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Call Center / WA</p>
                    <p className="font-medium text-white">(021) 1234-5678</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-300 bg-[#24303F] p-4 rounded-lg border border-gray-700">
                  <div className="w-10 h-10 bg-green-900/30 rounded-full flex items-center justify-center text-green-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Email Panitia</p>
                    <p className="font-medium text-white">panitia@sekolah.sch.id</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: FAQ Accordion Style */}
            <section id="faq" className="py-20 border-t border-gray-800"></section>
            <div className="md:w-2/3 space-y-4">
              <h3 className="text-2xl font-bold text-white mb-4">Pertanyaan Umum (FAQ)</h3>
              
              <div className="bg-[#24303F] p-5 rounded-lg border border-gray-700 hover:border-blue-500 transition">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-blue-500">Q:</span> Apakah pendaftaran dipungut biaya?
                </h4>
                <p className="text-gray-400 text-sm pl-6">
                    Tidak. Seluruh proses pendaftaran PPDB Online ini gratis dan tidak dipungut biaya apapun mulai dari pembuatan akun hingga pengumuman.
                </p>
              </div>

              <div className="bg-[#24303F] p-5 rounded-lg border border-gray-700 hover:border-blue-500 transition">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-blue-500">Q:</span> Bagaimana jika saya salah input data?
                </h4>
                <p className="text-gray-400 text-sm pl-6">
                    Selama status pendaftaran masih <b>"Draft"</b> atau <b>"Menunggu Verifikasi"</b>, Anda masih bisa mengubah data. Jika sudah diverifikasi, harap hubungi panitia melalui kontak yang tersedia.
                </p>
              </div>

              <div className="bg-[#24303F] p-5 rounded-lg border border-gray-700 hover:border-blue-500 transition">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-blue-500">Q:</span> Dokumen apa saja yang wajib diupload?
                </h4>
                <p className="text-gray-400 text-sm pl-6">
                    Dokumen wajib meliputi: Kartu Keluarga (KK), Akta Kelahiran, dan Ijazah/SKL/Rapor Semester Akhir. Pastikan hasil scan/foto terbaca jelas.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}