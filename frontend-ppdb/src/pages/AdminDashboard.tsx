// src/pages/AdminDashboard.tsx

import ComponentCard from "../components/common/ComponentCard";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import { UserCircleIcon, GridIcon } from "../icons"; 

// --- IMPORT JARING DATA ---
import { useRegistrations, Registration } from "../hooks/registration/useRegistrations";

const AdminDashboard = () => {
  const { data: pendaftar, isLoading } = useRegistrations();
  const data = pendaftar || [];

  const totalPendaftar = data.length;
  const menungguVerifikasi = data.filter((item: Registration) => 
    item.status === "MENUNGGU" || item.status === "PERLU_PERBAIKAN"
  ).length;
  const lolosSeleksi = data.filter((item: Registration) => 
    item.status === "TERVERIFIKASI" || item.status === "LULUS"
  ).length;
  const ditolak = data.filter((item: Registration) => 
    item.status === "DITOLAK"
  ).length;

  return (
    <>
      <PageMeta title="Dashboard Administrator | PPDB" />
      <PageBreadcrumb pageTitle="Dashboard Utama" />

      <div className="space-y-6">
        
        {/* STATISTIK */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          
          {/* Card 1: Total Pendaftar */}
          {/* YOSHH! Kembali ke warna Abu-abu Elegan #24303F */}
          <div className="rounded-2xl border border-gray-700 bg-[#24303F] p-5 shadow-sm">
             <div className="flex items-center justify-center w-10 h-10 bg-blue-500/20 text-blue-500 rounded-full mb-4">
                <UserCircleIcon />
             </div>
             <p className="text-sm text-gray-400">Total Pendaftar</p>
             <h4 className="text-2xl font-bold text-white mt-1">
                 {isLoading ? "..." : totalPendaftar}
             </h4>
          </div>

          {/* Card 2: Perlu Verifikasi */}
          <div className="rounded-2xl border border-gray-700 bg-[#24303F] p-5 shadow-sm">
             <div className="flex items-center justify-center w-10 h-10 bg-yellow-500/20 text-yellow-500 rounded-full mb-4">
                <GridIcon />
             </div>
             <p className="text-sm text-gray-400">Perlu Verifikasi</p>
             <h4 className="text-2xl font-bold text-yellow-500 mt-1">
                 {isLoading ? "..." : menungguVerifikasi}
             </h4>
          </div>

           {/* Card 3: Lolos */}
           <div className="rounded-2xl border border-gray-700 bg-[#24303F] p-5 shadow-sm">
             <div className="flex items-center justify-center w-10 h-10 bg-green-500/20 text-green-500 rounded-full mb-4">
                <span className="font-bold text-xl">✓</span>
             </div>
             <p className="text-sm text-gray-400">Lolos</p>
             <h4 className="text-2xl font-bold text-green-500 mt-1">
                 {isLoading ? "..." : lolosSeleksi}
             </h4>
          </div>

          {/* Card 4: Ditolak */}
          <div className="rounded-2xl border border-gray-700 bg-[#24303F] p-5 shadow-sm">
             <div className="flex items-center justify-center w-10 h-10 bg-red-500/20 text-red-500 rounded-full mb-4">
                <span className="font-bold text-xl">X</span>
             </div>
             <p className="text-sm text-gray-400">Ditolak</p>
             <h4 className="text-2xl font-bold text-red-500 mt-1">
                 {isLoading ? "..." : ditolak}
             </h4>
          </div>

        </div>

        {/* INFO AKTIVITAS ADMIN */}
        <ComponentCard title="Aktivitas Admin">
          <div className="p-4">
            {isLoading ? (
                <div className="animate-pulse h-4 bg-gray-700 rounded w-1/3"></div>
            ) : menungguVerifikasi > 0 ? (
                <p className="text-gray-400 mb-4 flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                  </span>
                  Halo Admin, ada <strong className="text-yellow-500">{menungguVerifikasi} berkas</strong> menunggu verifikasi.
                </p>
            ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="w-16 h-16 bg-green-900/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">Wah Hebat! 🎉</h4>
                    <p className="text-sm text-gray-400">Semua berkas pendaftar sudah selesai diverifikasi. Anda bisa bersantai sekarang!</p>
                </div>
            )}
          </div>
        </ComponentCard>
        
      </div>
    </>
  );
};

export default AdminDashboard;