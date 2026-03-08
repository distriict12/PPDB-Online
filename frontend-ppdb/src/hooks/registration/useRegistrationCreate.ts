import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie'; // <-- IMPORT COOKIES
import api from '../../services/api';

export const useRegistrationCreate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: any) => {
            // 1. Ambil KTP/Token dari dompet
            const token = Cookies.get('token');
            
            // 2. Selipkan Token ke Satpam Backend
            const response = await api.post('/api/registrations', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['registrations'] });
        }
    });
};