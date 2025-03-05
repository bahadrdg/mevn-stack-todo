import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as d3 from "d3-color"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getHSLValue(hex: string): string {
  return d3.color(hex)!.formatHsl().slice(4, -1).replaceAll(",", "");
}

export function generateAvatarFallback(string: string) {
  const names = string.split(" ").filter((name: string) => name);
  const mapped = names.map((name: string) => name.charAt(0).toUpperCase());

  return mapped.join("");
}