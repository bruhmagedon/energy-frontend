import { useMutation } from '@tanstack/react-query';
import { api } from '../api/axios-instance';
import { queryClient } from '../api/query-client';

export const useDeleteSpecialist = () => {
   return useMutation({
      mutationFn: async (id: string) => {
         const token = JSON.parse(localStorage.getItem('accessToken') || 'null');
         if (!token) {
            throw new Error('Token отсутствует.');
         }

         const response = await api.delete(`specialist/${id}`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         return response.data;
      },
      onSuccess: (data) => {
         console.log('Специалист успешно удален:', data);
         queryClient.invalidateQueries({ queryKey: ['allSpecialists'] });
      },
   });
};
