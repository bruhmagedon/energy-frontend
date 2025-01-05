import { useMutation } from '@tanstack/react-query';
import { Specialist } from '../types/types';
import { api } from '../api/axios-instance';
import { queryClient } from '../api/query-client';

export const useAddSpecialist = () => {
   return useMutation({
      mutationFn: async (data: Specialist) => {
         const token = JSON.parse(localStorage.getItem('accessToken') || 'null');
         if (!token) {
            throw new Error('Token отсутствует.');
         }

         const response = await api.post('specialist', data, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         return response.data;
      },
      onSuccess: (data) => {
         console.log('Специалист успешно создан:', data);
         queryClient.invalidateQueries({ queryKey: ['allSpecialists'] });
      },
   });
};
