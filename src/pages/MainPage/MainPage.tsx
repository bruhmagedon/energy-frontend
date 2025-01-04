import { Color } from '@/shared/ui/color';

export const MainPage = () => {
   return (
      <section id='about' className='py-8'>
         <div className='container mx-auto text-center'>
            <h2 className='mb-6 text-2xl font-bold text-blue-800'>О нашей компании</h2>
            <div className='flex flex-col items-center justify-center gap-20'>
               <div className='mt-4 space-y-4 leading-relaxed'>
                  <p>
                     Наша компания специализируется на <Color>ремонте</Color> и <Color>обслуживании</Color> ветрогенераторов. Мы
                     обеспечиваем
                     <Color>диагностику</Color>, <Color>восстановление</Color> лопастей, <Color>проверку систем</Color> управления
                     и<Color> экстренные ремонты</Color>. С 10-летним опытом работы мы гарантируем <Color>надежность</Color>,
                     <Color> оперативность</Color> и высокое качество услуг, помогая вашим турбинам работать эффективно и
                     безопасно. Мы гордимся нашим <Color>инновационным подходом</Color> к решению сложных задач и используем
                     только современные технологии и оборудование.
                  </p>

                  <p>
                     Наша команда состоит из высококвалифицированных <Color>инженеров</Color>, прошедших сертификацию и обучение
                     на ведущих предприятиях отрасли. Каждый проект сопровождается <Color>индивидуальным менеджером</Color>, что
                     позволяет обеспечить максимальную прозрачность и удобство для наших клиентов. Мы также предлагаем{' '}
                     <Color>круглосуточную поддержку</Color>, чтобы быстро реагировать на любые потребности наших клиентов.
                     Благодаря нашему вниманию к деталям, мы являемся лидерами в отрасли по <Color>качеству</Color> и{' '}
                     <Color>надежности</Color>. Наши клиенты отмечают <Color>долговечность</Color> и<Color>эффективность</Color>{' '}
                     наших решений. Мы уверены, что сможем предложить лучшее обслуживание на рынке, которое превзойдет ваши
                     ожидания.
                  </p>
               </div>

               <div className='mt-6 flex justify-center gap-4'>
                  <img
                     src='images/Panasonic_Toughbook_Utilities_FZ-A1_02.jpg'
                     alt='Wind Turbine 1'
                     className='h-auto w-[360px] rounded-lg shadow-md transition-transform hover:scale-105'
                  />
                  <img
                     src='images/3Ob0yRsXYoBcewsvZVORl3FJ1vQ-1920.jpg'
                     alt='Wind Turbine 2'
                     className='h-auto w-[360px] rounded-lg shadow-md transition-transform hover:scale-105'
                  />
                  <img
                     src='images/IMG_3329.jpg'
                     alt='Wind Turbine 3'
                     className='h-auto w-[360px] rounded-lg shadow-md transition-transform hover:scale-105'
                  />
               </div>
            </div>
         </div>
      </section>
   );
};
