// utils.ts
import { twMerge } from "tailwind-merge";

export function cn(...classes: (string | undefined | false)[]): string {
  return twMerge(classes.filter(Boolean).join(" "));
}

const RELATIVE_TIME_UNITS: [string, number][] = [
  ["ปี", 60 * 60 * 24 * 365],
  ["เดือน", 60 * 60 * 24 * 30],
  ["สัปดาห์", 60 * 60 * 24 * 7],
  ["วัน", 60 * 60 * 24],
  ["ชั่วโมง", 60 * 60],
  ["นาที", 60],
];

export function formatRelativeTime(date: string | Date): string {
  const seconds = (Date.now() - new Date(date).getTime()) / 1000;
  for (const [label, secondsInUnit] of RELATIVE_TIME_UNITS) {
    if (seconds >= secondsInUnit) {
      return `${Math.round(seconds / secondsInUnit)} ${label}ที่แล้ว`;
    }
  }
  return "เมื่อสักครู่";
}
