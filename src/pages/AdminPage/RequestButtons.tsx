import { queryClient } from '@/shared/api/query-client';
import { useGetAllSpectialist } from '@/shared/hooks/useGetAllSpectialist';
import { useUpdateSpecialist } from '@/shared/hooks/useUpdateSpecialist';
import { IRequest, Specialist } from '@/shared/types/types';
import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { Axios } from 'axios';
import { Check } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface RequestsButtonsProps {
   request: IRequest;
}

const FormSchema = z.object({
   status: z.string(),
   plannedDayOfWeek: z.string(),
   specialistId: z.string().min(1, { message: 'Назначьте специалиста' }),
});

export const RequestsButtons = ({ request }: RequestsButtonsProps) => {
   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         status: request.status || '',
         plannedDayOfWeek: request.plannedDayOfWeek || '',
         specialistId: request.specialist ? `${request.specialist.username} ${request.specialist.id}` : '',
      },
   });

   const { data: specialists, isPending } = useGetAllSpectialist();
   const updateSpecialistMutation = useUpdateSpecialist();

   const [selectedDay, setSelectedDay] = useState<string>(request.plannedDayOfWeek || '');

   type DayOfWeek = keyof Specialist['schedule'];

   const filteredSpecialists = useMemo(() => {
      if (!specialists || !selectedDay) return specialists;

      const day = selectedDay as DayOfWeek;

      return specialists.filter((specialist) => {
         return specialist.schedule[day];
      });
   }, [selectedDay, specialists]);

   const onSubmit = async (values: z.infer<typeof FormSchema>) => {
      const { specialistId, status, plannedDayOfWeek } = values;

      const extractedSpecialistId = parseInt(specialistId.split(' ').pop() || '0', 10);

      try {
         await updateSpecialistMutation.mutateAsync({
            status,
            plannedDayOfWeek,
            specialistId: extractedSpecialistId,
            requestId: request.id,
         });
      } catch (error) {
         if (axios.isAxiosError(error)) {
            if (error.response?.status === 400) {
               form.setError('specialistId', {
                  type: 'manual',
                  message: 'Специалист не может работать в этот день',
               });
            }
         } else {
            console.error('Unexpected error:', error);
         }
      }
   };

   return (
      <>
         {isPending ? (
            <div>Загрузка</div>
         ) : (
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className='relative flex items-start gap-2'>
                  <FormField
                     name='status'
                     control={form.control}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Статус заявки</FormLabel>
                           <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                 <FormControl>
                                    <SelectTrigger className='w-[180px] bg-blue-500 font-medium text-white'>
                                       <SelectValue placeholder='Выберите статус' />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    <SelectItem value='На рассмотрении' className='hover:bg-blue-200'>
                                       На рассмотрении
                                    </SelectItem>
                                    <SelectItem value='Принята' className='hover:bg-blue-200'>
                                       Принята
                                    </SelectItem>
                                    <SelectItem value='Отклонена' className='hover:bg-blue-200'>
                                       Отклонена
                                    </SelectItem>
                                    <SelectItem value='В процессе' className='hover:bg-blue-200'>
                                       В процессе
                                    </SelectItem>
                                    <SelectItem value='Выполнена' className='hover:bg-blue-200'>
                                       Выполнено
                                    </SelectItem>
                                 </SelectContent>
                              </Select>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     name='plannedDayOfWeek'
                     control={form.control}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>День недели выполнения</FormLabel>
                           <FormControl>
                              <Select
                                 onValueChange={(value) => {
                                    field.onChange(value);
                                    setSelectedDay(value);
                                 }}
                                 defaultValue={field.value}
                              >
                                 <SelectTrigger className='w-[200px] bg-blue-500 font-medium text-white'>
                                    <SelectValue placeholder='Выберите день' />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value='monday'>Понедельник</SelectItem>
                                    <SelectItem value='tuesday'>Вторник</SelectItem>
                                    <SelectItem value='wednesday'>Среда</SelectItem>
                                    <SelectItem value='thursday'>Четверг</SelectItem>
                                    <SelectItem value='friday'>Пятница</SelectItem>
                                 </SelectContent>
                              </Select>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     name='specialistId'
                     control={form.control}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Специалист для заявки</FormLabel>
                           <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                 <SelectTrigger className='w-[350px] bg-blue-500 font-medium text-white'>
                                    <SelectValue placeholder='Выберите специалиста' />
                                 </SelectTrigger>
                                 <SelectContent>
                                    {filteredSpecialists && filteredSpecialists.length > 0 ? (
                                       filteredSpecialists.map((specialist) => (
                                          <SelectItem key={specialist.id} value={`${specialist.username} ${specialist.id}`}>
                                             {specialist.username}
                                          </SelectItem>
                                       ))
                                    ) : (
                                       <div className='p-2 text-center text-gray-400'>
                                          Нет специалистов, работающих в этот день
                                       </div>
                                    )}
                                 </SelectContent>
                              </Select>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <div className='absolute bottom-1 right-3'>
                     <Button variant='ghost' className='border-2 border-[#14AE5C] bg-[#dcf3e6]'>
                        Сохранить параметры
                     </Button>
                  </div>
               </form>
            </Form>
         )}
      </>
   );
};
