// src/hooks/auth/useLogout.ts

import { useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

// Custom hook untuk menangani proses terminasi sesi otentikasi (logout) pengguna.
export const useLogout = (): (() => void) => {
    // Mengakses AuthContext untuk memperbarui status autentikasi global
    const authContext = useContext(AuthContext);

    // Menggunakan non-null assertion (!) dengan asumsi arsitektur aplikasi memastikan 
    // hook ini selalu dipanggil di dalam hierarki komponen yang terbungkus <AuthProvider>
    const { setIsAuthenticated } = authContext!;

    // Inisialisasi antarmuka navigasi dari React Router
    const navigate = useNavigate();

    // Fungsi utama untuk mengeksekusi prosedur pembersihan sesi
    const logout = (): void => {
        // 1. Menghapus kredensial dan data profil dari penyimpanan sisi klien (Cookies)
        Cookies.remove("token");
        Cookies.remove("user");

        // 2. Memperbarui state global untuk memicu re-render pada komponen pelindung rute (Protected Routes)
        setIsAuthenticated(false);

        // 3. Mengarahkan pengguna kembali ke rute otentikasi (halaman login)
        navigate("/signin");
    };

    return logout;
};