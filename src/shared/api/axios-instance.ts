import type { AxiosInstance } from 'axios';
import axios from 'axios';

export const api: AxiosInstance = axios.create({
   baseURL: 'http://89.104.71.235:3111/api/',
   withCredentials: true,
});
