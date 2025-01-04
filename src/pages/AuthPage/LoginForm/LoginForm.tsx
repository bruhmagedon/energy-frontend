'use client';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { Loader } from '@/shared/ui/loader';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Title } from '@/shared/ui/title';
import { useLogin } from '@/shared/hooks/useLogin';
import { useNavigate } from 'react-router-dom';

export const loginSchema = z.object({
   email: z.string().email({ message: 'Некорректный email' }),
   password: z.string().min(6, { message: 'Пароль должен быть не менее 8 символов' }),
});

export const LoginForm = ({ setActiveForm }: { setActiveForm: (value: 'login' | 'register') => void }) => {
   const { mutate: login, isPending } = useLogin();
   const navigate = useNavigate();

   const [error, setError] = useState<string | null>(null);

   const loginForm = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   });

   const onLoginSubmit = (values: z.infer<typeof loginSchema>) => {
      console.log(values);

      login(
         { email: values.email, password: values.password },
         {
            onSuccess: (data) => {
               setError('');
               navigate('/profile');
               // const { role } = useUserStore.getState().userInfo;
               // switch (role) {
               //    case 'shop':
               //       router.push('/shop');
               //       break;
               //    case 'admin':
               //       router.push('/admin');
               //       break;
               //    case 'factory':
               //       router.push('/factory');
               //       break;
               //    default:
               //       router.push('/');
               // }
            },
            onError: () => {
               setError('Вы ввели неверные данные');
            },
         },
      );
   };

   const redirectToRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setActiveForm('register');
   };

   return (
      <>
         {isPending ? (
            <div className='flex h-60 w-full items-center justify-center'>
               <Loader />
            </div>
         ) : (
            <Form {...loginForm}>
               <form className='w-full min-w-[400px] space-y-4' onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                  <FormLabel className='text-2xl'>Войти в аккаунт</FormLabel>
                  <FormField
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input type='email' placeholder='Введите email' {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                     control={loginForm.control}
                     name='email'
                  />
                  <FormField
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Пароль</FormLabel>
                           <FormControl>
                              <Input type='password' placeholder='Введите пароль' {...field} autoComplete='on' />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                     control={loginForm.control}
                     name='password'
                  />

                  {error && <Title className='text-red-500' text={error || ''} />}
                  <div className='flex flex-col items-center gap-5'>
                     <Button type='submit' className='w-full'>
                        Войти
                     </Button>
                     <Button
                        variant={'secondary'}
                        className='flex w-full items-center justify-between'
                        onClick={(event) => redirectToRegister(event)}
                     >
                        <ArrowRight size={18} className='invisible' />
                        Регистрация
                        <ArrowRight size={18} />
                     </Button>
                  </div>
               </form>
            </Form>
         )}
      </>
   );
};
