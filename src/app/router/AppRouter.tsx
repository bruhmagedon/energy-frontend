import { createBrowserRouter } from 'react-router-dom';

import BaseLayout from '@/app/layout/BaseLayout';
import { MainPage } from '@/pages/MainPage/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { ErrorPage } from '@/pages/ErrorPage/ErrorPage';
import { ServicePage } from '@/pages/ServicePage/ServicePage';
import { ContactPage } from '@/pages/ContactPage.tsx/ContactPage';
import { ProfilePage } from '@/pages/ProfilePage/ProfilePage';
import { AuthPage } from '@/pages/AuthPage/AuthPage';
import { AdmingPage } from '@/pages/AdminPage/AdminPage';

export const appRouter = createBrowserRouter(
   [
      {
         element: <BaseLayout />,
         children: [
            { element: <MainPage />, path: '/' },
            { element: <ServicePage />, path: '/service' },
            { element: <ContactPage />, path: '/contact' },
            { element: <ProfilePage />, path: '/profile' },
            { element: <AuthPage />, path: '/auth' },
            { element: <NotFoundPage />, path: '*' },
         ],
         errorElement: <ErrorPage />,
      },
      {
         element: <AdmingPage />,
         path: '/admin',
      },
   ],
   {
      future: {
         v7_relativeSplatPath: true,
         v7_fetcherPersist: true,
         v7_normalizeFormMethod: true,
         v7_partialHydration: true,
         v7_skipActionErrorRevalidation: true,
      },
   },
);
