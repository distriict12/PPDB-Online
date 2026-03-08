import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';

export const useRegistrationDelete = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const response = await api.delete(`/api/registrations/${id}`);
            return response.data;
        },
        onSuccess: () => {
            // Refresh data pendaftar otomatis setelah sukses dihapus!
            queryClient.invalidateQueries({ queryKey: ['registrations'] });
        }
    });
};