    // src/pages/VerifikasiPendaftar.tsx

    import { useState } from 'react';
    import PageMeta from "../components/common/PageMeta";
    import PageBreadcrumb from "../components/common/PageBreadCrumb";

    import { useRegistrations, Registration } from "../hooks/registration/useRegistrations";
    import { useRegistrationUpdate } from "../hooks/registration/useRegistrationUpdate";
    import { useRegistrationDelete } from "../hooks/registration/useRegistrationDelete";

    const VerifikasiPendaftar = () => {
      const { data: pendaftar, isLoading, isError } = useRegistrations();
      const { mutate: updateRegistration, isPending: isUpdating } = useRegistrationUpdate();
      const { mutate: deleteRegistration, isPending: isDeleting } = useRegistrationDelete();
      
      const [searchTerm, setSearchTerm] = useState("");
      const [sortOrder, setSortOrder] = useState("newest");
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(5); 

      // --- MODAL STATE ---
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [modalType, setModalType] = useState<'view' | 'status' | 'delete' | null>(null);
      const [selectedStudent, setSelectedStudent] = useState<Registration | null>(null);
      const [noteInput, setNoteInput] = useState("");
      const [tempStatus, setTempStatus] = useState("");

      const filteredData = (pendaftar || [])
        .filter((item: Registration) => {
          const searchLower = searchTerm.toLowerCase();
          return (
            item.nama_lengkap.toLowerCase().includes(searchLower) ||
            item.nisn.includes(searchTerm)
          );
        })
        .sort((a: Registration, b: Registration) => {
          if (sortOrder === "newest") return b.id - a.id;
          if (sortOrder === "oldest") return a.id - b.id;
          if (sortOrder === "name_asc") return a.nama_lengkap.localeCompare(b.nama_lengkap);
          if (sortOrder === "status") return a.status.localeCompare(b.status);
          return 0;
        });

      const totalPages = Math.ceil(filteredData.length / itemsPerPage);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

      const openModal = (type: 'view' | 'status' | 'delete', student: Registration) => {
        setSelectedStudent(student);
        setModalType(type);
        setIsModalOpen(true);
        
        if (type === 'status') {
            setTempStatus(student.status);
            setNoteInput(student.catatan || "");
        }
      };

      const closeModal = () => {
        if (isUpdating || isDeleting) return; 
        setIsModalOpen(false);
        setModalType(null);
        setSelectedStudent(null);
        setNoteInput(""); 
      };

      const handleSaveStatus = () => {
        if (selectedStudent && tempStatus) {
          if ((tempStatus === 'PERLU_PERBAIKAN' || tempStatus === 'DITOLAK') && noteInput.trim() === "") {
              alert("Wajib mengisi alasan/catatan untuk Siswa!");
              return;
          }
          const finalCatatan = (tempStatus === 'TERVERIFIKASI' || tempStatus === 'LULUS' || tempStatus === 'MENUNGGU') ? "" : noteInput;

          updateRegistration(
            { id: selectedStudent.id, data: { status: tempStatus, catatan: finalCatatan } },
            { 
                onSuccess: () => closeModal(),
                onError: () => alert("Gagal mengupdate status!")
            }
          );
        }
      };

      const handleDelete = () => {
        if (selectedStudent) {
          deleteRegistration(selectedStudent.id, {
            onSuccess: () => closeModal(),
            onError: () => alert("Gagal menghapus pendaftar!")
          });
        }
      };

      const getStatusBadge = (status: string) => {
        const s = status.toUpperCase();
        switch (s) {
          case "TERVERIFIKASI": return "bg-green-900/30 text-green-400 border border-green-800";
          case "DITOLAK": return "bg-red-900/30 text-red-400 border border-red-800";
          case "PERLU_PERBAIKAN": return "bg-orange-900/30 text-orange-400 border border-orange-800";
          default: return "bg-yellow-900/30 text-yellow-400 border border-yellow-800"; 
        }
      };

      // --- HELPER FORMAT TANGGAL ---
      const formatTanggal = (dateString: string) => {
        if (!dateString) return "-";
        return dateString.split('T')[0]; 
      };

      // --- HELPER BUKA DOKUMEN ---
      const handleViewDocument = (filePath?: string) => {
        if (!filePath) {
          alert("Siswa tidak melampirkan dokumen ini.");
          return;
        }
        // const backendUrl = "https://l67tfv2g-3000.asse.devtunnels.ms/"; 
        const backendUrl = "http://localhost:3000/"; 
        window.open(backendUrl + filePath, "_blank"); 
      };

      return (
        <>
          <PageMeta title="Verifikasi Pendaftar | Admin PPDB" />
          <PageBreadcrumb pageTitle="Verifikasi Pendaftar" />

          <div className="rounded-lg border border-gray-700 bg-[#1A222C] shadow-sm">
            <div className="border-b border-gray-700 py-4 px-6">
              <h3 className="font-medium text-white text-xl">Daftar Pendaftar Masuk</h3>
            </div>
            
            <div className="p-5">
              <p className="text-sm text-gray-400 mb-6">
                Kelola data pendaftar yang masuk. Gunakan tombol aksi di sebelah kanan untuk memverifikasi.
              </p>

              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div className="w-full md:w-1/2 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </span>
                  <input 
                    type="text" placeholder="Cari Nama atau NISN..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-[#24303F] border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 outline-none transition"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <span className="text-sm text-gray-400 whitespace-nowrap hidden md:block">Urutkan:</span>
                  <select 
                    value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}
                    className="bg-[#24303F] border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-48 p-2.5 outline-none cursor-pointer"
                  >
                    <option value="newest">Terbaru Masuk</option>
                    <option value="oldest">Terlama Masuk</option>
                    <option value="name_asc">Nama (A-Z)</option>
                    <option value="status">Status</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg border border-gray-700">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-[#24303F] text-left">
                    <tr>
                      <th className="py-4 px-4 font-semibold text-white text-sm w-12 text-center">No</th>
                      <th className="py-4 px-4 font-semibold text-white text-sm">Nama Siswa</th>
                      <th className="py-4 px-4 font-semibold text-white text-sm">Jalur</th>
                      <th className="py-4 px-4 font-semibold text-white text-sm">Asal Sekolah</th>
                      <th className="py-4 px-4 font-semibold text-white text-sm text-center">Status</th>
                      <th className="py-4 px-4 font-semibold text-white text-sm text-center">Aksi</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-700 bg-[#1A222C]">
                    {isLoading && <tr><td colSpan={6} className="py-8 text-center text-blue-400">Memuat data pendaftar dari server...</td></tr>}
                    {isError && <tr><td colSpan={6} className="py-8 text-center text-red-400">Gagal mengambil data. Server mungkin mati.</td></tr>}

                    {!isLoading && !isError && currentData.length > 0 ? (
                      currentData.map((item: Registration, index: number) => (
                        <tr key={item.id} className="hover:bg-[#24303F] transition">
                          <td className="py-4 px-4 text-center text-gray-400">{startIndex + index + 1}</td>
                          <td className="py-4 px-4 whitespace-nowrap">
                              <div className="flex flex-col">
                                <span className="font-medium text-white text-base">{item.nama_lengkap}</span>
                                <span className="text-xs text-gray-400">NISN: {item.nisn}</span>
                              </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-300 capitalize">{item.jalur_pendaftaran.replace("_", " ").toLowerCase()}</td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-300">{item.asal_sekolah}</td>
                          <td className="py-4 px-4 whitespace-nowrap text-center">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(item.status)}`}>{item.status.replace("_", " ").toLowerCase()}</span>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button onClick={() => openModal('view', item)} className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm" title="Lihat Detail">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                              </button>
                              
                              <button onClick={() => openModal('status', item)} className="flex h-9 w-9 items-center justify-center rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition shadow-sm" title="Verifikasi / Beri Catatan">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                              </button>
                              
                              <button onClick={() => openModal('delete', item)} className="flex h-9 w-9 items-center justify-center rounded-md bg-red-600 text-white hover:bg-red-700 transition shadow-sm" title="Hapus Data">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      !isLoading && <tr><td colSpan={6} className="py-8 text-center text-gray-500">Tidak ada data pendaftar.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-400 gap-4">
                <div className="flex items-center gap-2">
                    <span>Tampilkan</span>
                    <select 
                        value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                        className="bg-[#24303F] border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                    <span>data</span>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={`px-3 py-1 border rounded ${currentPage === 1 ? 'border-gray-700 text-gray-600 cursor-not-allowed' : 'border-gray-600 text-gray-300 hover:bg-gray-700'}`}>Prev</button>
                    <span className="px-3 py-1 bg-blue-600 text-white rounded border border-blue-600">{currentPage} / {totalPages === 0 ? 1 : totalPages}</span>
                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0} className={`px-3 py-1 border rounded ${currentPage === totalPages || totalPages === 0 ? 'border-gray-700 text-gray-600 cursor-not-allowed' : 'border-gray-600 text-gray-300 hover:bg-gray-700'}`}>Next</button>
                </div>
              </div>

            </div>
          </div>

          {/* --- MODAL SYSTEM --- */}
          {isModalOpen && selectedStudent && (
            <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <div className={`bg-[#1A222C] rounded-lg shadow-xl w-full border border-gray-700 flex flex-col transition-all duration-300 ${modalType === 'view' ? 'max-w-4xl max-h-[90vh]' : 'max-w-md h-auto'}`}>
                
                <div className={`flex items-center p-4 border-b border-gray-700 ${modalType === 'view' ? 'justify-between' : 'justify-center relative'}`}>
                  <h3 className="text-lg font-bold text-white">
                    {modalType === 'view' && `Detail Pendaftar`}
                    {modalType === 'status' && `Verifikasi Pendaftar`}
                    {modalType === 'delete' && "Konfirmasi Hapus"}
                  </h3>
                  <button onClick={closeModal} disabled={isUpdating || isDeleting} className={`text-gray-400 hover:text-red-400 ${modalType !== 'view' ? 'absolute right-4 top-4' : ''}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>

                <div className="p-6 overflow-y-auto">
                  
                  {/* MODAL VIEW */}
                  {modalType === 'view' && (
                    <div className="flex flex-col lg:flex-row gap-6">
                      
                      <div className="flex-1 space-y-6">
                        <div>
                          <h4 className="text-sm font-bold text-blue-400 uppercase border-b border-gray-700 pb-2 mb-3">1. Pilihan Pendaftaran</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="col-span-2"><p className="text-gray-400 text-xs uppercase mb-1">Jalur Pendaftaran</p><p className="font-medium text-white bg-[#24303F] p-2.5 rounded-md border border-gray-700 capitalize">{selectedStudent.jalur_pendaftaran.replace("_", " ").toLowerCase()}</p></div>
                            <div><p className="text-gray-400 text-xs uppercase mb-1">Jurusan Utama</p><p className="font-medium text-white bg-[#24303F] p-2.5 rounded-md border border-gray-700">{selectedStudent.jurusan_utama}</p></div>
                            <div><p className="text-gray-400 text-xs uppercase mb-1">Jurusan Cadangan</p><p className="font-medium text-white bg-[#24303F] p-2.5 rounded-md border border-gray-700">{selectedStudent.jurusan_cadangan || "-"}</p></div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-bold text-blue-400 uppercase border-b border-gray-700 pb-2 mb-3">2. Biodata Siswa</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="col-span-2"><p className="text-gray-400 text-xs uppercase mb-1">Nama Lengkap</p><p className="font-medium text-white bg-[#24303F] p-2.5 rounded-md border border-gray-700">{selectedStudent.nama_lengkap}</p></div>
                            <div><p className="text-gray-400 text-xs uppercase mb-1">NISN</p><p className="font-medium text-white bg-[#24303F] p-2.5 rounded-md border border-gray-700">{selectedStudent.nisn}</p></div>
                            <div><p className="text-gray-400 text-xs uppercase mb-1">Jenis Kelamin</p><p className="font-medium text-white bg-[#24303F] p-2.5 rounded-md border border-gray-700">{selectedStudent.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</p></div>
                            <div><p className="text-gray-400 text-xs uppercase mb-1">Tanggal Lahir</p><p className="font-medium text-white bg-[#24303F] p-2.5 rounded-md border border-gray-700">{formatTanggal(selectedStudent.tanggal_lahir)}</p></div>
                            <div><p className="text-gray-400 text-xs uppercase mb-1">No. HP / WhatsApp</p><p className="font-medium text-white bg-[#24303F] p-2.5 rounded-md border border-gray-700">{selectedStudent.no_hp}</p></div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-blue-400 uppercase border-b border-gray-700 pb-2 mb-3">3. Domisili & Asal</h4>
                          <div className="space-y-4 text-sm">
                            <div><p className="text-gray-400 text-xs uppercase mb-1">Asal Sekolah</p><p className="font-medium text-white bg-[#24303F] p-2.5 rounded-md border border-gray-700">{selectedStudent.asal_sekolah}</p></div>
                            <div><p className="text-gray-400 text-xs uppercase mb-1">Alamat Lengkap</p><p className="font-medium text-white bg-[#24303F] p-2.5 rounded-md border border-gray-700 min-h-[60px]">{selectedStudent.alamat}</p></div>
                          </div>
                        </div>
                      </div>

                      {/* KANAN: DOKUMEN TERLAMPIR */}
    {/* KANAN: DOKUMEN TERLAMPIR */}
                      <div className="w-full lg:w-1/3 bg-[#24303F] p-5 rounded-lg border border-gray-700 h-fit">
                        <h4 className="text-sm font-bold text-gray-400 uppercase border-b border-gray-700 pb-3 mb-4">Berkas Terlampir</h4>
                        <div className="space-y-3">
                          
                          {/* 👇 TOMBOL PAS FOTO DITAMBAHKAN DI SINI 👇 */}
                          <button onClick={() => handleViewDocument((selectedStudent as any).pas_foto)} className="flex items-center w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-sm text-sm font-medium text-left">
                            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg> Lihat Pas Foto
                          </button>

                          <button onClick={() => handleViewDocument((selectedStudent as any).kartu_keluarga)} className="flex items-center w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-sm text-sm font-medium text-left">
                            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg> Lihat Kartu Keluarga
                          </button>
                          
                          <button onClick={() => handleViewDocument((selectedStudent as any).akta_kelahiran)} className="flex items-center w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-sm text-sm font-medium text-left">
                            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg> Lihat Akta Kelahiran
                          </button>
                          
                          <button onClick={() => handleViewDocument((selectedStudent as any).ijazah)} className="flex items-center w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-sm text-sm font-medium text-left">
                            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg> Lihat Ijazah / SKL
                          </button>
                          
                          <hr className="border-gray-600 my-2" />
                          
                          <button onClick={() => handleViewDocument((selectedStudent as any).berkas_pendukung)} className="flex items-center w-full px-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition shadow-sm text-sm font-medium text-left">
                            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg> Lihat Dok. Pendukung
                          </button>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* MODAL STATUS + CATATAN */}
                  {modalType === 'status' && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <p className="text-white text-sm"><span className="font-bold">Nama / Kode:</span> <span className="text-gray-300">{selectedStudent.nama_lengkap} / {selectedStudent.nisn}</span></p>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="font-bold text-white">Status Saat Ini:</span>
                            <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold capitalize ${getStatusBadge(selectedStudent.status)}`}>{selectedStudent.status.replace("_", " ").toLowerCase()}</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Ubah Status:</label>
                        <select value={tempStatus} onChange={(e) => setTempStatus(e.target.value)} className="w-full bg-[#24303F] border border-gray-600 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block p-3 outline-none cursor-pointer transition">
                              <option value="MENUNGGU">Pending (Menunggu Verifikasi)</option>
                              <option value="TERVERIFIKASI">Terima (Berkas Valid)</option>
                              <option value="DITOLAK">Tolak (Berkas Tidak Sesuai)</option>
                              <option value="PERLU_PERBAIKAN">Minta Perbaikan Data</option>
                        </select>
                      </div>

                      {(tempStatus === 'PERLU_PERBAIKAN' || tempStatus === 'DITOLAK') && (
                          <div className="mt-4 p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg">
                              <label className="block text-sm font-medium text-orange-400 mb-2">
                                  Alasan / Catatan untuk Siswa: *
                              </label>
                              <textarea 
                                  rows={3} 
                                  className="w-full p-3 border rounded-lg bg-[#1A222C] border-gray-600 text-white focus:ring-2 focus:ring-orange-500 outline-none text-sm placeholder-gray-500 transition" 
                                  placeholder="Contoh: Foto KK kurang jelas, mohon upload ulang yang terang..." 
                                  value={noteInput} 
                                  onChange={(e) => setNoteInput(e.target.value)}
                              ></textarea>
                          </div>
                      )}
                    </div>
                  )}

                  {/* MODAL DELETE */}
                  {modalType === 'delete' && (
                    <div className="text-center py-2">
                      <div className="w-14 h-14 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Hapus Data?</h3>
                      <p className="text-gray-400 text-sm">Data pendaftar <strong>{selectedStudent.nama_lengkap}</strong> akan dihapus permanen.</p>
                    </div>
                  )}

                </div>

                <div className="p-4 border-t border-gray-700 bg-[#24303F] flex justify-end gap-3 rounded-b-lg">
                  {modalType === 'status' ? (
                    <>
                        <button onClick={closeModal} disabled={isUpdating} className="px-5 py-2 text-sm font-medium bg-transparent text-gray-300 border border-gray-500 rounded-md hover:bg-gray-700 transition disabled:opacity-50">Batal</button>
                        <button onClick={handleSaveStatus} disabled={isUpdating} className="px-5 py-2 text-sm font-medium bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition shadow-lg shadow-yellow-900/20 disabled:opacity-50">
                            {isUpdating ? "Memproses..." : "Simpan & Kirim"}
                        </button>
                    </>
                  ) : (
                    <>
                        {modalType === 'view' && <button onClick={closeModal} className="px-5 py-2.5 text-sm font-medium bg-[#1A222C] text-white border border-gray-600 rounded-md hover:bg-gray-700 transition">Tutup</button>}
                        {modalType === 'delete' && (
                            <>
                                <button onClick={closeModal} disabled={isDeleting} className="px-4 py-2 text-sm font-medium text-gray-300 border border-gray-600 rounded hover:bg-gray-700 disabled:opacity-50">Batal</button>
                                <button onClick={handleDelete} disabled={isDeleting} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 disabled:opacity-50">
                                    {isDeleting ? "Menghapus..." : "Ya, Hapus"}
                                </button>
                            </>
                        )}
                    </>
                  )}
                </div>

              </div>
            </div>
          )}
        </>
      );
    };

    export default VerifikasiPendaftar;