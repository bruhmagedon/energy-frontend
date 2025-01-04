import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Outlet } from 'react-router-dom';

const BaseLayout = () => {
   return (
      <div className='font-[var(--font-inter] flex h-screen flex-col bg-background'>
         <Header />
         <main className='flex-1'>
            <Outlet />
         </main>
         <Footer />
      </div>
   );
};

export default BaseLayout;
