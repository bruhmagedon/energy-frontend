import { Button } from '@/shared/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/shared/ui/dialog';
import { cn } from '@/utils/lib/utils';
import { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Checkbox } from '@/shared/ui/checkbox';
import { useAddSpecialist } from '@/shared/hooks/useAddSpecialist';
import { useGetAllSpectialist } from '@/shared/hooks/useGetAllSpectialist';
import { SpecialistCard } from './SpecialistCard';

const FormSchema = z.object({
   username: z.string().min(2, { message: 'Имя должно содержать минимум 2 символа.' }),
   technicianType: z.enum([
      'electricalEngineer',
      'mechanicalTechnician',
      'softwareEngineer',
      'bladeCompositeTechnician',
      'universalEngineer',
   ]),
   schedule: z.object({
      monday: z.boolean(),
      tuesday: z.boolean(),
      wednesday: z.boolean(),
      thursday: z.boolean(),
      friday: z.boolean(),
   }),
});

export const SpecialistsDialog = () => {
   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         username: '',
         technicianType: 'electricalEngineer',
         schedule: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
         },
      },
   });

   const [isOpen, setIsOpen] = useState(false);

   const { mutate: addSpecialist } = useAddSpecialist();
   const { data: specialists, isPending } = useGetAllSpectialist();

   function onSubmit(data: z.infer<typeof FormSchema>) {
      addSpecialist(data);
      form.reset();
   }

   const daysOfWeek = [
      { label: 'Понедельник', shortName: 'Пн', name: 'schedule.monday' },
      { label: 'Вторник', shortName: 'Вт', name: 'schedule.tuesday' },
      { label: 'Среда', shortName: 'Ср', name: 'schedule.wednesday' },
      { label: 'Четверг', shortName: 'Чт', name: 'schedule.thursday' },
      { label: 'Пятница', shortName: 'Пт', name: 'schedule.friday' },
   ];

   return (
      <div className={cn('')}>
         <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className='absolute right-6 top-6 rounded-md border border-border bg-white p-2 text-sm font-medium text-black hover:opacity-80'>
               Панель специалистов
            </DialogTrigger>
            <DialogContent className='min-w-[900px] bg-white px-6'>
               <DialogHeader>
                  <DialogTitle className='mb-4'>Панель специалистов</DialogTitle>
                  <DialogDescription className='text-base'>Добавление специалиста</DialogDescription>
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className='flex items-end gap-2 rounded-lg bg-gray-200 p-4'>
                        <FormField
                           control={form.control}
                           name='username'
                           render={({ field }) => (
                              <FormItem className='flex-1'>
                                 <FormLabel>ФИО Специалиста</FormLabel>
                                 <FormControl>
                                    <Input placeholder='Введите ФИО' {...field} className='bg-white' />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name='technicianType'
                           render={({ field }) => (
                              <FormItem className='min-w-[210px]'>
                                 <FormLabel>Тип специалиста</FormLabel>
                                 <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                       <SelectTrigger className='bg-white'>
                                          <SelectValue placeholder='Выберите тип специалиста' />
                                       </SelectTrigger>
                                       <SelectContent>
                                          <SelectItem className='hover:bg-blue-200' value='electricalEngineer'>
                                             Электроинженер
                                          </SelectItem>
                                          <SelectItem className='hover:bg-blue-200' value='mechanicalTechnician'>
                                             Механик
                                          </SelectItem>
                                          <SelectItem className='hover:bg-blue-200' value='softwareEngineer'>
                                             Программист
                                          </SelectItem>
                                          <SelectItem className='hover:bg-blue-200' value='bladeCompositeTechnician'>
                                             Техник по лопастям
                                          </SelectItem>
                                          <SelectItem className='hover:bg-blue-200' value='universalEngineer'>
                                             Универсальный инженер
                                          </SelectItem>
                                       </SelectContent>
                                    </Select>
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <FormField
                           name='schedule'
                           control={form.control}
                           render={() => (
                              <div className='flex flex-col gap-3'>
                                 <FormLabel>Дни работы специалиста</FormLabel>
                                 <div className='flex gap-2'>
                                    {daysOfWeek.map((day) => (
                                       <FormField
                                          key={day.name}
                                          name={day.name as any}
                                          control={form.control}
                                          render={({ field }) => (
                                             <FormItem className='flex items-center space-x-3'>
                                                <FormControl>
                                                   <Checkbox
                                                      label={day.shortName}
                                                      checked={field.value}
                                                      onCheckedChange={(checked) => field.onChange(checked)}
                                                   />
                                                </FormControl>
                                             </FormItem>
                                          )}
                                       />
                                    ))}
                                 </div>
                              </div>
                           )}
                        />
                        <Button type='submit'>Добавить</Button>
                     </form>
                  </Form>
               </DialogHeader>
               <DialogDescription className='text-base'>Список специалистов в системе</DialogDescription>
               <div className='flex h-[500px] flex-col gap-2 overflow-y-auto'>
                  {isPending && <p>Загрузка специалистов</p>}
                  {specialists && specialists!.map((specialist, index) => <SpecialistCard key={index} specialist={specialist} />)}
               </div>
               <DialogFooter className='max-w-[1298px] rounded-b-lg border-t border-border bg-background p-6'>
                  <DialogClose asChild>
                     <Button type='button' variant='secondary'>
                        Закрыть панель
                     </Button>
                  </DialogClose>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </div>
   );
};
