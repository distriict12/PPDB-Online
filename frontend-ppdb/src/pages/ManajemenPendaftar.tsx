// src/pages/ManajemenPendaftar.tsx

import PageBreadcrumb from "../components/common/PageBreadCrumb"; // <-- Path diubah
import ComponentCard from "../components/common/ComponentCard"; // <-- Path diubah
import PageMeta from "../components/common/PageMeta"; // <-- Path diubah
import BasicTableOne from "../components/tables/BasicTables/BasicTableOne"; // <-- Path diubah

// Ubah NAMA FUNGSI DI SINI
export default function ManajemenPendaftar() {
  return (
    <>
      <PageMeta
        // Kita juga bisa ubah titlenya agar lebih rapi
        title="Manajemen Pendaftar | Dashboard PPDB"
        description="Halaman untuk mengelola data pendaftar"
      />
      {/* Ubah judul halaman (breadcrumb) */}
      <PageBreadcrumb pageTitle="Manajemen Pendaftar" />
      <div className="space-y-6">
        <ComponentCard title="Daftar Semua Pendaftar">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}