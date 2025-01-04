import { Card, CardContent } from '@/shared/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/shared/ui/carousel';

type ImageConfig = {
   src: string;
   alt: string;
};

const images: ImageConfig[] = [
   { src: 'images/Panasonic_Toughbook_Utilities_FZ-A1_02.jpg', alt: 'Wind Turbine 1' },
   { src: 'images/3Ob0yRsXYoBcewsvZVORl3FJ1vQ-1920.jpg', alt: 'Wind Turbine 2' },
   { src: 'images/IMG_3329.jpg', alt: 'Wind Turbine 3' },
];

export function MainImageCarousel() {
   return (
      <Carousel className='w-full'>
         <CarouselContent className=''>
            {images.map((image, index) => (
               <CarouselItem key={index} className=''>
                  <div className='p-6'>
                     <img
                        src={image.src}
                        alt={image.alt}
                        className='h-[300px] w-[450px] rounded-lg shadow-md transition-transform hover:scale-105'
                     />
                  </div>
               </CarouselItem>
            ))}
         </CarouselContent>
         <CarouselPrevious />
         <CarouselNext />
      </Carousel>
   );
}
