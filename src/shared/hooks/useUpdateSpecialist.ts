import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/api/query-client';
import { AxiosError } from 'axios';
import { api } from '../api/axios-instance';

interface UpdateSpecialistPayload {
   status: string;
   plannedDayOfWeek: string;
   specialistId: number;
   requestId: string | number;
}

export const useUpdateSpecialist = () => {
   return useMutation<void, AxiosError, UpdateSpecialistPayload>({
      mutationFn: async ({ status, plannedDayOfWeek, specialistId, requestId }) => {
         const token = JSON.parse(localStorage.getItem('accessToken') || 'null');
         if (!token) {
            throw new Error('Token отсутствует.');
         }

         const response = await api.patch(
            `request/admin/request/${requestId}`,
            {
               status,
               plannedDayOfWeek,
               specialistId,
            },
            {
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
               },
            },
         );
         return response.data;
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['allRequests'] });
         console.log('Специалист успешно обновлен');
      },
      onError: (error) => {
         console.error('Ошибка при обновлении специалиста:', error.message);
      },
   });
};
