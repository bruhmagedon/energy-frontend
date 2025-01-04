import { Button } from '@/shared/ui/button';
import { RequestsPanel } from './RequestsPanel';
import { useNavigate } from 'react-router-dom';
import { Arrow } from '@radix-ui/react-select';
import { ArrowLeft } from 'lucide-react';
import { SpecialistsDialog } from './SpecialistsDialog';

export const AdmingPage = () => {
   const navigate = useNavigate();

   const onRedirectToMain = () => {
      navigate('/');
   };

   return (
      <div className='flex h-screen flex-col bg-background'>
         <header className='flex h-24 items-center justify-center rounded-b-3xl bg-blue-500 text-2xl text-white'>
            <Button variant='secondary' className='absolute left-6 top-6' onClick={onRedirectToMain}>
               <ArrowLeft size={18} className='mr-2' />
               Вернуться на главную
            </Button>
            Energy | Панель администратора
            <SpecialistsDialog />
         </header>
         <main className='flex-1'>
            <h1 className='mt-4 text-center text-2xl font-medium'>Список заявок всех клиентов</h1>
            <RequestsPanel />
         </main>
      </div>
   );
};
