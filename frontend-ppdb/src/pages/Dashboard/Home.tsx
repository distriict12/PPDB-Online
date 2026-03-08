// src/pages/Dashboard/Home.tsx

// --- Impor Komponen ---
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics"; // Ini adalah 4 kartu statistik (Total Pendaftar, dll)
import PageMeta from "../../components/common/PageMeta"; // Ini untuk mengubah judul tab browser
import InformasiKuota from "../../components/dashboard/InformasiKuota"; // Ini adalah widget progress bar kuota

export default function Home() {
  return (
    <>
      {/* Mengatur metadata halaman (judul tab browser) */}
      <PageMeta
        title="Dashboard PPDB | TailAdmin"
        description="Halaman Dashboard Utama untuk Super Admin PPDB"
      />
      
      {/* Layout utama halaman ini:
        flex-col = susun dari atas ke bawah
      */}
      <div className="flex flex-col gap-4 md:gap-6">
        
        {/* Bagian 1: Menampilkan 4 kartu statistik di atas */}
        <EcommerceMetrics />

        {/* Bagian 2: Menampilkan widget informasi kuota di bawah kartu */}
        <InformasiKuota />

      </div>
    </>
  );
}