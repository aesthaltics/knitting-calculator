import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const find_gcd = (a: number, b: number): number => {
  /**
   * func return the greatest common denominator shared by two numbers
   * @param a - The first number
   * @param b - The second number
   * @returns the greatest common denominator
   */
	return b ? find_gcd(b, a % b) : a;
};
