import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '../api/axios-instance';
import { IRequest } from '../types/types';

export const useGetUserRequest = () => {
   return useQuery<IRequest[], AxiosError>({
      queryKey: ['userRequests'],
      queryFn: async () => {
         const token = JSON.parse(localStorage.getItem('accessToken') || 'null');
         if (!token) {
            throw new Error('Token отсутствует.');
         }
         const response = await api.get<IRequest[]>('request', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         return response.data;
      },
   });
};
