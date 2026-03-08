// src/pages/AuthPages/SignIn.tsx

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router"; 
import Cookies from "js-cookie"; // Untuk menyimpan token
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import PageMeta from "../../components/common/PageMeta";

// --- 1. IMPORT HOOK LOGIN & AUTH CONTEXT ---
import { useLogin } from "../../hooks/auth/useLogin";
import { AuthContext } from "../../context/AuthContext";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false); 

  // --- 2. STATE UNTUK MENAMPUNG KETIKAN USER ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // --- STATE ERROR BARU (SPESIFIK & UMUM) ---
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });
  const [validationError, setValidationError] = useState("");

  const navigate = useNavigate();
  
  const { mutate: loginUser, isPending } = useLogin();
  const authContext = useContext(AuthContext);
  const setIsAuthenticated = authContext?.setIsAuthenticated;

  // --- 3. FUNGSI SAAT TOMBOL SIGN IN DIKLIK ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset semua error sebelum mencoba lagi
    setValidationError(""); 
    setFieldErrors({ email: "", password: "" });

    // Validasi Kosong (Frontend)
    let hasEmptyError = false;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email wajib diisi!";
      hasEmptyError = true;
    }
    if (!password) {
      newErrors.password = "Password wajib diisi!";
      hasEmptyError = true;
    }

    if (hasEmptyError) {
      setFieldErrors(newErrors);
      return;
    }

    loginUser(
      { email, password },
      {
        onSuccess: (response: any) => {
          const token = response.data?.token || response.token;
          const userData = response.data?.user || response.data;

          if (token) {
            Cookies.set("token", token, { expires: 1 });
            Cookies.set("user", JSON.stringify(userData), { expires: 1 });

            if (setIsAuthenticated) setIsAuthenticated(true);

            const role = userData?.role?.toLowerCase();
            if (role === "admin") {
              navigate("/admin");
            } else {
              navigate("/siswa");
            }
          } else {
            setValidationError("Login sukses di server, tapi Token tidak ditemukan di Frontend!");
          }
        },
        // --- TANGKAP ERROR DARI BACKEND DI SINI ---
        onError: (error: any) => {
          const errorMsg = error.response?.data?.message || "Terjadi kesalahan pada server.";
          const lowerErrorMsg = errorMsg.toLowerCase();
          
          const backendErrors = { email: "", password: "" };
          let isSpesificError = false;

          // Cek jika error bersumber dari Email
          if (lowerErrorMsg.includes("email") || lowerErrorMsg.includes("user not found") || lowerErrorMsg.includes("tidak ditemukan")) {
            backendErrors.email = "Email tidak terdaftar atau salah.";
            isSpesificError = true;
          }
          
          // Cek jika error bersumber dari Password
          if (lowerErrorMsg.includes("password") || lowerErrorMsg.includes("sandi") || lowerErrorMsg.includes("credential")) {
            backendErrors.password = "Password yang Anda masukkan salah.";
            isSpesificError = true;
          }

          // Tembak error ke UI
          if (isSpesificError) {
            setFieldErrors(backendErrors);
          } else {
            setValidationError(errorMsg); // Munculkan di kotak merah atas jika error-nya umum
          }
        }
      }
    );
  };

  return (
    <>
      <PageMeta title="Sign In | PPDB" />
      
      <div className="relative flex min-h-screen items-center justify-center bg-[#1A222C] p-4">
        
        {/* --- TOMBOL KEMBALI KE HOME --- */}
        <Link 
          to="/" 
          className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-2 text-gray-400 hover:text-white transition group"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 border border-gray-700 transition">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          <span className="text-sm font-medium hidden sm:block">Kembali ke Home</span>
        </Link>

        <div className="w-full max-w-md space-y-6 rounded-lg bg-[#24303F] border border-gray-700 p-6 shadow-xl sm:p-8 relative mt-12 sm:mt-0">
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Login PPDB</h1>
            <p className="mt-2 text-sm text-gray-400">Masuk ke akun Anda untuk melanjutkan</p>
          </div>

          {/* --- ALERT GENERAL ERROR --- */}
          {validationError && (
            <div className="rounded-md bg-red-500/10 p-3 border border-red-500/50 flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-sm text-red-500 text-left font-medium">{validationError}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* KOLOM EMAIL */}
            <div>
              <Label htmlFor="email" className={fieldErrors.email ? "text-red-400" : "text-gray-300"}>Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Masukkan email Anda"
                className={`bg-[#1A222C] text-white placeholder-gray-500 mt-1 transition-colors ${fieldErrors.email ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-600 focus:border-blue-500"}`}
                value={email}
                onChange={(e: any) => setEmail(e.target.value)} 
              />
              {/* Pesan Error Spesifik Email */}
              {fieldErrors.email && <p className="mt-1.5 text-xs text-red-400 font-medium">{fieldErrors.email}</p>}
            </div>

            {/* KOLOM PASSWORD */}
            <div>
              <Label htmlFor="password" className={fieldErrors.password ? "text-red-400" : "text-gray-300"}>Password</Label>
              <div className="relative mt-1">
                <Input
                  type={showPassword ? "text" : "password"} 
                  id="password"
                  placeholder="Masukkan password"
                  className={`bg-[#1A222C] text-white placeholder-gray-500 pr-10 transition-colors ${fieldErrors.password ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-600 focus:border-blue-500"}`}
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
              {/* Pesan Error Spesifik Password */}
              {fieldErrors.password && <p className="mt-1.5 text-xs text-red-400 font-medium">{fieldErrors.password}</p>}
            </div>

            <div className="flex justify-end pt-1">
              <Link to="/forgot-password" className="text-sm font-medium text-blue-400 hover:text-blue-300 hover:underline">
                Lupa Password?
              </Link>
            </div>
            
            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isPending}
                className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 shadow-lg shadow-blue-900/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Mengecek Data..." : "Sign In"}
              </button>
            </div>
          </form>

          <div className="text-sm text-center text-gray-400">
            Belum punya akun?{' '}
            <Link to="/signup" className="font-medium text-blue-400 hover:text-blue-300 hover:underline">
              Daftar (Siswa)
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}