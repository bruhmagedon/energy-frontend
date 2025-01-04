export const ServicePage = () => {
   return (
      <section id='services' className='bg-white py-8'>
         <div className='container mx-auto flex flex-col items-center gap-5 text-center'>
            <h2 className='text-2xl font-bold text-blue-800'>Услуги</h2>
            <p className='mt-2 max-w-[60%] text-center text-lg text-gray-700'>
               Мы предоставляем широкий спектр услуг, которые охватывают все аспекты диагностики, ремонта и обслуживания
               ветрогенераторов. Каждая услуга нацелена на обеспечение надежности и эффективности ваших турбин.
            </p>
            <ul className='mx-auto mt-4 max-w-xl space-y-3 text-left'>
               <li className='flex items-center space-x-3'>
                  <span className='h-2 w-2 rounded-full bg-blue-500'></span>
                  <span className='font-medium'>Диагностика и устранение неисправностей турбин</span>
               </li>
               <li className='flex items-center space-x-3'>
                  <span className='h-2 w-2 rounded-full bg-blue-500'></span>
                  <span className='font-medium'>Ремонт и техническое обслуживание лопаток</span>
               </li>
               <li className='flex items-center space-x-3'>
                  <span className='h-2 w-2 rounded-full bg-blue-500'></span>
                  <span className='font-medium'>Проверки системы управления</span>
               </li>
               <li className='flex items-center space-x-3'>
                  <span className='h-2 w-2 rounded-full bg-blue-500'></span>
                  <span className='font-medium'>Аварийный ремонт</span>
               </li>
            </ul>

            <div className='mt-6 flex justify-center gap-4'>
               <img
                  src='images/dcf9816e21b4e09fb9f0c7d8f26115de.jpg'
                  alt='Repair Team at Work'
                  className='h-auto w-[360px] rounded-lg shadow-md transition-transform hover:scale-105'
               />
               <img
                  src='images/VIE.jpg'
                  alt='Close-up of Turbine Maintenance'
                  className='h-auto w-[360px] rounded-lg shadow-md transition-transform hover:scale-105'
               />
            </div>
         </div>
      </section>
   );
};
