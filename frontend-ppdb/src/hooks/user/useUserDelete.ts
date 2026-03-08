// src/hooks/user/useUserDelete.ts

import { useMutation } from '@tanstack/react-query';
import Api from '../../services/api';
import Cookies from 'js-cookie';

// Hook untuk delete user
export const useUserDelete = () => {

    return useMutation({
        // Mutation function untuk delete user (Hanya butuh ID target)
        mutationFn: async (id: number) => {
            
            // 1. Ambil token dari brankas cookies
            const token = Cookies.get('token');

            // 2. Lakukan request DELETE ke endpoint API Golang
            const response = await Api.delete(`/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // 3. Kembalikan bukti penghapusan
            return response.data;
        }
    });
};