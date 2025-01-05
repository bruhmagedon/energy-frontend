import { Button } from '@/shared/ui/button';
import {
   DialogHeader,
   DialogFooter,
   Dialog,
   DialogTrigger,
   DialogContent,
   DialogTitle,
   DialogDescription,
   DialogClose,
} from '@/shared/ui/dialog';
import { cn } from '@/utils/lib/utils';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { ContactForm } from './ContactForm';

export const RequestDialog = () => {
   const [isOpen, setIsOpen] = useState(false);

   const handleClose = () => {
      setIsOpen(false);
   };

   return (
      <div className={cn('')}>
         <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className='rounded-md border border-border bg-[#2563eb] p-2.5 text-sm font-medium text-white hover:opacity-80'>
               Оставить заявку
            </DialogTrigger>
            <DialogContent className='min-w-[800px] bg-white p-0'>
               <DialogHeader className='px-6 pt-6'>
                  <DialogTitle>Обратная связь с нами</DialogTitle>
                  <DialogDescription className='text-base'>Оставьте заявку на проведение работ</DialogDescription>
               </DialogHeader>
               <ContactForm handleClose={handleClose} />
               <DialogFooter className='max-w-[1298px] rounded-b-lg border-t border-border bg-background p-6'>
                  <DialogClose asChild>
                     <Button type='button' variant='secondary'>
                        Отмена
                     </Button>
                  </DialogClose>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </div>
   );
};
