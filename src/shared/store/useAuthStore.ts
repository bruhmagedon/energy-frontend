import { create } from 'zustand';

interface AuthState {
   isAuth: boolean;
   accessToken: string | null;
   setAuth: (accessToken: string) => void;
   clearAuth: () => void;
   initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
   isAuth: false,
   accessToken: null,
   setAuth: (accessToken) => set({ isAuth: true, accessToken }),
   clearAuth: () => set({ isAuth: false, accessToken: null }),
   initializeAuth: () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
         set({ isAuth: true, accessToken: token });
      }
   },
}));
