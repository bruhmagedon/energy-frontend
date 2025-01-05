import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '../api/axios-instance';
import { useAuthStore } from '../store/useAuthStore';

interface LoginCredentials {
   email: string;
   password: string;
}

interface AuthResponse {
   accessToken: string;
}

const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
   const response = await api.post<AuthResponse>('auth/login', credentials);
   return response.data;
};

export const useLogin = () => {
   const setAuth = useAuthStore((state) => state.setAuth);

   return useMutation<AuthResponse, AxiosError, LoginCredentials>({
      mutationFn: login,
      onSuccess: (data) => {
         try {
            localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
            setAuth(data.accessToken);
         } catch (error) {}
      },
      onError: (error) => {
         console.error('Ошибка при входе в систему:', error);
      },
   });
};
