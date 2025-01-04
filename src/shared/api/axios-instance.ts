import type { AxiosInstance } from 'axios';
import axios from 'axios';

export const api: AxiosInstance = axios.create({
   baseURL: 'http://localhost:3111/api/',
   withCredentials: true,
});
