import { useDeleteSpecialist } from '@/shared/hooks/useDeleteSpectiast';
import { Specialist } from '@/shared/types/types';
import { Button } from '@/shared/ui/button';
import { BookUser, Pickaxe, Ruler, Trash, User } from 'lucide-react';

const technicianTypeMap: Record<
   'electricalEngineer' | 'mechanicalTechnician' | 'softwareEngineer' | 'bladeCompositeTechnician' | 'universalEngineer',
   string
> = {
   electricalEngineer: 'Электроинженер',
   mechanicalTechnician: 'Механик',
   softwareEngineer: 'Программист',
   bladeCompositeTechnician: 'Техник по лопастям',
   universalEngineer: 'Универсальный инженер',
};

const daysOrder: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
type DayOfWeek = keyof Specialist['schedule'];
const daysMap: Record<DayOfWeek, string> = {
   monday: 'Пн',
   tuesday: 'Вт',
   wednesday: 'Ср',
   thursday: 'Чт',
   friday: 'Пт',
};

export const SpecialistCard = ({ specialist }: { specialist: Specialist }) => {
   const { mutateAsync: deleteSpecialist } = useDeleteSpecialist();

   const handleDeleteSpecialist = () => {
      if (specialist.id) {
         deleteSpecialist(specialist.id);
      }
   };

   return (
      <div className='flex items-center justify-between gap-6 rounded-lg border border-border bg-background p-3 shadow hover:border-border-hover'>
         <div className='flex flex-1 items-center gap-1 text-sm'>
            <User size={18} />
            <p>{specialist.username}</p>
         </div>
         <div className='flex items-center gap-4'>
            <div className='flex min-w-[185px] items-center gap-2 text-sm'>
               <BookUser size={18} />
               <p>{technicianTypeMap[specialist.technicianType] ?? 'Неизвестная профессия'}</p>
            </div>
         </div>
         <div className='flex gap-2'>
            {daysOrder.map((dayKey) => {
               const isAvailable = specialist.schedule[dayKey];
               return (
                  <div
                     key={dayKey}
                     className={`flex h-8 w-8 items-center justify-center rounded-md border ${
                        isAvailable ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 bg-white text-black'
                     }`}
                  >
                     {daysMap[dayKey]}
                  </div>
               );
            })}
         </div>
         <Button variant='ghost' className='border-2 border-[#F24822] bg-[#FDE3DE]' size='icon' onClick={handleDeleteSpecialist}>
            <Trash />
         </Button>
      </div>
   );
};
