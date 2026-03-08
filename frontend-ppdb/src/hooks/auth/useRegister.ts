// src/hooks/auth/useRegister.ts

import { useMutation } from '@tanstack/react-query';
import Api from '../../services/api';

// Mendefinisikan struktur data payload untuk permintaan registrasi.
// Disesuaikan dengan struktur JSON yang diterima oleh backend Golang.
interface RegisterRequest {
    name: string;
    nisn: string;       
    nik: string;      
    email: string;
    password: string;
}

// Custom hook untuk menangani proses mutasi data registrasi pengguna
export const useRegister = () => {
    return useMutation({
        // mutationFn berisi fungsi asinkron yang melakukan HTTP POST request
        mutationFn: async (data: RegisterRequest) => {
            // Mengirim data payload ke endpoint registrasi di backend
            const response = await Api.post('/api/register', data);
            
            // Mengembalikan body respons dari server untuk diproses lebih lanjut oleh komponen UI
            return response.data;
        }
    });
};