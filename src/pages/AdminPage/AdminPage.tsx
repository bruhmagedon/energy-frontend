import { Button } from '@/shared/ui/button';
import { RequestsPanel } from './RequestsPanel';
import { useNavigate } from 'react-router-dom';
import { Arrow } from '@radix-ui/react-select';
import { ArrowLeft } from 'lucide-react';
import { SpecialistsDialog } from './SpecialistsDialog';
import { useGetAllRequests } from '@/shared/hooks/useGetAllRequests';
import { RequiestCard } from '../ProfilePage/RequiestCard';
import { cn } from '@/utils/lib/utils';
import { Loader } from '@/shared/ui/loader';

export const AdmingPage = () => {
   const navigate = useNavigate();

   const { data: requests, isPending } = useGetAllRequests();

   const onRedirectToMain = () => {
      navigate('/');
   };

   return (
      <div className='flex min-h-screen flex-col bg-background'>
         <header className='flex h-24 items-center justify-center rounded-b-3xl bg-blue-500 text-2xl text-white'>
            <Button variant='secondary' className='absolute left-6 top-6' onClick={onRedirectToMain}>
               <ArrowLeft size={18} className='mr-2' />
               Вернуться на главную
            </Button>
            Energy | Панель администратора
            <SpecialistsDialog />
         </header>
         <main className='flex-1'>
            <h1 className='mb-4 mt-4 text-center text-2xl font-medium'>Список заявок всех клиентов</h1>
            {isPending ? (
               <div className='flex h-[70vh] w-full items-center justify-center'>
                  <Loader />
               </div>
            ) : (
               <div
                  className={cn(
                     'flex h-full min-w-[1200px] justify-center overflow-auto rounded-lg bg-gray-300',
                     requests!.length <= 0 ? 'items-center' : 'items-start',
                  )}
               >
                  {requests!.length <= 0 ? (
                     <div className='text-2xl'>Нет ни одной заявки в системе</div>
                  ) : (
                     <div className='flex w-full flex-col gap-6 p-6'>
                        {requests!.map((request) => (
                           <RequiestCard key={request.id} request={request} isAdmin />
                        ))}
                     </div>
                  )}
               </div>
            )}
         </main>
      </div>
   );
};
