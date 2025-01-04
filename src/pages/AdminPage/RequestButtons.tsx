import { Button } from '@/shared/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Check } from 'lucide-react';

export const RequestsButtons = () => {
   return (
      <div className='flex items-end gap-2'>
         <div className='flex flex-col gap-1'>
            <label className='font-medium'>Статус заявки</label>
            <Select>
               <SelectTrigger className='w-[180px] bg-blue-500 font-medium text-white'>
                  <SelectValue placeholder='Выбрать статус' />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value='pending'>На рассмотрении</SelectItem>
                  <SelectItem value='accepted'>Принята</SelectItem>
                  <SelectItem value='rejected'>Отклонена</SelectItem>
                  <SelectItem value='inProgress'>В процессе</SelectItem>
                  <SelectItem value='completed'>Выполнена</SelectItem>
               </SelectContent>
            </Select>
         </div>
         <div className='flex flex-col gap-1'>
            <label className='font-medium'>Специалист для заявки</label>
            <Select>
               <SelectTrigger className='w-[350px] bg-blue-500 font-medium text-white'>
                  <SelectValue placeholder='Выбрать специалиста' />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value='1'>А.В. Смирнов (ремонт)</SelectItem>
                  <SelectItem value='2'>И.Н. Петров (ремонт)</SelectItem>
                  <SelectItem value='3'>К.Д. Иванов (обслуживание)</SelectItem>
                  <SelectItem value='4'>М.С. Кузнецов (по и системы управления)</SelectItem>
                  <SelectItem value='5'>Т.В. Соколов (композитные материалы)</SelectItem>
                  <SelectItem value='5'>И.Б. Молосов (универсальный)</SelectItem>
               </SelectContent>
            </Select>
         </div>
         <div className='flex flex-col gap-1'>
            <label className='font-medium'>День недели выполнения</label>
            <Select>
               <SelectTrigger className='w-[200px] bg-blue-500 font-medium text-white'>
                  <SelectValue placeholder='Выбрать день недели' />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value='1'>Понедельник</SelectItem>
                  <SelectItem value='2'>Вторник</SelectItem>
                  <SelectItem value='3'>Среда</SelectItem>
                  <SelectItem value='4'>Четверг</SelectItem>
                  <SelectItem value='5'>Пятница</SelectItem>
               </SelectContent>
            </Select>
         </div>
         <Button variant='ghost' className='border-2 border-[#14AE5C] bg-[#dcf3e6]'>
            Сохранить параметры
         </Button>
      </div>
   );
};
