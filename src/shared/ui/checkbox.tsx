'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '@/utils/lib/utils';

const Checkbox = React.forwardRef<
   React.ElementRef<typeof CheckboxPrimitive.Root>,
   React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & { label: string }
>(({ className, label, ...props }, ref) => (
   <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
         'peer flex h-9 w-9 shrink-0 items-center justify-center rounded-md border shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
         'data-[state=checked]:bg-blue-500 data-[state=checked]:text-white',
         'data-[state=unchecked]:bg-white data-[state=unchecked]:text-black',
         className,
      )}
      {...props}
   >
      <span className='text-sm font-medium'>{label}</span>
   </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
