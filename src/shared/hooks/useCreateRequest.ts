import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '../api/axios-instance';
import { queryClient } from '../api/query-client';

export interface RequestData {
   topic: string;
   urgency: string;
   windTurbineCount: string;
   power?: string;
   model: string;
   installationYear?: string;
   serviceDate?: string;
   area: string;
   terrain: string;
   message?: string;
   city: string;
   phoneNumber: string;
}

interface CreateRequestResponse {
   id: number;
   status: string;
}

export const useCreateRequest = () => {
   return useMutation<CreateRequestResponse, AxiosError, RequestData>({
      mutationFn: async (data) => {
         const token = JSON.parse(localStorage.getItem('accessToken') || 'null');
         if (!token) {
            throw new Error('Token отсутствует.');
         }

         const response = await api.post<CreateRequestResponse>('request', data, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         return response.data;
      },
      onSuccess: (data) => {
         console.log('Заявка успешно создана:', data);
         queryClient.invalidateQueries({ queryKey: ['userRequests'] });
      },
      onError: (error) => {
         if (error.response?.status === 401) {
            console.error('Ошибка авторизации. Пожалуйста, войдите в систему снова.');
         } else {
            console.error('Ошибка при создании заявки:', error.response?.data || error.message);
         }
      },
   });
};
