import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(currency: string, price: number) {
  return Intl.NumberFormat('en-US', { style: 'currency', currency }).format(
    price
  );
}
