// src/hooks/auth/useAuthUser.ts

import Cookies from 'js-cookie';

// Mendefinisikan struktur data profil pengguna (User).
// Properti ini wajib diselaraskan dengan struktur 'UserResponse' dari API backend Golang.
interface User {
    id: number;
    name: string;
    nisn: string;
    nik: string;
    email: string;
    role: string; // Sangat krusial untuk pemisahan akses (Authorization) Dashboard Siswa vs Admin
}

// Custom hook untuk mengambil dan mem-parsing data detail pengguna yang sedang aktif dari Cookies.
export const useAuthUser = (): User | null => {
    // Mengambil string JSON data profil pengguna yang disimpan di cookie saat login berhasil
    const userCookie = Cookies.get('user');

    // Melakukan pengecekan: 
    // Jika data user ditemukan di cookie, lakukan parsing dari JSON string menjadi object User.
    // Jika tidak ditemukan (user belum login atau cookie expired), kembalikan nilai null.
    return userCookie ? (JSON.parse(userCookie) as User) : null;
};