// src/hooks/registration/useRegistrations.ts

import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie'; // <-- 1. IMPORT COOKIES (Dompet KTP kita)
import api from '../../services/api'; 

export interface Registration {
    id: number;
    user_id: number;
    jalur_pendaftaran: string;
    jurusan_utama: string;
    jurusan_cadangan: string;
    nama_lengkap: string;
    nisn: string;
    tanggal_lahir: string;
    jenis_kelamin: string;
    no_hp: string;
    asal_sekolah: string;
    alamat: string;
    status: string;
    catatan: string;
    created_at: string;
    updated_at: string;
}

export const useRegistrations = () => {
    return useQuery({
        queryKey: ['registrations'],
        queryFn: async () => {
            // 2. Buka dompet, ambil Token-nya
            const token = Cookies.get('token');
            
            // 3. Serahkan Token ke Satpam Golang lewat Headers 'Authorization'
            const response = await api.get('/api/registrations', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            return response.data.data; 
        }
    });
};