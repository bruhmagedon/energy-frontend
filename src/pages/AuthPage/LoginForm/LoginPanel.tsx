'use client';
import { createContext, useEffect, useState } from 'react';
import { LoginForm } from './LoginForm';
import { motion, AnimatePresence } from 'framer-motion';
import { RegisterForm } from './RegisterForm';

interface RegistrationForm {
   user: {
      username: string;
      password: string;
   };
}

const baseForm: RegistrationForm = {
   user: {
      username: '',
      password: '',
   },
};

export const RegisterPanel = () => {
   const [activeForm, setActiveForm] = useState<'login' | 'register'>('login');

   return (
      <div className='relative w-full'>
         <AnimatePresence mode='wait'>
            {activeForm === 'login' && (
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
            {activeForm === 'register' && (
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
   );
};
