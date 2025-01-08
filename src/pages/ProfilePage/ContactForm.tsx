import { useForm } from 'react-hook-form';
import { contactFormSchema } from './contactFormSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';
import { useCreateRequest } from '@/shared/hooks/useCreateRequest';

type ContactFormValues = z.infer<typeof contactFormSchema>;

export const ContactForm = ({ handleClose }: { handleClose: () => void }) => {
   const form = useForm<ContactFormValues>({
      resolver: zodResolver(contactFormSchema),
      defaultValues: {
         clientName: '',
         topic: undefined,
         urgency: undefined,
         windTurbineCount: '',
         power: '',
         model: '',
         installationYear: '',
         serviceDate: '',
         area: '',
         terrain: '',
         message: '',   
         city: '',
         phoneNumber: '',
      },
   });

   const { mutate: createRequest, isPending: isLoading } = useCreateRequest();

   const onSubmit = (values: ContactFormValues) => {
      console.log(values);
      
      createRequest(values, {
         onSuccess: () => {
            console.log('Заявка отправлена:', values);
            handleClose();
         },
         onError: (error) => {
            console.error('Ошибка при создании заявки:', error);
         },
      });
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-6 space-y-4 px-6'>
            <div className='flex w-1/2 flex-col gap-3'>
               {/* Имя клиента */}
               <FormField
                  name='clientName'
                  control={form.control}
                  render={({ field }) => (
                     <FormItem className='hidden'>
                        <FormLabel>Имя клиента</FormLabel>
                        <FormControl>
                           <Input placeholder='Введите ваше имя' {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               {/* Тема */}
               <FormField
                  name='topic'
                  control={form.control}
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Тема</FormLabel>
                        <FormControl>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                 <SelectTrigger className='h-9'>
                                    <SelectValue placeholder='Выберите тему' />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 <SelectItem value='diagnostics' className='hover:bg-blue-200'>
                                    Диагностика
                                 </SelectItem>
                                 <SelectItem value='repair' className='hover:bg-blue-200'>
                                    Ремонт
                                 </SelectItem>
                                 <SelectItem value='maintenance' className='hover:bg-blue-200'>
                                    Обслуживание
                                 </SelectItem>
                                 <SelectItem value='installation' className='hover:bg-blue-200'>
                                    Установка
                                 </SelectItem>
                                 <SelectItem value='upgrade' className='hover:bg-blue-200'>
                                    Обновление
                                 </SelectItem>
                                 <SelectItem value='other' className='hover:bg-blue-200'>
                                    Другое
                                 </SelectItem>
                              </SelectContent>
                           </Select>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               {/* Срочность */}
               <FormField
                  name='urgency'
                  control={form.control}
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Срочность</FormLabel>
                        <FormControl>
                           <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                 <FormControl>
                                    <SelectTrigger className='h-9'>
                                       <SelectValue placeholder='Выберите срочность' />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    <SelectItem value='Не критично' className='hover:bg-blue-200'>
                                       Не критично
                                    </SelectItem>
                                    <SelectItem value='Как можно скорее' className='hover:bg-blue-200'>
                                       Как можно скорее
                                    </SelectItem>
                                    <SelectItem value='Экстренно' className='hover:bg-blue-200'>
                                       Экстренно
                                    </SelectItem>
                                 </SelectContent>
                              </Select>
                           </FormControl>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  name='installationYear'
                  control={form.control}
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Год установки</FormLabel>
                        <FormControl>
                           <Input type='text' placeholder='Введите год (например, 2020)' {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  name='serviceDate'
                  control={form.control}
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Дата последнего обслуживания</FormLabel>
                        <FormControl>
                           <Input type='text' placeholder='Введите дату (например, 15.03.2024)' {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
                <FormField
                  name='phoneNumber'
                  control={form.control}
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Номер телефона</FormLabel>
                        <FormControl>
                           <Input type='text' placeholder='Введите номер (например, +7 (912) 345-67-89)' {...field} />
                        </FormControl>
                        <FormDescription>Пример номера телефона: +79123554252.</FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               {/* Подробное описание проблемы */}
               <FormField
                  name='message'
                  control={form.control}
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Подробное описание проблемы</FormLabel>
                        <FormControl>
                           <Textarea placeholder='Опишите проблему' {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div className='flex w-1/2 flex-col gap-3'>
               <FormField
                  name='city'
                  control={form.control}
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Город</FormLabel>
                        <FormControl>
                           <Input type='text' placeholder='Введите адрес' {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               {/* Количество ветрогенераторов */}
               <FormField
                  name='windTurbineCount'
                  control={form.control}
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Количество установленных ветрогенераторов</FormLabel>
                        <FormControl>
                           <Input type='number' placeholder='Введите количество' {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  name='power'
                  control={form.control}
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Мощность каждого ветрогенератора</FormLabel>
                        <FormControl>
                           <Input placeholder='Укажите мощность' {...field} />
                        </FormControl>
                        <FormDescription>Введите мощность в формате: число + единицы (кВт, МВт).</FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  name='model'
                  control={form.control}
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Тип и модель ветрогенератора</FormLabel>
                        <FormControl>
                           <Input placeholder='Введите модель оборудования' {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  name='area'
                  control={form.control}
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Общая площадь объекта (м²)</FormLabel>
                        <FormControl>
                           <Input type='number' placeholder='Введите площадь (м²)' {...field} />
                        </FormControl>

                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  name='terrain'
                  control={form.control}
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Рельеф местности</FormLabel>
                        <FormControl>
                           <Input placeholder='Опишите рельеф местности' {...field} />
                        </FormControl>
                        <FormDescription>Опишите рельеф местности, например: равнина, холмы, горы.</FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>

            {/* Кнопка отправки */}
            <Button type='submit' className='absolute bottom-6 right-[120px]'>
               {isLoading ? 'Отправка...' : 'Отправить'}
            </Button>
         </form>
      </Form>
   );
};
