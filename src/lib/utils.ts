import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isAdminRoute = () => {
  if (typeof window === 'undefined') return false;
  return window.location.pathname.startsWith('/admin');
};
