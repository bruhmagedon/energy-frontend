'use client';
import { createContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RegisterForm } from './LoginForm/RegisterForm';
import { LoginForm } from './LoginForm/LoginForm';

export const AuthPage = () => {
   const [activeForm, setActiveForm] = useState<'login' | 'register'>('login');

   return (
      <section className='flex h-full justify-center'>
         <div className='flex min-w-[800px] justify-center p-20'>
            <AnimatePresence mode='wait'>
               {activeForm === 'register' && (
                  <motion.div
                     key='user'
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     transition={{ duration: 0.2 }}
                  >
                     <RegisterForm setActiveForm={setActiveForm} />
                  </motion.div>
               )}
               {activeForm === 'login' && (
                  <motion.div
                     key='client'
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     transition={{ duration: 0.2 }}
                  >
                     <LoginForm setActiveForm={setActiveForm} />
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </section>
   );
};
