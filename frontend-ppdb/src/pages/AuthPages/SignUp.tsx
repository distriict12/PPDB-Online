// src/pages/AuthPages/SignUp.tsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router"; 
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import PageMeta from "../../components/common/PageMeta";

// --- IMPORT HOOK REGISTER ---
import { useRegister } from "../../hooks/auth/useRegister";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false); 

  // --- STATE KETIKAN USER ---
  const [nisn, setNisn] = useState("");
  const [nik, setNik] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // --- STATE ERROR SPESIFIK & UMUM ---
  // Kita pisahkan mana error untuk form bawah, mana error general (alert atas)
  const [fieldErrors, setFieldErrors] = useState({ nisn: "", nik: "", email: "" });
  const [generalError, setGeneralError] = useState("");
  
  const navigate = useNavigate();
  const { mutate: registerUser, isPending } = useRegister();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault(); 
    
    // Reset semua error sebelum mencoba lagi
    setGeneralError(""); 
    setFieldErrors({ nisn: "", nik: "", email: "" });

    if (!nisn || !nik || !name || !email || !password) {
      setGeneralError("Semua kolom wajib diisi!");
      return;
    }

    registerUser(
      { nisn, nik, name, email, password },
      {
        onSuccess: () => {
          alert("Pendaftaran Akun Berhasil! Silakan Login.");
          navigate("/signin");
        },
        onError: (error: any) => {
          const errorMsg = error.response?.data?.message || "Terjadi kesalahan pada server.";
          const lowerErrorMsg = errorMsg.toLowerCase();
          
          // --- MESIN PENEMBAK ERROR MULTIPLE ---
          // Jika Golang mengirim pesan dari sistem Satpam Manual kita
          if (lowerErrorMsg.includes("duplicate fields:")) {
              
              // Siapkan wadah error kosong
              const newErrors = { nisn: "", nik: "", email: "" };
              
              // Tembak error ke masing-masing kolom yang bermasalah secara bersamaan!
              if (lowerErrorMsg.includes("nisn")) newErrors.nisn = "NISN ini sudah terdaftar.";
              if (lowerErrorMsg.includes("nik")) newErrors.nik = "NIK ini sudah terdaftar.";
              if (lowerErrorMsg.includes("email")) newErrors.email = "Email ini sudah digunakan.";
              
              setFieldErrors(newErrors);

          // (Opsional) Jaga-jaga kalau error dari database bawaan masih tembus
          } else if (lowerErrorMsg.includes("duplicate entry")) {
              if (lowerErrorMsg.includes("nisn")) setFieldErrors(prev => ({ ...prev, nisn: "NISN ini sudah terdaftar." }));
              else if (lowerErrorMsg.includes("nik")) setFieldErrors(prev => ({ ...prev, nik: "NIK ini sudah terdaftar." }));
              else if (lowerErrorMsg.includes("email")) setFieldErrors(prev => ({ ...prev, email: "Email ini sudah digunakan." }));
              else setGeneralError("Data yang Anda masukkan sudah terdaftar di sistem.");
          } else {
              setGeneralError(errorMsg);
          }
        }   
      }
    );
  };

  return (
    <>
      <PageMeta title="Daftar Akun | PPDB" />
      
      <div className="relative flex min-h-screen items-center justify-center bg-[#1A222C] p-4">
        <div className="w-full max-w-lg space-y-6 rounded-lg bg-[#24303F] border border-gray-700 p-6 shadow-xl sm:p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Buat Akun Siswa</h1>
            <p className="mt-2 text-sm text-gray-400">Verifikasi data diri Anda untuk mendaftar</p>
          </div>

          {/* --- ALERT GENERAL ERROR (Hanya muncul jika bukan error spesifik kolom) --- */}
          {generalError && (
            <div className="rounded-md bg-red-500/10 p-3 border border-red-500 flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-sm text-red-500 text-left font-medium">{generalError}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="nisn" className={fieldErrors.nisn ? "text-red-400" : "text-gray-300"}>NISN *</Label>
                    <Input 
                      type="text" 
                      id="nisn" 
                      placeholder="Nomor NISN" 
                      className={`bg-[#1A222C] text-white placeholder-gray-500 transition-colors mt-1 ${fieldErrors.nisn ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-600 focus:border-blue-500"}`} 
                      value={nisn}
                      onChange={(e: any) => setNisn(e.target.value.replace(/[^0-9]/g, ""))} 
                    />
                    {/* --- PESAN ERROR MUNCUL DI SINI --- */}
                    {fieldErrors.nisn && <p className="mt-1.5 text-xs text-red-400 font-medium">{fieldErrors.nisn}</p>}
                </div>
                <div>
                    <Label htmlFor="nik" className={fieldErrors.nik ? "text-red-400" : "text-gray-300"}>NIK (Sesuai KK) *</Label>
                    <Input 
                      type="text" 
                      id="nik" 
                      placeholder="Nomor NIK" 
                      className={`bg-[#1A222C] text-white placeholder-gray-500 transition-colors mt-1 ${fieldErrors.nik ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-600 focus:border-blue-500"}`} 
                      value={nik}
                      onChange={(e: any) => setNik(e.target.value.replace(/[^0-9]/g, ""))} 
                    />
                    {fieldErrors.nik && <p className="mt-1.5 text-xs text-red-400 font-medium">{fieldErrors.nik}</p>}
                </div>
            </div>

            <div>
              <Label htmlFor="nama-lengkap" className="text-gray-300">Nama Lengkap</Label>
              <Input 
                type="text" 
                id="nama-lengkap" 
                placeholder="Sesuai Ijazah/Akta" 
                className="bg-[#1A222C] border-gray-600 text-white placeholder-gray-500 focus:border-blue-500 mt-1" 
                value={name}
                onChange={(e: any) => {
                    const formattedName = e.target.value.toLowerCase().replace(/\b\w/g, (s: string) => s.toUpperCase());
                    setName(formattedName);
                }} 
              />
            </div>

            <div>
              <Label htmlFor="email" className={fieldErrors.email ? "text-red-400" : "text-gray-300"}>Email</Label>
              <Input 
                type="email" 
                id="email" 
                placeholder="Email aktif" 
                className={`bg-[#1A222C] text-white placeholder-gray-500 transition-colors mt-1 ${fieldErrors.email ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-600 focus:border-blue-500"}`} 
                value={email}
                onChange={(e: any) => setEmail(e.target.value)} 
              />
              {fieldErrors.email && <p className="mt-1.5 text-xs text-red-400 font-medium">{fieldErrors.email}</p>}
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <div className="relative mt-1">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  placeholder="Buat password" 
                  className="bg-[#1A222C] border-gray-600 text-white placeholder-gray-500 focus:border-blue-500 pr-10" 
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)} 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                >
                  {showPassword ? (
                    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  ) : (
                    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  )}
                </button>
              </div>
            </div>
            
            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isPending}
                className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 shadow-lg shadow-blue-900/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Memproses..." : "Verifikasi & Daftar"}
              </button>
            </div>
          </form>

          <div className="text-sm text-center text-gray-400">
            Sudah punya akun?{' '}
            <Link to="/signin" className="font-medium text-blue-400 hover:text-blue-300 hover:underline">
              Masuk (Sign In)
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}