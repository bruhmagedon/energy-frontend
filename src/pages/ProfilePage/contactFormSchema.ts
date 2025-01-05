import { z } from 'zod';

export const contactFormSchema = z.object({
   clientName: z.string(),
   topic: z
      .string({
         required_error: 'Выбор темы обязателен',
      })
      .min(1),
   urgency: z
      .string({
         required_error: 'Выбор срочности обязателен',
      })
      .min(1),
   windTurbineCount: z
      .string({
         required_error: 'Укажите количество установленных ветрогенераторов',
      })
      .regex(/^[1-9]\d*$/, 'Количество должно быть целым числом больше 0'),
   power: z
      .string()
      .regex(/^(\d+(\.\d+)?\s?(кВт|МВт))?$/, 'Укажите мощность в формате: 2.5 МВт')
      .optional(),
   model: z.string(),
   installationYear: z
      .string()
      .regex(/^\d{4}$/, 'Укажите год установки в формате: 2020')
      .optional(),
   serviceDate: z
      .string()
      .regex(/^\d{2}\.\d{2}\.\d{4}$/, 'Укажите дату обслуживания в формате: 15.03.2024')
      .optional(),
   area: z
      .string({
         required_error: 'Общая площадь должна быть указана',
      })
      .regex(/^\d+(\.\d+)?$/, 'Общая площадь должна быть положительным числом'),
   terrain: z.string().min(1, { message: 'Введите рельеф местности' }),
   message: z.string().optional(),
});
