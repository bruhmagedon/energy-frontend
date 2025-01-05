import { useQuery } from '@tanstack/react-query';
import { IRequest } from '../types/types';
import { AxiosError } from 'axios';
import { api } from '../api/axios-instance';

export const useGetAllRequests = () => {
   return useQuery<IRequest[], AxiosError>({
      queryKey: ['allRequests'],
      queryFn: async () => {
         const token = JSON.parse(localStorage.getItem('accessToken') || 'null');
         if (!token) {
            throw new Error('Token отсутствует.');
         }
         const response = await api.get<IRequest[]>('request/admin/requests', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         return response.data;
      },
   });
};
