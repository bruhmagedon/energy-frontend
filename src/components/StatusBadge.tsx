import { cn } from '@/utils/lib/utils';

interface StatusBadge {
   label: string;
   className: string;
   Icon?: any;
}

export const StatusBadge = ({ label, className, Icon }: StatusBadge) => (
   <div className={cn('flex h-[32px] items-center gap-2 rounded-lg border-2 px-2', className)}>
      {Icon && <Icon size={18} />}
      <p className='text-base font-medium'>{label}</p>
   </div>
);
