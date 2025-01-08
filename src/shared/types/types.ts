import { Topic } from '@/pages/ProfilePage/RequiestCard';

export interface IRequest {
   id: string;
   status: RequestStatus;
   topic: Topic;
   urgency: UrgencyStatus;
   windTurbineCount: string;
   power?: string;
   model: string;
   installationYear?: string;
   serviceDate?: string;
   area: string;
   terrain: string;
   message?: string;
   phoneNumber: string;
   city: string;
   specialist: Specialist | null;
   user: User;
   plannedDayOfWeek: string | null;
}

export enum RequestStatus {
   Pending = 'На рассмотрении',
   Accepted = 'Принята',
   Rejected = 'Отклонена',
   InProgress = 'В процессе',
   Completed = 'Выполнена',
}

export enum UrgencyStatus {
   Urgent = 'Экстренно',
   AsSoonAsPossible = 'Как можно скорее',
   NotCritical = 'Не критично',
}

export interface User {
   id: string;
   username: string;
   email: string;
   password: string;
   role: 'user' | 'admin';
}

export interface DecodedToken {
   sub: string;
   email: string;
   role: string;
   iat: number;
   exp: number;
}

export interface Specialist {
   id?: string;
   username: string;
   technicianType:
      | 'electricalEngineer'
      | 'mechanicalTechnician'
      | 'softwareEngineer'
      | 'bladeCompositeTechnician'
      | 'universalEngineer';
   schedule: {
      monday: boolean;
      tuesday: boolean;
      wednesday: boolean;
      thursday: boolean;
      friday: boolean;
   };
}
