// src/App.tsx

import { Routes, Route, Navigate, Outlet } from "react-router";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Cookies from "js-cookie"; // <-- IMPORT SAKTI BUAT BACA KTP (LOGIN)

import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import ForgotPassword from "./pages/AuthPages/ForgotPassword";

// Impor Layouts
import AdminLayout from "./layout/AdminLayout";
import SiswaLayout from "./layout/SiswaLayout";
import WebsiteLayout from "./layout/WebsiteLayout"; 

// Impor Pages
import LandingPage from "./pages/LandingPage";
import ManajemenAkun from "./pages/ManajemenAkun";
import PengaturanSistem from "./pages/PengaturanSistem";
import Laporan from "./pages/Laporan";
import AdminDashboard from "./pages/AdminDashboard";
import VerifikasiPendaftar from "./pages/VerifikasiPendaftar";
import SiswaDashboard from "./pages/SiswaDashboard";
import SiswaFormulir from "./pages/SiswaFormulir";
import SiswaPengumuman from "./pages/SiswaPengumuman";
import SiswaProfile from "./pages/SiswaProfile";

// ==========================================
// 🛡️ SATPAM 1: PROTECTED ROUTE (Wajib Login & Cek Role)
// ==========================================
const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const userStr = Cookies.get("user");

  // Kalau belum login sama sekali, tendang ke halaman Sign In
  if (!userStr) {
    return <Navigate to="/signin" replace />;
  }

  try {
    const user = JSON.parse(userStr);
    
    // Kalau rolenya tidak ada di daftar yang diizinkan (misal Siswa maksa masuk Admin)
    if (!allowedRoles.includes(user.role)) {
      if (user.role === "admin" || user.role === "superadmin") return <Navigate to="/admin" replace />;
      if (user.role === "siswa") return <Navigate to="/siswa" replace />;
      return <Navigate to="/signin" replace />; // Jaga-jaga kalau role aneh
    }
  } catch (e) {
    // Kalau cookie-nya rusak/di-hack orang, bersihkan dan suruh login ulang
    Cookies.remove("user");
    Cookies.remove("token");
    return <Navigate to="/signin" replace />;
  }

  // Kalau aman dan role sesuai, silakan masuk ke ruangan (Outlet)
  return <Outlet />;
};

// ==========================================
// 🛡️ SATPAM 2: GUEST ROUTE (Khusus Tamu / Belum Login)
// ==========================================
const GuestRoute = () => {
  const userStr = Cookies.get("user");

  // Kalau dia SUDAH login, tapi iseng buka halaman /signin atau /signup, tendang balik ke markasnya!
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user.role === "admin" || user.role === "superadmin") return <Navigate to="/admin" replace />;
      if (user.role === "siswa") return <Navigate to="/siswa" replace />;
    } catch (e) {}
  }

  // Kalau belum login beneran, silakan masuk ke halaman Sign In / Sign Up
  return <Outlet />;
};


// ==========================================
// 🚀 KOMPONEN APP UTAMA
// ==========================================
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        
        {/* === 1. WEBSITE PUBLIK (Bebas Akses) === */}
        <Route element={<WebsiteLayout />}>
          <Route index path="/" element={<LandingPage />} />
        </Route>

        {/* === 2. AREA ADMIN (DIJAGA SATPAM: HANYA ADMIN) === */}
        <Route element={<ProtectedRoute allowedRoles={['admin', 'superadmin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="verifikasi" element={<VerifikasiPendaftar />} />
            <Route path="manajemen-akun" element={<ManajemenAkun />} />
            <Route path="laporan" element={<Laporan />} />
            <Route path="profile" element={<UserProfiles />} /> 
          </Route>
        </Route>

        {/* === 3. AREA SISWA (DIJAGA SATPAM: HANYA SISWA) === */}
        <Route element={<ProtectedRoute allowedRoles={['siswa']} />}>
          <Route path="/siswa" element={<SiswaLayout />}>
            <Route index element={<SiswaDashboard />} />
            <Route path="formulir" element={<SiswaFormulir />} />
            <Route path="pengumuman" element={<SiswaPengumuman />} />
            <Route path="profile" element={<SiswaProfile />} /> 
          </Route>
        </Route>

        {/* === 4. AUTH / LOGIN (DIJAGA SATPAM TAMU) === */}
        <Route element={<GuestRoute />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
        
        {/* 404 Not Found (Bebas Akses) */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}             