import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useRegister } from '@/shared/hooks/useRegister';
import { Loader } from '@/shared/ui/loader';
import { useNavigate } from 'react-router-dom';

export const registerSchema = z.object({
   username: z.string().min(1, { message: 'Введите ваше имя' }),
   email: z.string().email({ message: 'Некорректный email' }).min(1, { message: 'Введите email' }),
   password: z.string().min(5, { message: 'Пароль должен быть не менее 5 символов' }),
   confirmPassword: z.string().min(5, { message: 'Пароль должен быть не менее 5 символов' }),
});

interface RegisterUserFormProps {
   setActiveForm: (value: 'login' | 'register') => void;
}

export const RegisterForm = ({ setActiveForm }: RegisterUserFormProps) => {
   const registerForm = useForm<z.infer<typeof registerSchema>>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
         username: '',
         email: '',
         password: '',
         confirmPassword: '',
      },
   });

   const { control, handleSubmit, setError } = registerForm;

   const { mutate: register, isPending } = useRegister();

   const navigate = useNavigate();

   const onRegisterSubmit = (values: z.infer<typeof registerSchema>) => {
      if (values.password !== values.confirmPassword && values.confirmPassword !== '') {
         setError('confirmPassword', { type: 'dont-match', message: 'Пароли не совпадают' });
      }
      register(values, {
         onSuccess: (data) => {
            navigate('/profile');
         },
      });
   };

   return (
      <>
         {isPending ? (
            <div className='flex h-60 w-full items-center justify-center'>
               <Loader />
            </div>
         ) : (
            <Form {...registerForm}>
               <form className='w-full min-w-[400px] space-y-4' onSubmit={handleSubmit(onRegisterSubmit)}>
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
                     control={control}
                     name='email'
                  />
                  <FormField
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Имя пользователя</FormLabel>
                           <FormControl>
                              <Input type='text' placeholder='Введите ваше имя' {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                     control={control}
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
                     control={control}
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
                     control={control}
                     name='confirmPassword'
                  />

                  <div className='flex flex-col items-center gap-5'>
                     <Button type='submit' className='w-full'>
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
         )}
      </>
   );
};
