import { cn } from '@/utils/lib/utils';

interface InfoRowProps {
   label: string;
   value: string;
   className?: string;
}

export const InfoRow = ({ label, value, className }: InfoRowProps) => (
   <div className={cn('flex items-center gap-2', className)}>
      <p className='text-[#8F8F8F]'>{label}</p>
      <p className='max-w-[1000px] text-balance font-medium'>{value || 'Не указано'}</p>
   </div>
);
