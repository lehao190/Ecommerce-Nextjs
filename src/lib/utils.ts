import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const findItemById = <TItem extends { id: number }>(items: TItem[], id: number) => {
  return items.find((item) => item.id === id);
};

export const findItemByIndex = <TItem extends { id: number }>(items: TItem[], id: number) => {
  const foundIndex = items.findIndex(item => item.id === id);

  if(foundIndex !== -1)
    return foundIndex;

  return -1;
};
