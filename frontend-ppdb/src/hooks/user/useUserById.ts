// src/hooks/user/useUserById.ts

import { useQuery } from '@tanstack/react-query';
import Api from '../../services/api';
import Cookies from 'js-cookie';

// --- 1. SESUAIKAN INTERFACE DENGAN DATABASE PPDB ---
export interface User {
    id: number;
    name: string;
    nisn: string;
    nik: string;
    email: string;
    role: string;
}

// hook useUserById dengan parameter id
export const useUserById = (id: number) => {

    return useQuery<User, Error>({

        // query key: Kita tambahkan 'id' agar React Query pintar membedakan 
        // cache data User 1 dan User 2
        queryKey: ['user', id],

        // query function
        queryFn: async () => {

            // get token from cookies
            const token = Cookies.get('token');

            // get user by id from api (Perhatikan backtick ` untuk template literal)
            const response = await Api.get(`/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // return data
            return response.data.data as User;
        },
        
        // --- PRO TIP: Jangan menembak kalau pelurunya (id) kosong! ---
        // Ini mencegah error di React saat halaman baru dimuat tapi ID belum terbaca dari URL
        enabled: !!id,
    });
};