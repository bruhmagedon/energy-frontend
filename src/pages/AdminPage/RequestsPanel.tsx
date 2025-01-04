import { Button } from '@/shared/ui/button';
import { cn } from '@/utils/lib/utils';
import { useNavigate } from 'react-router-dom';
import { RequiestCard } from '../ProfilePage/RequiestCard';

export const RequestsPanel = () => {
   const isAuth = true;
   const isClear = false;
   const navigate = useNavigate();

   const onRedirectToAuth = () => {
      navigate('/auth');
   };

   if (!isAuth) {
      return (
         <section className='flex h-full flex-col items-center justify-center gap-5'>
            <span className='font-medium'>Вы не авторизованы в системе</span>
            <Button onClick={onRedirectToAuth}>Войти в аккаунт</Button>
         </section>
      );
   }

   return (
      <section className='flex h-full flex-col items-center justify-center gap-6 p-6'>
         <div
            className={cn(
               'flex h-full min-w-[1200px] justify-center overflow-auto rounded-lg bg-gray-300',
               isClear ? 'items-center' : 'items-start',
            )}
         >
            {isClear ? (
               <p className='text-2xl'>Заявок в базе нет</p>
            ) : (
               <div className='flex w-full flex-col gap-2 p-6'>
                  <RequiestCard isAdmin={true} />
               </div>
            )}
         </div>
      </section>
   );
};
