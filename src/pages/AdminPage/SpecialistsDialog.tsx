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
import { ContactForm } from '../ProfilePage/RequestForm';
import { SpecialistCard } from './SpecialistCard';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const FormSchema = z.object({
   username: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
   }),
});

export const SpecialistsDialog = () => {
   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         username: '',
      },
   });

   const [isOpen, setIsOpen] = useState(false);

   const handleClose = () => {
      setIsOpen(false);
   };

   function onSubmit(data: z.infer<typeof FormSchema>) {}

   return (
      <div className={cn('')}>
         <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className='absolute right-6 top-6 rounded-md border border-border bg-white p-2 text-sm font-medium text-black hover:opacity-80'>
               Панель специалистов
            </DialogTrigger>
            <DialogContent className='min-w-[800px] bg-white px-6'>
               <DialogHeader className=''>
                  <DialogTitle>Список специалистов</DialogTitle>
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
                        <FormField
                           control={form.control}
                           name='username'
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>ФИО Специалиста</FormLabel>
                                 <FormControl>
                                    <Input placeholder='Введите ФИО' {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <Button type='submit'>Submit</Button>
                     </form>
                  </Form>
               </DialogHeader>
               <div className='rounded-lg border border-border bg-gray-100 p-4'>
                  <h2>Добавить специалиста</h2>
               </div>
               <div className=''>
                  <SpecialistCard />
               </div>
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
