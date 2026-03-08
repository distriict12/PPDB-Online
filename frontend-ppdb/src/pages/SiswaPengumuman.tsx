// src/pages/SiswaPengumuman.tsx
import ComponentCard from "../components/common/ComponentCard";
import PageMeta from "../components/common/PageMeta"; // Path ini sudah benar

const SiswaPengumuman = () => {
  
  // Nanti ini akan dikontrol oleh state
  const sudahPengumuman = true;
  const isLolos = true;

  return (
    <>
      <PageMeta title="Pengumuman Kelulusan | PPDB" />
      <div className="space-y-6">
        <ComponentCard title="Pengumuman Kelulusan">
          
          {!sudahPengumuman ? (
            // --- Tampilan SEBELUM Pengumuman ---
            <div className="p-10 text-center">
              <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                Pengumuman Belum Dibuka
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Silakan kembali lagi sesuai jadwal yang ditentukan.
              </p>
            </div>
            
          ) : isLolos ? (
            // --- Tampilan JIKA LOLOS ---
            <div className="p-10 text-center">
              <h2 className="text-4xl font-bold text-green-500 mb-3">
                SELAMAT, ANDA LOLOS!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Anda diterima di jalur Zonasi.
              </p>
              <button className="px-6 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                Cetak Bukti Kelulusan
              </button>
            </div>
            
          ) : (
            // --- Tampilan JIKA TIDAK LOLOS ---
            <div className="p-10 text-center">
              <h2 className="text-4xl font-bold text-red-500 mb-3">
                MOHON MAAF, ANDA TIDAK LOLOS
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Anda belum berhasil lolos seleksi pada kesempatan ini.
                Jangan patah semangat dan tetap berusaha!
              </p>
            </div>
          )}
          
        </ComponentCard>
      </div>
    </>
  );
};

export default SiswaPengumuman;