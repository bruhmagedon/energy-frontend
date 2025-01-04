import { Button } from '@/shared/ui/button';
import { Card, CardHeader, CardTitle } from '@/shared/ui/card';
import { InfoRow } from '@/components/inforow';
import {
   AlarmClock,
   BellRing,
   CalendarDays,
   CheckCircle2,
   CircleCheck,
   CircleX,
   Clock,
   Copy,
   Loader,
   MapPinCheckInside,
   Package,
   PackageCheck,
   PackageX,
   Siren,
   Truck,
   XCircle,
} from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';
import { RequestsButtons } from '../AdminPage/RequestButtons';

interface Request {
   id: string;
   clientName: string;
   theme: string;
}

interface RequestProps {
   request: Request;
}

export enum Urgency {
   NotCritical = 'Не критично',
   AsSoonAsPossible = 'Как можно скорее',
   Urgent = 'Экстренно',
}

const URGENCY_STYLES = {
   [Urgency.NotCritical]: {
      label: 'Не критично',
      styles: 'bg-[#eaf4ff] border-[#7fbfff] text-[#0057d8]', // Мягкий синий для спокойного статуса
      Icon: CalendarDays, // Иконка календаря для планируемого действия
   },
   [Urgency.AsSoonAsPossible]: {
      label: 'Как можно скорее',
      styles: 'bg-[#fffbe6] border-[#facc15] text-[#854d0e]', // Жёлтый для повышенного внимания
      Icon: AlarmClock, // Иконка будильника для срочного статуса
   },
   [Urgency.Urgent]: {
      label: 'Экстренно',
      styles: 'bg-[#ffeaf0] border-[#f87171] text-[#9f1239]', // Красный для критического статуса
      Icon: Siren, // Иконка колокольчика для экстренных уведомлений
   },
};

export enum ApplicationStatus {
   Pending = 'На рассмотрении',
   Accepted = 'Принята',
   Rejected = 'Отклонена',
   InProgress = 'В процессе',
   Completed = 'Выполнена',
}

const STATUS_STYLES = {
   [ApplicationStatus.Pending]: {
      label: 'На рассмотрении',
      styles: 'bg-[#eaf4ff] border-[#7fbfff] text-[#0057d8]',
      Icon: Clock, // Иконка часов для статуса ожидания
   },
   [ApplicationStatus.Accepted]: {
      label: 'Принята',
      styles: 'bg-[#eafdf5] border-[#4ade80] text-[#057a55]',
      Icon: MapPinCheckInside, // Иконка галочки для принятого статуса
   },
   [ApplicationStatus.Rejected]: {
      label: 'Отклонена',
      styles: 'bg-[#ffeaf0] border-[#f87171] text-[#9f1239]',
      Icon: XCircle, // Иконка крестика для отклонённого статуса
   },
   [ApplicationStatus.InProgress]: {
      label: 'В процессе',
      styles: 'bg-[#fffbe6] border-[#facc15] text-[#854d0e]',
      Icon: Loader, // Иконка загрузки для статуса в процессе
   },
   [ApplicationStatus.Completed]: {
      label: 'Выполнена',
      styles: 'bg-[#e8fcef] border-[#22c55e] text-[#14532d]',
      Icon: CircleCheck, // Иконка флага для завершённого статуса
   },
};

export const RequiestCard = ({ isAdmin = false }: { isAdmin?: boolean }) => {
   const statusData = STATUS_STYLES[ApplicationStatus.InProgress];
   const urgentData = URGENCY_STYLES[Urgency.Urgent];

   return (
      <div className='flex flex-1 flex-col justify-center gap-3 rounded-lg bg-white px-4 py-3 shadow'>
         {' '}
         <div className='flex flex-1 flex-col gap-3'>
            <div className='flex items-center gap-1 text-base font-medium text-black'>
               <p>Заявка </p>
               <p className='text-black'>№{125125125}</p>
               <Button variant='ghost' size='icon' onClick={() => navigator.clipboard.writeText('124124')}>
                  <Copy size={18} />
               </Button>
            </div>
            <InfoRow label='Тема заявки: ' value={'Диагностика'} />
            <InfoRow label='Тип и модель ветрогенератора: ' value={'Onshore, Модель: Vestas V112-3.0 MW'} />
         </div>
         <div className='flex items-center'>
            <div className='flex gap-2'>
               <StatusBadge label={urgentData.label} Icon={urgentData.Icon} className={urgentData.styles} />
               <StatusBadge label={statusData.label} Icon={statusData.Icon} className={statusData.styles} />
            </div>
         </div>
         <div className='flex gap-2'>
            <div className='flex w-fit flex-col justify-center gap-2 rounded-lg border border-border bg-gray-100 p-4 text-base'>
               <InfoRow label='Email:' value={'1124124@email.com'} />
               <InfoRow label='Имя:' value={'Максим'} />
            </div>
            <div className='flex w-fit flex-col justify-center gap-2 rounded-lg border border-border bg-gray-100 p-4'>
               <InfoRow label='Кол. во ветрогенераторов:' value={'4'} />
               <InfoRow label='Мощность генератора: ' value={'2.5 МВт'} />
            </div>
            <div className='flex w-fit flex-col justify-center gap-2 rounded-lg border border-border bg-gray-100 p-4'>
               <InfoRow label='Год установки: ' value={'2020'} />
               <InfoRow label='Последнее обслуживание: ' value={'12.12.2022'} />
            </div>
            <div className='flex w-fit flex-col justify-center gap-2 rounded-lg border border-border bg-gray-100 p-4'>
               <InfoRow label='Площаль объекта: ' value={`1500` + ' м2'} />
               <InfoRow label='Рельеф местности: ' value={'Холмистая местность с частичной равнинной зоной'} />
            </div>
         </div>
         <div className='flex flex-col justify-center gap-2 rounded-lg border border-border bg-gray-100 p-4'>
            <InfoRow
               className=''
               label='Описание проблемы: '
               value={
                  'Ветрогенератор внезапно перестал вырабатывать электричество, несмотря на стабильный ветер. Предварительная проверка показала возможную неисправность в системе преобразования энергии или повреждение лопастей.'
               }
            />
         </div>
         {isAdmin && <RequestsButtons />}
      </div>
   );
};
