import { Button } from '@/shared/ui/button';
import { Palette, Ruler, ShoppingCart } from 'lucide-react';

export const SpecialistCard = () => {
   return (
      <div className='flex items-center justify-between rounded-lg border border-border bg-background p-3 shadow hover:border-border-hover'>
         <div className='flex flex-1 items-center gap-1 text-sm'>
            <Palette size={16} />
            <p>{'А.В. Смирнов'}</p>
         </div>
         <div className='flex items-center gap-4'>
            <div className='flex items-center gap-1 text-sm'>
               <Ruler size={16} />
               <p>{'Механик по обслуживанию и ремонту роторов, редукторов и турбин'}</p>
            </div>
            {/* <div className='flex min-w-[70px] items-center gap-1 text-sm'>
               <Weight size={16} />
               <p>{productItem.weight} кг</p>
            </div>
            <div className='flex gap-2'>
               <Button
                  variant='ghost'
                  className='border-2 border-[#14AE5C] bg-[#dcf3e6]'
                  size='icon'
                  onClick={handleAddItemToCard}
               >
                  <ShoppingCart />
               </Button>
            </div> */}
         </div>
      </div>
   );
};
