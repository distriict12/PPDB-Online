// src/pages/ManajemenAkun.tsx

import { useState } from 'react';
import PageBreadcrumb from "../components/common/PageBreadCrumb"; 
import PageMeta from "../components/common/PageMeta";

// --- 1. IMPORT SENJATA KITA & QUERY CLIENT ---
import { useQueryClient } from '@tanstack/react-query';
import { useUsers, User } from "../hooks/user/useUsers";
import { useUserCreate } from "../hooks/user/useUserCreate";
import { useUserDelete } from "../hooks/user/useUserDelete";
import { useAuthUser } from "../hooks/auth/useAuthUser";

export default function ManajemenAkun() {
  const queryClient = useQueryClient(); 
  const currentUser = useAuthUser();

  // --- 2. PANGGIL HOOKS CRUD ---
  const { data: accounts, isLoading, isError } = useUsers();
  const { mutate: createUser, isPending: isCreating } = useUserCreate();
  const { mutate: deleteUser, isPending: isDeleting } = useUserDelete();
  
  // State Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'delete' | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // State Form Tambah (Role dihapus dari UI, tapi di-hardcode jadi 'admin' pas kirim)
  const [formData, setFormData] = useState({ nama: "", email: "", password: "" });

  // --- HANDLERS ---

  const openAddModal = () => {
    setFormData({ nama: "", email: "", password: "" }); // Reset form
    setModalType('add');
    setIsModalOpen(true);
  };

  const openDeleteModal = (id: number) => {
    setSelectedId(id);
    setModalType('delete');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isCreating || isDeleting) return; 
    setIsModalOpen(false);
    setModalType(null);
    setSelectedId(null);
  };

  // --- 3. LOGIK TAMBAH DATA KE GOLANG ---
 // --- 3. LOGIK TAMBAH DATA KE GOLANG ---
  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nama && formData.email && formData.password) {
        
        // Bikin angka unik berdasarkan waktu saat detik ini ditekan!
        const uniqueId = Date.now().toString();

        createUser({
            name: formData.nama,
            email: formData.email,
            password: formData.password,
            role: "admin", 
            nisn: "ADM-" + uniqueId, // <--- Dijamin nggak akan pernah kembar!
            nik: "ADM-" + uniqueId   // <--- Dijamin nggak akan pernah kembar!
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['users'] });
                closeModal();
            },
            onError: (error: any) => {
                alert("Gagal menambahkan akun: " + (error.response?.data?.message || "Terjadi kesalahan"));
            }
        });
    }
  };

  // --- 4. LOGIK HAPUS DATA DI GOLANG ---
  const handleSubmitDelete = () => {
    if (selectedId) {
      deleteUser(selectedId, {
          onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ['users'] });
              closeModal();
          },
          onError: () => {
              alert("Gagal menghapus akun!");
          }
      });
    }
  };

  return (
    <>
      <PageMeta
        title="Manajemen Akun | Dashboard PPDB"
        description="Halaman untuk mengelola akun admin panitia"
      />
      <PageBreadcrumb pageTitle="Manajemen Akun Admin" />
      
      <div className="space-y-6">
        
        {/* Tombol Tambah */}
        <div className="flex justify-end">
          <button
            onClick={openAddModal} 
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-900/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
            Tambah Akun Admin
          </button>
        </div>

        {/* --- TABEL AKUN --- */}
        <div className="rounded-lg border border-gray-700 bg-[#1A222C] shadow-sm">
            <div className="border-b border-gray-700 py-4 px-6">
                <h3 className="font-medium text-white text-xl">Daftar Akun Admin</h3>
            </div>
            <div className="p-5">
                <div className="overflow-x-auto rounded-lg border border-gray-700">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-[#24303F] text-left">
                            <tr>
                                <th className="py-4 px-4 font-semibold text-white text-sm w-12 text-center">No</th>
                                <th className="py-4 px-4 font-semibold text-white text-sm">Nama Lengkap</th>
                                <th className="py-4 px-4 font-semibold text-white text-sm">Email</th>
                                <th className="py-4 px-4 font-semibold text-white text-sm text-center">Peran (Role)</th>
                                <th className="py-4 px-4 font-semibold text-white text-sm text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700 bg-[#1A222C]">
                            
                            {/* Tampilkan Loading */}
                            {isLoading && (
                                <tr><td colSpan={5} className="py-8 text-center text-blue-400">Memuat data dari server...</td></tr>
                            )}

                            {/* Tampilkan Error */}
                            {isError && (
                                <tr><td colSpan={5} className="py-8 text-center text-red-400">Gagal memuat data. Server mungkin mati.</td></tr>
                            )}

                          {/* Tampilkan Data Aktual (Hanya Filter Role Admin/Superadmin) */}
                            {!isLoading && !isError && accounts?.filter((user: User) => user.role === 'admin' || user.role === 'superadmin').map((acc: User, index: number) => (
                                <tr key={acc.id} className="hover:bg-[#24303F] transition">
                                    <td className="py-4 px-4 text-center text-gray-400">{index + 1}</td>
                                    <td className="py-4 px-4 text-white font-medium capitalize">{acc.name}</td>
                                    <td className="py-4 px-4 text-gray-300 font-mono text-sm">{acc.email}</td>
                                    <td className="py-4 px-4 text-center">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border capitalize ${
                                            acc.role === 'superadmin' 
                                            ? 'bg-purple-900/30 text-purple-400 border-purple-800' 
                                            : 'bg-blue-900/30 text-blue-400 border-blue-800'
                                        }`}>
                                            {acc.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            {/* Logika Pintar: Admin tidak bisa menghapus dirinya sendiri */}
                                            {acc.id !== currentUser?.id ? (
                                                <button 
                                                    onClick={() => openDeleteModal(acc.id)}
                                                    className="flex h-9 w-9 items-center justify-center rounded-md bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white border border-red-500/50 transition shadow-sm"
                                                    title="Hapus Akun"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            ) : (
                                                <span className="text-xs text-gray-500 italic bg-[#24303F] px-3 py-1 rounded-full border border-gray-700">
                                                    Sedang dipakai
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            
                            {/* Jika Data Kosong */}
                            {!isLoading && accounts?.filter((u: User) => u.role === 'admin' || u.role === 'superadmin').length === 0 && (
                                <tr><td colSpan={5} className="py-8 text-center text-gray-500">Belum ada akun terdaftar.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>

      {/* === MODAL SYSTEM === */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className={`bg-[#1A222C] rounded-lg shadow-xl w-full border border-gray-700 flex flex-col transition-all duration-300
            ${modalType === 'add' ? 'max-w-md' : 'max-w-sm'}
          `}>
            
            {/* Header Modal */}
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-lg font-bold text-white">
                {modalType === 'add' ? 'Tambah Akun Admin' : 'Konfirmasi Hapus'}
              </h3>
              <button onClick={closeModal} disabled={isCreating || isDeleting} className="text-gray-400 hover:text-red-400 transition disabled:opacity-50">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Body Modal */}
            <div className="p-6">
                
                {/* FORM TAMBAH AKUN (ROLE DIHILANGKAN) */}
                {modalType === 'add' && (
                    <form id="addAccountForm" onSubmit={handleSubmitAdd} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Nama Lengkap</label>
                            <input 
                                type="text" 
                                required
                                value={formData.nama}
                                onChange={(e) => setFormData({...formData, nama: e.target.value})}
                                className="w-full bg-[#24303F] border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none placeholder-gray-500 transition"
                                placeholder="Contoh: Budi Santoso"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <input 
                                type="email" 
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-[#24303F] border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none placeholder-gray-500 transition"
                                placeholder="email@contoh.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <input 
                                type="password" 
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full bg-[#24303F] border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none placeholder-gray-500 transition"
                                placeholder="Minimal 6 karakter"
                            />
                        </div>
                    </form>
                )}

                {/* KONFIRMASI HAPUS */}
                {modalType === 'delete' && (
                    <div className="text-center">
                        <div className="w-14 h-14 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Hapus Akun?</h3>
                        <p className="text-gray-400 text-sm">Akun ini akan dihapus secara permanen dan tidak dapat mengakses sistem lagi.</p>
                    </div>
                )}

            </div>

            {/* Footer Modal */}
            <div className="p-4 border-t border-gray-700 bg-[#24303F] flex justify-end gap-3 rounded-b-lg">
              <button onClick={closeModal} disabled={isCreating || isDeleting} className="px-4 py-2 text-sm font-medium bg-transparent text-gray-300 border border-gray-500 rounded-md hover:bg-gray-700 transition disabled:opacity-50">
                Batal
              </button>
              
              {modalType === 'add' && (
                  <button type="submit" form="addAccountForm" disabled={isCreating} className="px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-lg shadow-blue-900/20 disabled:opacity-50">
                    {isCreating ? 'Menyimpan...' : 'Simpan Akun Baru'}
                  </button>
              )}
              
              {modalType === 'delete' && (
                  <button onClick={handleSubmitDelete} disabled={isDeleting} className="px-5 py-2 text-sm font-medium bg-red-600 text-white rounded-md hover:bg-red-700 transition shadow-lg shadow-red-900/20 disabled:opacity-50">
                    {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
                  </button>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}