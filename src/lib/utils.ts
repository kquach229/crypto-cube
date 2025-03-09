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

export const friendlyFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short',
  maximumFractionDigits: 2,
});

export const percentageFormatter = (percent: number) => {
  const sign = percent >= 0 ? '+' : '';
  return `${sign + percent.toFixed(2)}%`;
};

export function ellipse(string: string) {
  return string.length > 10 ? `${string.substring(0, 10)}...` : string;
}
