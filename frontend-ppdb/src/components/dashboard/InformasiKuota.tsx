// src/components/dashboard/InformasiKuota.tsx

// Data dummy untuk kuota
// Data dummy untuk kuota (Versi Sekolah Swasta)
const dataKuota = [
  { id: 1, jalur: "Jalur Mandiri", terisi: 80, total: 100 },
  { id: 2, jalur: "Jalur Prestasi", terisi: 45, total: 60 },
  { id: 3, jalur: "Jalur Afirmasi", terisi: 10, total: 40 },
];

const InformasiKuota = () => {
  return (
    // Kita pakai style yang mirip dengan tabel sebelumnya
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-6 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-5">
        Informasi Kuota Jalur
      </h3>
      
      {/* Wrapper untuk daftar kuota */}
      <div className="flex flex-col gap-5">
        
        {dataKuota.map((item) => {
          // Hitung persentase untuk progress bar
          const persentase = (item.terisi / item.total) * 100;

          return (
            <div key={item.id}>
              {/* Label (Jalur & Angka) */}
              <div className="flex justify-between mb-1.5">
                <span className="font-medium text-gray-800 dark:text-white/90">
                  {item.jalur}
                </span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {item.terisi} / {item.total}
                </span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${persentase}%` }}
                ></div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default InformasiKuota;