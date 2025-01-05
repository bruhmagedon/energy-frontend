import { Button } from '@/shared/ui/button';
import * as jwtDecode from 'jwt-decode';
import { cn } from '@/utils/lib/utils';
import { useNavigate } from 'react-router-dom';
import { RequestDialog } from './RequestDialog';
import { useEffect, useState } from 'react';
import { useLogout } from '@/shared/hooks/useLogout';
import { useAuthStore } from '@/shared/store/useAuthStore';
import { useGetUserRequest } from '@/shared/hooks/useGetRequest';
import { RequiestCard } from './RequiestCard';
import { DecodedToken } from '@/shared/types/types';

export const ProfilePage = () => {
   const [isAdmin, setIsAdmin] = useState(false);
   const { isAuth, initializeAuth, accessToken } = useAuthStore();
   const { mutate: logout, isPending } = useLogout();
   const navigate = useNavigate();

   const { data: requests, isPending: isRequestsPending } = useGetUserRequest();

   useEffect(() => {
      initializeAuth();
   }, [initializeAuth]);

   useEffect(() => {
      if (accessToken) {
         const decoded: DecodedToken = jwtDecode.jwtDecode(accessToken);
         setIsAdmin(decoded.role === 'admin');
      }
   }, [accessToken]);

   const onRedirectToAuth = () => {
      navigate('/auth');
   };

   const handleLogout = () => {
      logout();
   };

   if (!isAuth) {
      return (
         <section className='flex h-full flex-col items-center justify-center gap-5'>
            <span className='font-medium'>Вы не авторизованы в системе</span>
            <Button onClick={onRedirectToAuth}>Войти в аккаунт</Button>
         </section>
      );
   }

   if (isAdmin) {
      return (
         <section className='flex h-full flex-col items-center justify-center gap-5'>
            <span className='font-medium'>Вы авторизовались под ролью администратор</span>
            <Button onClick={() => navigate('/admin')}>Перейти в админ-панель</Button>
            <Button onClick={handleLogout} disabled={isPending} className='w-[186px]'>
               {isPending ? 'Выход...' : 'Выйти из аккаунта'}
            </Button>
         </section>
      );
   }

   return (
      <section className='flex h-full flex-col items-center justify-center gap-6 p-6'>
         <div className='flex min-w-[1270px] items-center justify-between'>
            <RequestDialog />
            <span className='text-2xl font-semibold'>Мои заявки</span>
            <Button onClick={handleLogout} disabled={isPending}>
               {isPending ? 'Выход...' : 'Выйти из аккаунта'}
            </Button>
         </div>

         {isRequestsPending && <p>Loading...</p>}
         {!isRequestsPending && (
            <div
               className={cn(
                  'flex h-full min-w-[1200px] justify-center overflow-auto rounded-lg bg-gray-300',
                  requests!.length <= 0 ? 'items-center' : 'items-start',
               )}
            >
               {requests!.length <= 0 ? (
                  <p className='text-2xl'>У вас нет заявок</p>
               ) : (
                  <div className='flex w-full flex-col gap-2 p-6'>
                     {requests!.map((request) => (
                        <RequiestCard key={request.id} request={request} />
                     ))}
                  </div>
               )}
            </div>
         )}
      </section>
   );
};
