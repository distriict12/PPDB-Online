// src/pages/UserProfiles.tsx

import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import PageMeta from "../components/common/PageMeta";
import { UserCircleIcon } from "../icons";

// --- IMPORT JARING DATA ---
import { useAuthUser } from "../hooks/auth/useAuthUser";

export default function UserProfiles() {
  // Tarik data Admin yang sedang login dari Cookies
  const user = useAuthUser();

  // Helper untuk memberikan warna badge sesuai Role
  const getRoleBadge = (role: string) => {
    const r = role?.toLowerCase();
    if (r === "admin" || r === "superadmin") {
        return "bg-purple-900/30 text-purple-400 border border-purple-800";
    }
    return "bg-blue-900/30 text-blue-400 border border-blue-800";
  };

  // Helper text untuk Role
  const getRoleText = (role: string) => {
    const r = role?.toLowerCase();
    if (r === "admin" || r === "superadmin") return "Super Admin";
    if (r === "siswa") return "Siswa";
    return role || "-";
  };

  return (
    <>
      <PageMeta
        title="Profil Admin | PPDB Online"
        description="Halaman profil admin"
      />
      <PageBreadcrumb pageTitle="Profil Saya" />

      <div className="space-y-6">
        <ComponentCard title="Informasi Profil">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-28 h-28 rounded-full bg-[#24303F] border-4 border-gray-700 flex items-center justify-center text-gray-400 shadow-lg">
                <UserCircleIcon className="w-16 h-16" />
              </div>
            </div>

            {/* Info Dinamis */}
            <div className="flex-1 w-full space-y-6 mt-2 md:mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Nama Lengkap</label>
                  <p className="text-lg font-medium text-white capitalize">
                    {user?.name || "Admin PPDB"}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Email</label>
                  <p className="text-lg font-medium text-white">{user?.email || "-"}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Peran (Role)</label>
                  <div className="mt-1">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold capitalize ${getRoleBadge(user?.role || "")}`}>
                        {getRoleText(user?.role || "")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pesan Informatif Pengganti Tombol Edit */}
              <div className="pt-4 border-t border-gray-700 mt-6">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Profil Admin saat ini bersifat Read-Only (Hanya Baca) untuk menjaga keamanan sistem.
                </p>
              </div>

            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}