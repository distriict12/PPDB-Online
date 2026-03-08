// src/hooks/auth/useLogin.ts

import { useMutation } from '@tanstack/react-query';
import Api from '../../services/api';

// Mendefinisikan struktur data payload untuk permintaan otentikasi (login).
// Disesuaikan dengan endpoint backend Golang yang menggunakan autentikasi berbasis email.
interface LoginRequest {
    email: string;
    password: string;
}

// Custom hook untuk menangani proses mutasi login pengguna
export const useLogin = () => {
    return useMutation({
        // mutationFn berisi fungsi asinkron yang melakukan HTTP POST request
        mutationFn: async (data: LoginRequest) => {
            // Mengirim kredensial login ke endpoint otentikasi di backend
            const response = await Api.post('/api/login', data);
            
            // Mengembalikan body respons dari server (biasanya berisi token JWT dan data user)
            return response.data;
        }
    });
};