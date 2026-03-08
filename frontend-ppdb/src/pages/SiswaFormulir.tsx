// src/pages/SiswaFormulir.tsx

import { useState, useEffect } from "react"; 
import Cookies from "js-cookie";
import { Link } from "react-router"; // <-- TAMBAHAN: Untuk tombol Cek Status
import PageMeta from "../components/common/PageMeta";
import Label from "../components/form/Label";
import Input from "../components/form/input/InputField";

import { useRegistrationCreate } from "../hooks/registration/useRegistrationCreate";
import { useRegistrations, Registration } from "../hooks/registration/useRegistrations";
import { useRegistrationResubmit } from "../hooks/registration/useRegistrationResubmit";

const majorOptions = [
  { value: "IPA", label: "IPA (Ilmu Pengetahuan Alam)" },
  { value: "IPS", label: "IPS (Ilmu Pengetahuan Sosial)" },
  { value: "BAHASA", label: "Bahasa" },
];

const admissionPaths = [
  { value: "REGULER", label: "Jalur Reguler (Tes)" },
  { value: "PRESTASI_AKADEMIK", label: "Jalur Prestasi Akademik (Rapor/Olimpiade)" },
  { value: "PRESTASI_NON_AKADEMIK", label: "Jalur Prestasi Non-Akademik (Seni/Olahraga)" },
  { value: "MITRA", label: "Jalur Mitra / Undangan" },
  { value: "AFIRMASI", label: "Jalur Afirmasi (KIP/SKTM)" },
];

const genderOptions = [
  { value: "L", label: "Laki-laki" },
  { value: "P", label: "Perempuan" },
];

const darkInputClass = "bg-[#24303F] border-gray-600 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500";

// --- TAHAP 1: BIODATA & JALUR ---
const TahapSatu = ({ isEditable, formData, setFormData }: any) => {
  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => {
      const updatedData = { ...prev, [field]: value };
      if (field === "jurusan_utama" && value === prev.jurusan_cadangan) {
          updatedData.jurusan_cadangan = ""; 
      }
      return updatedData;
    });
  };

  const cadanganOptions = majorOptions.filter(opt => opt.value !== formData.jurusan_utama);
  const nativeSelectClass = `w-full rounded-lg border outline-none p-3 appearance-none ${darkInputClass} ${!isEditable ? "opacity-60 cursor-not-allowed" : ""}`;

  return (
    <form className="space-y-6 p-1">
      <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-4">Lengkapi Biodata Diri</h3>

      <div className={`p-5 rounded-lg border mb-6 transition-colors ${!isEditable ? 'bg-gray-800 border-gray-700' : 'bg-yellow-900/10 border-yellow-800/30'}`}>
        <h4 className="font-semibold text-yellow-500 mb-4">1. Pilih Jalur Pendaftaran</h4>
        <div>
            <Label className="text-gray-300">Jalur Masuk</Label>
            <select className={nativeSelectClass} disabled={!isEditable} value={formData.jalur_pendaftaran} onChange={(e) => handleChange("jalur_pendaftaran", e.target.value)}>
                <option value="" disabled>Pilih Jalur Pendaftaran</option>
                {admissionPaths.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        </div>
      </div>

      <div className={`p-5 rounded-lg border mb-6 transition-colors ${!isEditable ? 'bg-gray-800 border-gray-700' : 'bg-blue-900/10 border-blue-800/30'}`}>
        <h4 className="font-semibold text-blue-400 mb-4">2. Pilihan Peminatan</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-gray-300">Jurusan Pilihan (Utama)</Label>
            <select className={nativeSelectClass} disabled={!isEditable} value={formData.jurusan_utama} onChange={(e) => handleChange("jurusan_utama", e.target.value)}>
                <option value="" disabled>Pilih Jurusan Utama</option>
                {majorOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div>
            <Label className="text-gray-300">Jurusan Opsional (Cadangan)</Label>
            <select className={nativeSelectClass} disabled={!isEditable || !formData.jurusan_utama} value={formData.jurusan_cadangan} onChange={(e) => handleChange("jurusan_cadangan", e.target.value)}>
                <option value="" disabled>Pilih Jurusan Cadangan</option>
                {cadanganOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      <h4 className="font-semibold text-gray-200 mt-8 mb-4 border-b border-gray-700 pb-2">3. Data Pribadi Siswa</h4>
      <div>
        <Label className="text-gray-300">Nama Lengkap</Label>
        <Input 
          type="text" 
          placeholder="Sesuai Ijazah/Akta" 
          disabled={!isEditable} 
          className={darkInputClass} 
          value={formData.nama_lengkap} 
          onChange={(e) => {
            // SIHIR AUTO-CAPITALIZE (Title Case)
            const formattedName = e.target.value.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
            handleChange("nama_lengkap", formattedName);
          }} 
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div><Label className="text-gray-300">NISN</Label><Input type="text" inputMode="numeric" placeholder="10 digit NISN" maxLength={10} disabled={!isEditable} className={darkInputClass} value={formData.nisn} onChange={(e) => handleChange("nisn", e.target.value.replace(/[^0-9]/g, ""))} /></div>
        <div><Label className="text-gray-300">Tanggal Lahir (YYYY-MM-DD)</Label><Input type="date" disabled={!isEditable} className={darkInputClass} value={formData.tanggal_lahir} onChange={(e) => handleChange("tanggal_lahir", e.target.value)} /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="text-gray-300">Jenis Kelamin</Label>
          <select className={nativeSelectClass} disabled={!isEditable} value={formData.jenis_kelamin} onChange={(e) => handleChange("jenis_kelamin", e.target.value)}>
              <option value="" disabled>Pilih Jenis Kelamin</option>
              {genderOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div><Label className="text-gray-300">Nomor HP / WhatsApp</Label><Input type="text" inputMode="numeric" placeholder="Contoh: 0812..." maxLength={15} disabled={!isEditable} className={darkInputClass} value={formData.no_hp} onChange={(e) => handleChange("no_hp", e.target.value.replace(/[^0-9]/g, ""))} /></div>
      </div>
      <div><Label className="text-gray-300">Asal Sekolah</Label><Input type="text" placeholder="Nama sekolah sebelumnya..." disabled={!isEditable} className={darkInputClass} value={formData.asal_sekolah} onChange={(e) => handleChange("asal_sekolah", e.target.value)} /></div>
      <div>
        <Label className="text-gray-300">Alamat Lengkap</Label>
        <textarea rows={3} placeholder="Jalan, RT/RW, Kelurahan, Kecamatan..." disabled={!isEditable} 
          className={`w-full rounded-lg border outline-none p-3 ${darkInputClass} ${!isEditable ? "opacity-60 cursor-not-allowed" : ""}`}
          value={formData.alamat} onChange={(e) => handleChange("alamat", e.target.value)} />
      </div>
    </form>
  );
};

// --- TAHAP 2: UPLOAD DOKUMEN ---
// INFO: Menambahkan formData untuk membaca file yang sudah dipilih
const TahapDua = ({ isEditable, formData, handleFileChange }: any) => {
  const commonDocs = [
    { label: "Kartu Keluarga *", field: "kartu_keluarga", accept: ".pdf,.jpg,.jpeg", note: "Maksimal 2MB (PDF/JPG)" },
    { label: "Akta Kelahiran *", field: "akta_kelahiran", accept: ".pdf,.jpg,.jpeg", note: "Maksimal 2MB (PDF/JPG)" },
    { label: "Ijazah / SKL *", field: "ijazah", accept: ".pdf,.jpg,.jpeg", note: "Maksimal 2MB (PDF/JPG)" },
    { label: "Pas Foto Background Merah/Biru *", field: "pas_foto", accept: ".jpg,.jpeg,.png", note: "Maksimal 1MB (JPG/PNG)" }
  ];

  return (
    <div className="p-1 space-y-6">
      <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-4">Upload Dokumen Wajib</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {commonDocs.map((doc, idx) => {
            const selectedFile = formData[doc.field]; // Ambil file yang terpilih
            return (
              <div key={idx} className={`p-4 rounded-lg border transition-all ${selectedFile ? 'bg-green-900/10 border-green-500/30' : 'bg-[#24303F] border-gray-700'}`}>
                  <Label className="mb-1 block text-gray-200 font-semibold">{doc.label}</Label>
                  <span className="text-xs text-gray-500 block mb-3">{doc.note}</span>
                  
                  <input 
                    type="file" accept={doc.accept} disabled={!isEditable} 
                    onChange={(e) => handleFileChange(doc.field, e.target.files?.[0] || null)}
                    className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white cursor-pointer hover:file:bg-blue-700" 
                  />
                  
                  {/* --- FITUR PREVIEW NAMA FILE --- */}
                  {selectedFile && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-green-400 bg-green-900/20 p-2 rounded border border-green-800/50 break-all">
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span>Siap diunggah: <strong>{selectedFile.name}</strong></span>
                    </div>
                  )}
              </div>
            );
        })}
      </div>

      {formData.jalur_pendaftaran !== "REGULER" && (
          <div className="mt-6 p-5 bg-yellow-900/10 border border-yellow-800/30 rounded-lg">
             <h4 className="font-bold text-yellow-500 mb-2">Dokumen Pendukung Jalur {formData.jalur_pendaftaran.replace(/_/g, " ")}</h4>
             <div className={`p-4 rounded-lg border mt-4 ${formData.berkas_pendukung ? 'bg-green-900/10 border-green-500/30' : 'bg-[#24303F] border-gray-700'}`}>
                <Label className="mb-1 block text-gray-200">
                  {formData.jalur_pendaftaran === "PRESTASI_AKADEMIK" && "Scan Rapor / Sertifikat Olimpiade *"}
                  {formData.jalur_pendaftaran === "PRESTASI_NON_AKADEMIK" && "Sertifikat Juara Lomba Seni/Olahraga *"}
                  {formData.jalur_pendaftaran === "AFIRMASI" && "Kartu KIP / SKTM / PKH dari Kelurahan *"}
                  {formData.jalur_pendaftaran === "MITRA" && "Surat Rekomendasi / Undangan dari Sekolah Mitra *"}
                </Label>
                <span className="text-xs text-gray-500 block mb-3">Maksimal 2MB (PDF/JPG)</span>
                
                <input 
                  type="file" accept=".pdf,.jpg,.jpeg,.png" disabled={!isEditable} 
                  onChange={(e) => handleFileChange("berkas_pendukung", e.target.files?.[0] || null)}
                  className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-600 file:text-white cursor-pointer hover:file:bg-yellow-700" 
                />

                {/* --- FITUR PREVIEW NAMA FILE PENDUKUNG --- */}
                {formData.berkas_pendukung && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-green-400 bg-green-900/20 p-2 rounded border border-green-800/50 break-all">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Siap diunggah: <strong>{formData.berkas_pendukung.name}</strong></span>
                  </div>
                )}
             </div>
          </div>
      )}
    </div>
  );
};

// --- KOMPONEN UTAMA ---
const SiswaFormulir = () => {
  const [tahap, setTahap] = useState(1); 
  
  const userDataString = Cookies.get("user");
  let currentUserId = 0;
  if (userDataString) {
      try {
          const userObj = JSON.parse(userDataString);
          currentUserId = userObj.id;
      } catch (e) {
          console.error("Gagal membaca data user dari cookies");
      }
  }

  const { data: pendaftar, isLoading: isFetchingData } = useRegistrations();
  const myRegistration = (pendaftar || []).find((item: Registration) => item.user_id === currentUserId);
  
  const { mutate: createRegistration, isPending: isCreating } = useRegistrationCreate();
  const { mutate: resubmitRegistration, isPending: isResubmitting } = useRegistrationResubmit();
  const isPending = isCreating || isResubmitting;

  const [formData, setFormData] = useState<any>({
    jalur_pendaftaran: "",
    jurusan_utama: "",
    jurusan_cadangan: "",
    nama_lengkap: "",
    nisn: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    no_hp: "",
    asal_sekolah: "",
    alamat: "",
    user_id: currentUserId,
    kartu_keluarga: null,
    akta_kelahiran: null,
    ijazah: null,
    pas_foto: null,
    berkas_pendukung: null
  });

  useEffect(() => {
    if (myRegistration && myRegistration.status === "PERLU_PERBAIKAN") {
        const formattedDate = myRegistration.tanggal_lahir ? myRegistration.tanggal_lahir.split('T')[0] : "";
        setFormData((prev: any) => ({
            ...prev,
            jalur_pendaftaran: myRegistration.jalur_pendaftaran || "",
            jurusan_utama: myRegistration.jurusan_utama || "",
            jurusan_cadangan: myRegistration.jurusan_cadangan || "",
            nama_lengkap: myRegistration.nama_lengkap || "",
            nisn: myRegistration.nisn || "",
            tanggal_lahir: formattedDate, 
            jenis_kelamin: myRegistration.jenis_kelamin || "",
            no_hp: myRegistration.no_hp || "",
            asal_sekolah: myRegistration.asal_sekolah || "",
            alamat: myRegistration.alamat || "",
        }));
    }
  }, [myRegistration]);

  const isEditable = true; 

  const handleFileChange = (field: string, file: File | null) => {
    setFormData((prev: any) => ({ ...prev, [field]: file }));
  };

const lanjutTahap = () => {
      if (tahap === 1) {
          // --- VALIDASI SUPER KETAT ---
          if (
              !formData.jalur_pendaftaran || 
              !formData.jurusan_utama || 
              !formData.nama_lengkap || 
              !formData.nisn || 
              !formData.tanggal_lahir || 
              !formData.jenis_kelamin || 
              !formData.no_hp || 
              !formData.asal_sekolah || 
              !formData.alamat
          ) {
              alert("🚨 TUNGGU DULU!\n\nMohon lengkapi SEMUA kolom biodata (termasuk Tanggal Lahir, Jenis Kelamin, No HP, dll) sebelum lanjut ke tahap dokumen!");
              return;
          }
      }
      setTahap((prev) => prev + 1);
      window.scrollTo(0, 0);
  };

  const kembaliTahap = () => {
      setTahap((prev) => prev - 1);
      window.scrollTo(0, 0);
  };

  const handleFinalSubmit = () => {
      // Validasi Dokumen Wajib
      if (!formData.kartu_keluarga || !formData.akta_kelahiran || !formData.ijazah || !formData.pas_foto) {
          alert("Gagal mengirim! Pastikan semua DOKUMEN WAJIB (KK, Akta, Ijazah, Foto) sudah di-upload!");
          return;
      }
      if (formData.jalur_pendaftaran !== "REGULER" && !formData.berkas_pendukung) {
          alert("Gagal mengirim! Anda memilih jalur khusus, mohon upload DOKUMEN PENDUKUNG!");
          return;
      }

      const isConfirmed = window.confirm("🚨 PERHATIAN!\n\nApakah Anda yakin semua data teks dan DOKUMEN yang diunggah sudah benar?\nData akan dikirim dan diverifikasi oleh Admin.");
      if (!isConfirmed) return;

      const multipartData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
            multipartData.append(key, formData[key]);
        }
      });

      if (myRegistration && myRegistration.status === "PERLU_PERBAIKAN") {
          resubmitRegistration(multipartData, {
              onSuccess: () => {
                  setTahap(3);
                  window.scrollTo(0, 0);
              },
              onError: () => {
                  alert("Gagal memperbarui data! Pastikan file valid atau server menyala.");
              }
          });
      } else {
          createRegistration(multipartData, {
              onSuccess: () => {
                  setTahap(3);
                  window.scrollTo(0, 0);
              },
              onError: () => {
                  alert("Gagal mengirim data! Pastikan file tidak rusak dan Anda belum pernah mendaftar.");
              }
          });
      }
  };

  if (isFetchingData) {
      return (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400">Mengecek status pendaftaran Anda...</p>
          </div>
      );
  }

  // GEMBOK OTOMATIS AKTIF
  if (myRegistration && myRegistration.status !== "PERLU_PERBAIKAN") {
      return (
        <>
          <PageMeta title="Lengkapi Pendaftaran | PPDB" />
          <div className="rounded-xl border border-gray-700 bg-[#1A222C] shadow-2xl p-12 text-center mt-8 relative overflow-hidden">
            {/* Dekorasi Latar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
            
            <div className="w-28 h-28 bg-[#24303F] text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-blue-900/30 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-3">Formulir Terkunci</h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-8 text-lg">Anda sudah berhasil mengirimkan data pendaftaran. Dokumen Anda saat ini sedang dalam proses antrean verifikasi oleh Panitia PPDB.</p>
            
            <Link to="/siswa" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-900/20">
                &larr; Kembali ke Dashboard
            </Link>
          </div>
        </>
      );
  }

  return (
    <>
      <PageMeta title="Lengkapi Pendaftaran | PPDB" />
      <div className="space-y-6">

        {myRegistration?.status === "PERLU_PERBAIKAN" && (
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-6 shadow-xl flex items-start gap-4 animate-pulse">
                <div className="bg-orange-500/20 p-3 rounded-full text-orange-500 mt-1">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <div>
                    <h3 className="text-orange-400 font-extrabold text-xl uppercase tracking-wider mb-1">Mode Perbaikan Data Terbuka</h3>
                    <p className="text-gray-300 text-base">Admin meminta Anda memperbaiki data/dokumen. Silakan upload ulang dokumen yang salah dan kirim kembali.</p>
                    {myRegistration.catatan && (
                        <div className="mt-3 bg-[#1A222C] p-4 rounded border border-gray-700">
                            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1 block">Pesan Admin:</span>
                            <p className="text-orange-300 italic">"{myRegistration.catatan}"</p>
                        </div>
                    )}
                </div>
            </div>
        )}

        <div className="rounded-xl border border-gray-700 bg-[#1A222C] shadow-sm overflow-hidden">
          
          <div className="p-6 border-b border-gray-700 bg-[#24303F]/50">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Formulir Pendaftaran Siswa Baru</h2>
            <div className="flex justify-center items-center w-full max-w-2xl mx-auto gap-4 md:gap-8">
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-base font-bold transition-all ${tahap >= 1 ? 'bg-blue-600 border-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'border-gray-600 text-gray-500'}`}>1</div>
                <span className={`text-sm font-semibold uppercase tracking-wider ${tahap >= 1 ? 'text-blue-400' : 'text-gray-500'}`}>Biodata</span>
              </div>
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${tahap >= 2 ? 'bg-blue-600' : 'bg-gray-700'}`}></div>
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-base font-bold transition-all ${tahap >= 2 ? 'bg-blue-600 border-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'border-gray-600 text-gray-500'}`}>2</div>
                <span className={`text-sm font-semibold uppercase tracking-wider ${tahap >= 2 ? 'text-blue-400' : 'text-gray-500'}`}>Dokumen</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {tahap === 1 && <TahapSatu isEditable={isEditable} formData={formData} setFormData={setFormData} />}
            {tahap === 2 && <TahapDua isEditable={isEditable} formData={formData} handleFileChange={handleFileChange} />}
            {tahap === 3 && (
              <div className="py-12 text-center">
                <div className="w-24 h-24 bg-green-900/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-green-900/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-4">Pendaftaran Berhasil Terkirim! 🎉</h2>
                <p className="text-gray-400 mb-10 max-w-lg mx-auto text-lg leading-relaxed">Data dan dokumen Anda telah masuk ke dalam antrean *server*. Panitia akan segera melakukan verifikasi. Silakan pantau status Anda secara berkala.</p>
                
                {/* --- TOMBOL YANG SUDAH DIPERBAIKI --- */}
                <Link to="/siswa" className="inline-flex items-center gap-3 px-10 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:-translate-y-1 transform">
                   Ke Halaman Dashboard Sekarang &rarr;
                </Link>
              </div>
            )}
          </div>
          
          {tahap < 3 && (
            <div className="flex justify-between p-6 border-t border-gray-700 bg-[#24303F] rounded-b-lg">
              <button onClick={kembaliTahap} disabled={tahap === 1} className={`px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-lg border transition ${tahap === 1 ? 'border-gray-700 text-gray-600 cursor-not-allowed bg-transparent' : 'border-gray-500 text-gray-300 hover:bg-gray-700 hover:text-white bg-[#1A222C]'}`}>
                &larr; Kembali
              </button>
              
              {tahap === 1 ? (
                 <button onClick={lanjutTahap} className="px-8 py-3 text-sm font-bold uppercase tracking-wider text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition shadow-lg shadow-blue-900/20">
                    Lanjut Tahap Dokumen &rarr;
                 </button>
              ) : (
                 <button onClick={handleFinalSubmit} disabled={isPending} className="px-8 py-3 text-sm font-bold uppercase tracking-wider text-white bg-green-600 rounded-lg hover:bg-green-500 transition shadow-[0_0_15px_rgba(34,197,94,0.4)] disabled:opacity-50 flex items-center gap-2">
                    {isPending ? (
                        <><svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> MENGIRIM DATA...</>
                    ) : (
                        "KIRIM PENDAFTARAN FINAL"
                    )}
                 </button>
              )}
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default SiswaFormulir;