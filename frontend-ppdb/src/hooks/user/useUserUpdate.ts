// src/hooks/user/useUserUpdate.ts

import { useMutation } from '@tanstack/react-query';
import Api from '../../services/api';
import Cookies from 'js-cookie';

// --- 1. VERSI REVISI: NISN DAN NIK DIHAPUS DARI PAYLOAD UPDATE ---
// Kita hanya mengizinkan Admin/Siswa mengubah Nama, Email, dan Password.
export interface UserRequest {
    name: string;
    email: string;
    password?: string; // Optional: Boleh kosong kalau tidak mau ganti password
}

// Hook untuk update user
export const useUserUpdate = () => {
    return useMutation({
        // Mutation untuk update user
        mutationFn: async ({ id, data }: { id: number, data: UserRequest }) => {
            
            // 1. Ambil token
            const token = Cookies.get('token');

            // 2. Tembak API Update (Hanya membawa name, email, dan password)
            const response = await Api.put(`/api/users/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // 3. Kembalikan response
            return response.data;
        }
    });
};