import { useQuery } from '@tanstack/react-query';
import { Specialist } from '../types/types';
import { AxiosError } from 'axios';
import { api } from '../api/axios-instance';

export const useGetAllSpectialist = () => {
   return useQuery<Specialist[], AxiosError>({
      queryKey: ['allSpecialists'],
      queryFn: async () => {
         const token = JSON.parse(localStorage.getItem('accessToken') || 'null');
         if (!token) {
            throw new Error('Token отсутствует.');
         }
         const response = await api.get<Specialist[]>('specialist', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         return response.data;
      },
   });
};
