export const ContactPage = () => {
   return (
      <div className='container mx-auto px-4 py-8'>
         <h1 className='mb-6 text-center text-3xl font-bold text-blue-800'>Контакты</h1>
         <div className='flex flex-1 flex-col justify-center gap-8 px-10 md:flex-row'>
            <div className='flex-1'>
               <iframe
                  src='https://yandex.ru/map-widget/v1/?um=constructor%3Afb58a0bdd1b120caf5ba424e2fb312c5425c307e8525df076ee64d3bb085667e&amp;source=constructor'
                  width='100%'
                  height='400'
                  frameBorder='0'
                  className='rounded-lg shadow-md'
                  title='Наше расположение'
               ></iframe>
            </div>
            <div className='flex-1'>
               <h2 className='mb-4 text-2xl font-semibold text-gray-800'>Наши контакты</h2>
               <ul className='space-y-3 text-lg'>
                  <li>
                     <strong>Адрес:</strong> г. Таганрог, ул. Примерная, д. 12
                  </li>
                  <li>
                     <strong>Телефон:</strong>{' '}
                     <a href='tel:+74950000000' className='text-blue-500 hover:underline'>
                        +7 (495) 000-00-00
                     </a>
                  </li>
                  <li>
                     <strong>Email:</strong>{' '}
                     <a href='mailto:info@example.com' className='text-blue-500 hover:underline'>
                        info@example.com
                     </a>
                  </li>
                  <li>
                     <strong>Режим работы:</strong> Пн-Пт, 9:00 - 18:00
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
};
