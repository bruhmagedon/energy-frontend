import { Button } from '@/shared/ui/button';
import { Link } from 'react-router-dom';

export const Header = () => {
   return (
      <header className='bg-blue-600 py-4 text-white'>
         <div className='container mx-auto text-center'>
            <h1 className='text-3xl font-bold'>ENERGY</h1>
            <p className='mt-2'>Компания №1 по диагностике и ремонту ветрогенераторов</p>
            <nav className='mt-4'>
               <div className='flex justify-center space-x-6'>
                  <Link to='/' className='hover:underline'>
                     О нас
                  </Link>
                  <Link to='/service' className='hover:underline'>
                     Услуги
                  </Link>
                  <Link to='/contact' className='hover:underline'>
                     Контакты
                  </Link>
                  <Link to='/profile' className='hover:underline'>
                     Мой профиль
                  </Link>
               </div>
            </nav>
         </div>
      </header>
   );
};
