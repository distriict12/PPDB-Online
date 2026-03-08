// src/pages/SiswaProfile.tsx

import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import PageMeta from "../components/common/PageMeta";
import { UserCircleIcon } from "../icons";

// --- IMPORT JARING DATA ---
import { useAuthUser } from "../hooks/auth/useAuthUser";
import { useRegistrations, Registration } from "../hooks/registration/useRegistrations";

export default function SiswaProfile() {
  const user = useAuthUser();
  const { data: pendaftar, isLoading } = useRegistrations();

  // Cari data pendaftaran milik siswa yang sedang login
  const myRegistration = (pendaftar || []).find((item: Registration) => item.user_id === user?.id);

  return (
    <>
      <PageMeta
        title="Profil Siswa | PPDB Online"
        description="Halaman profil siswa"
      />
      <PageBreadcrumb pageTitle="Profil Saya" />

      <div className="space-y-6">
        <ComponentCard title="Biodata Akun">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-28 h-28 rounded-full bg-[#24303F] border-4 border-gray-700 flex items-center justify-center text-gray-400 shadow-lg">
                <UserCircleIcon className="w-16 h-16" />
              </div>
            </div>

            {/* Info Dinamis */}
            <div className="flex-1 w-full space-y-6 mt-2 md:mt-0">
              {isLoading ? (
                  <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-4 py-1">
                          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                          <div className="space-y-2">
                              <div className="h-4 bg-gray-700 rounded"></div>
                              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Nama Lengkap</label>
                      <p className="text-lg font-medium text-white capitalize">{myRegistration?.nama_lengkap || user?.name || "-"}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">NISN</label>
                      <p className="text-lg font-medium text-white font-mono">{myRegistration?.nisn || user?.username || "-"}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Email Terdaftar</label>
                      <p className="text-lg font-medium text-white">{user?.email || "-"}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Asal Sekolah</label>
                      <p className="text-lg font-medium text-white capitalize">{myRegistration?.asal_sekolah || "-"}</p>
                    </div>
                  </div>
              )}
              
              {/* Pesan Informatif Pengganti Tombol */}
              <div className="pt-4 border-t border-gray-700 mt-6">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Data profil diambil berdasarkan input formulir pendaftaran Anda.
                </p>
              </div>

            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}