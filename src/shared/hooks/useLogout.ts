import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '../api/axios-instance';
import { useAuthStore } from '../store/useAuthStore';

interface LogoutResponse {
   message: string;
}

const logout = async (): Promise<LogoutResponse> => {
   const token = JSON.parse(localStorage.getItem('accessToken') || 'null');
   if (!token) {
      throw new Error('Token отсутствует.');
   }

   const response = await api.post<LogoutResponse>('auth/logout', null, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });

   return response.data;
};

export const useLogout = () => {
   const clearAuth = useAuthStore((state) => state.clearAuth);

   return useMutation<LogoutResponse, AxiosError>({
      mutationFn: logout,
      onSuccess: () => {
         try {
            localStorage.removeItem('accessToken');
            clearAuth();
            console.log('Вы успешно вышли из системы.');
         } catch (error) {
            console.error('Ошибка при удалении токена:', error);
         }
      },
      onError: (error) => {
         console.error('Ошибка при выходе из системы:', error);
      },
   });
};
