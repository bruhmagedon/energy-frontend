import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '../api/axios-instance';
import { useAuthStore } from '../store/useAuthStore';

interface RegisterCredentials {
   email: string;
   username: string;
   password: string;
}

interface RegisterError {
   message: string;
   error: string;
   status: number;
}

interface AuthResponse {
   accessToken: string;
}

const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
   const response = await api.post<AuthResponse>('auth/register', credentials);
   return response.data;
};

export const useRegister = () => {
   const setAuth = useAuthStore((state) => state.setAuth);

   return useMutation<AuthResponse, RegisterError, RegisterCredentials>({
      mutationFn: register,
      onSuccess: (data) => {
         try {
            localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
            setAuth(data.accessToken);
         } catch (error) {
            console.log(error);
         }
      },
      onError: (error) => {
         console.error('Ошибка при регистрации:', error.message);
      },
   });
};
