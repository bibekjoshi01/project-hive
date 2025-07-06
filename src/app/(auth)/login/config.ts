import { z } from 'zod';
import { ILoginFormDataType } from '../redux/types';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required')
});

export const defaultValues: ILoginFormDataType = { email: '', password: '' };