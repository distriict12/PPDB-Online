import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie'; // <-- 1. IMPORT COOKIES (Dompet KTP)
import api from '../../services/api';

// Format data yang akan dikirim ke Golang (Sesuai struct yang kita buat tadi)
interface UpdatePayload {
    status: string;
    catatan: string;
}

export const useRegistrationUpdate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: UpdatePayload }) => {
            // 2. Ambil KTP/Token dari dompet Admin
            const token = Cookies.get('token');

            // 3. Selipkan Token ke Satpam Backend
            const response = await api.put(`/api/registrations/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        },
        onSuccess: () => {
            // Refresh data pendaftar otomatis setelah sukses update!
            queryClient.invalidateQueries({ queryKey: ['registrations'] });
        }
    });
};