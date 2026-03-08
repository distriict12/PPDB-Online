// src/hooks/user/useUserCreate.ts

import { useMutation } from '@tanstack/react-query';
import Api from '../../services/api';
import Cookies from 'js-cookie';

// --- 1. SESUAIKAN REQUEST DENGAN DATABASE PPDB KITA! ---
export interface UserRequest {
    nisn: string;
    nik: string;
    name: string;
    email: string;
    password: string;
    role: string; // (Opsional: Aktifkan ini kalau nanti di form Admin kamu mau nambahin pilihan Role "Admin" atau "Siswa")
}

export const useUserCreate = () => {

    return useMutation({

        // mutationFn: Fungsi yang akan dieksekusi saat tombol "Simpan" diklik
        mutationFn: async (data: UserRequest) => {

            // 1. Ambil token satpam dari brankas Cookies
            const token = Cookies.get('token');

            // 2. Tembakkan data ke API Golang dengan jalur khusus (membawa Token)
            const response = await Api.post('/api/register', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // 3. Kembalikan bukti struk respons dari Golang
            return response.data;
        }
    });
};