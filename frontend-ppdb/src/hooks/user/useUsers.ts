// src/hooks/user/useUsers.ts

import { useQuery } from '@tanstack/react-query';
import Api from '../../services/api';
import Cookies from 'js-cookie';

// --- 1. UBAH INTERFACE SESUAI DATABASE PPDB KAMU! ---
export interface User {
    id: number;
    name: string;
    nisn: string;
    nik: string;
    email: string;
    role: string;
}

// hook useUsers dengan return type User array
export const useUsers = () => {
    return useQuery<User[], Error>({
        // query key (Nama unik untuk cache data ini)
        queryKey: ['users'],

        // query function
        queryFn: async () => {
            // Ambil token satpam dari brankas Cookies
            const token = Cookies.get('token');

            // Tembak API Golang pakai token
            const response = await Api.get('/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            // Kembalikan datanya sesuai format JSON Golang
            return response.data.data as User[];
        },
    });
}