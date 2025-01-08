import { Button } from '@/shared/ui/button';
import { InfoRow } from '@/components/inforow';
import { AlarmClock, CalendarDays, CircleCheck, Clock, Copy, Loader, MapPinCheckInside, Siren, XCircle } from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';
import { RequestsButtons } from '../AdminPage/RequestButtons';
import { IRequest, RequestStatus, Specialist, UrgencyStatus } from '@/shared/types/types';
import React, { useState } from 'react';
import { useGetAllSpectialist } from '@/shared/hooks/useGetAllSpectialist';
import { queryClient } from '@/shared/api/query-client';

interface StatusBadge {
   label: string;
   styles: string;
   Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const URGENCY_STYLES: Record<UrgencyStatus, StatusBadge> = {
   [UrgencyStatus.NotCritical]: {
      label: 'Не критично',
      styles: 'bg-[#eaf4ff] border-[#7fbfff] text-[#0057d8]', // Мягкий синий для спокойного статуса
      Icon: CalendarDays, // Иконка календаря для планируемого действия
   },
   [UrgencyStatus.AsSoonAsPossible]: {
      label: 'Как можно скорее',
      styles: 'bg-[#fffbe6] border-[#facc15] text-[#854d0e]', // Жёлтый для повышенного внимания
      Icon: AlarmClock, // Иконка будильника для срочного статуса
   },
   [UrgencyStatus.Urgent]: {
      label: 'Экстренно',
      styles: 'bg-[#ffeaf0] border-[#f87171] text-[#9f1239]', // Красный для критического статуса
      Icon: Siren, // Иконка колокольчика для экстренных уведомлений
   },
};

const STATUS_STYLES: Record<RequestStatus, StatusBadge> = {
   [RequestStatus.Pending]: {
      label: 'На рассмотрении',
      styles: 'bg-[#eaf4ff] border-[#7fbfff] text-[#0057d8]',
      Icon: Clock, // Иконка часов для статуса ожидания
   },
   [RequestStatus.Accepted]: {
      label: 'Принята',
      styles: 'bg-[#eafdf5] border-[#4ade80] text-[#057a55]',
      Icon: MapPinCheckInside, // Иконка галочки для принятого статуса
   },
   [RequestStatus.Rejected]: {
      label: 'Отклонена',
      styles: 'bg-[#ffeaf0] border-[#f87171] text-[#9f1239]',
      Icon: XCircle, // Иконка крестика для отклонённого статуса
   },
   [RequestStatus.InProgress]: {
      label: 'В процессе',
      styles: 'bg-[#fffbe6] border-[#facc15] text-[#854d0e]',
      Icon: Loader, // Иконка загрузки для статуса в процессе
   },
   [RequestStatus.Completed]: {
      label: 'Выполнено',
      styles: 'bg-[#e8fcef] border-[#22c55e] text-[#14532d]',
      Icon: CircleCheck, // Иконка флага для завершённого статуса
   },
};

export const Topic = {
   diagnostics: 'Диагностика',
   repair: 'Ремонт',
   maintenance: 'Обслуживание',
   installation: 'Установка',
   upgrade: 'Обновление',
   other: 'Другое',
} as const;

export type Topic = keyof typeof Topic;

export const RequiestCard = ({ isAdmin = false, request }: { isAdmin?: boolean; request: IRequest }) => {
   const statusData = STATUS_STYLES[request.status];
   const urgentData = URGENCY_STYLES[request.urgency];

   return (
      <div className='flex flex-1 flex-col justify-center gap-3 rounded-lg bg-white px-4 py-3 shadow'>
         {' '}
         <div className='flex flex-1 flex-col gap-3'>
            {isAdmin && (
               <div className='flex items-center gap-1 text-base font-medium text-black'>
                  <p>Заявка </p>
                  <p className='text-black'>№{request.id}</p>
                  <Button variant='ghost' size='icon' onClick={() => navigator.clipboard.writeText('124124')}>
                     <Copy size={18} />
                  </Button>
               </div>
            )}
            <InfoRow label='Тема заявки: ' value={Topic[request.topic] || 'Другое'} />
            <InfoRow label='Тип и модель ветрогенератора: ' value={request.model} />
         </div>
         <div className='flex items-center'>
            <div className='flex gap-2'>
               <StatusBadge label={urgentData.label} Icon={urgentData.Icon} className={urgentData.styles} />
               <StatusBadge label={statusData.label} Icon={statusData.Icon} className={statusData.styles} />
            </div>
         </div>
         
         <div className='flex gap-2'>
            <div className='flex w-fit flex-col justify-center gap-2 rounded-lg border border-border bg-gray-100 p-4 text-base'>
               <InfoRow label='Email:' value={request.user.email || 'Не указано'} />
               <InfoRow label='Имя:' value={request.user.username || 'Не указано'} />
            </div>
            <div className='flex w-fit flex-col justify-center gap-2 rounded-lg border border-border bg-gray-100 p-4 text-base'>
               <InfoRow label='Телефон:' value={request.city || 'Не указано'} />
               <InfoRow label='Город:' value={request.phoneNumber || 'Не указано'} />
            </div>
            <div className='flex w-fit flex-col justify-center gap-2 rounded-lg border border-border bg-gray-100 p-4'>
               <InfoRow label='Кол. во ветрогенераторов:' value={request.windTurbineCount || 'Не указано'} />
               <InfoRow label='Мощность генератора:' value={request.power ? `${request.power}` : 'Не указано'} />
            </div>
            <div className='flex w-fit flex-col justify-center gap-2 rounded-lg border border-border bg-gray-100 p-4'>
               <InfoRow label='Год установки:' value={request.installationYear || 'Не указано'} />
               <InfoRow label='Последнее обслуживание:' value={request.serviceDate || 'Не указано'} />
            </div>
            <div className='flex w-fit flex-col justify-center gap-2 rounded-lg border border-border bg-gray-100 p-4'>
               <InfoRow label='Площадь объекта:' value={request.area ? `${request.area} м²` : 'Не указано'} />
               <InfoRow label='Рельеф местности:' value={request.terrain || 'Не указано'} />
            </div>
         </div>
         <div className='flex flex-col justify-center gap-2 rounded-lg border border-border bg-gray-100 p-4'>
            <InfoRow label='Описание проблемы:' value={request.message || 'Описание отсутствует'} />
         </div>
         {isAdmin && request && <RequestsButtons request={request} />}
      </div>
   );
};
