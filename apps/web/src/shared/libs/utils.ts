// utils.ts
import { twMerge } from "tailwind-merge";

export function cn(...classes: (string | undefined | false)[]): string {
  return twMerge(classes.filter(Boolean).join(" "));
}

const relativeTimeFormatter = new Intl.RelativeTimeFormat("th", { numeric: "auto" });
const RELATIVE_TIME_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 60 * 60 * 24 * 365],
  ["month", 60 * 60 * 24 * 30],
  ["week", 60 * 60 * 24 * 7],
  ["day", 60 * 60 * 24],
  ["hour", 60 * 60],
  ["minute", 60],
];

export function formatRelativeTime(date: string | Date): string {
  const seconds = (new Date(date).getTime() - Date.now()) / 1000;
  for (const [unit, secondsInUnit] of RELATIVE_TIME_UNITS) {
    if (Math.abs(seconds) >= secondsInUnit) {
      return relativeTimeFormatter.format(Math.round(seconds / secondsInUnit), unit);
    }
  }
  return relativeTimeFormatter.format(Math.round(seconds), "second");
}
