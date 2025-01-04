import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '../api/axios-instance';

interface LoginCredentials {
   email: string;
   password: string;
}

interface AuthResponse {
   accessToken: string;
}

const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
   const response = await api.post<AuthResponse>('auth/login', {
      ...credentials,
   });

   return response.data;
};

export const useLogin = () => {
   return useMutation<AuthResponse, AxiosError, LoginCredentials>({
      mutationFn: login,
      onSuccess: (data) => {
         try {
            console.log(data);
         } catch (error) {}
      },
      onError: (error) => {
         console.error('Ошибка при входе в систему:', error);
      },
   });
};
