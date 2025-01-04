import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

export const loginSchema = z.object({
   username: z.string().email({ message: 'Некорректный email' }),
   password: z.string().min(6, { message: 'Пароль должен быть не менее 8 символов' }),
   role: z.string().min(1, { message: 'Выберите роль' }),
});

interface RegisterUserFormProps {
   setActiveForm: (value: 'login' | 'register') => void;
}

export const RegisterForm = ({ setActiveForm }: RegisterUserFormProps) => {
   //   const { userForm, saveFormHandler } = useContext(FormContext);

   const loginForm = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         username: '',
         password: '',
      },
   });

   const onRegisterSubmit = (values: z.infer<typeof loginSchema>) => {
      // saveFormHandler("user", values);
      setActiveForm('register');
   };

   return (
      <>
         <Form {...loginForm}>
            <form className='w-full min-w-[400px] space-y-4' onSubmit={loginForm.handleSubmit(onRegisterSubmit)}>
               <FormLabel className='text-2xl'>Регистрация пользователя</FormLabel>
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
                  name='username'
               />
               <FormField
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Пароль</FormLabel>
                        <FormControl>
                           <Input type='password' placeholder='Введите пароль' autoComplete='on' {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
                  control={loginForm.control}
                  name='password'
               />
               <FormField
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Подтвердите пароль</FormLabel>
                        <FormControl>
                           <Input type='password' placeholder='Подтвердите пароль' {...field} autoComplete='on' />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
                  control={loginForm.control}
                  name='password'
               />
               <div className='flex flex-col items-center gap-5'>
                  <Button
                     type='submit'
                     className='w-full'
                     // onClick={onAuth}
                  >
                     Зарегистрироваться
                  </Button>
                  <Button variant='secondary' type='submit' className='w-full' onClick={() => setActiveForm('login')}>
                     <div className='flex gap-4'>
                        <ArrowLeft size={18} className='ml-auto' />
                        Войти в аккаунт
                     </div>
                  </Button>
               </div>
            </form>
         </Form>
      </>
   );
};
