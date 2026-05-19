"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  /**
   * Optional Lucide icon to display on the left.
   * Restricts icons to only those from the lucide-react package.
   */
  icon?: LucideIcon;
  /**
   * Whether the input is in an error or invalid state.
   * If true, changes the background color and applies a primary red border.
   */
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", icon: Icon, error, disabled, ...props }, ref) => {
    return (
      <div
        className={cn(
          // Layout & Sizing
          "flex items-center w-full max-w-[478px] rounded-[10px] transition-all duration-200 border shadow-black",
          // Paddings (mobile: px-16, py-12; desktop/medium+: px-5, py-4) and Gap (10px)
          "px-16 py-12 md:px-5 md:py-4 gap-[10px]",
          // Default State (white background, transparent border so no visible border, shadow-black)
          "bg-white border-transparent",
          // Hover State (smooth transition to primary red border)
          "hover:border-primary-red",
          // Focus State (focused nested input, keeping primary red border and shadow-black)
          "focus-within:border-primary-red focus-within:ring-0 focus-within:shadow-black",
          // Error or Invalid State (bg is primary red with 10% transparent, border is primary red)
          error && "bg-primary-red/10 border-primary-red",
          // Disabled State (lowered opacity, ignore mouse events)
          disabled && "opacity-50 pointer-events-none",
          className
        )}
      >
        {Icon && (
          <Icon
            className={cn(
              "w-5 h-5 shrink-0 transition-colors duration-200 text-darker-red",
              disabled && "text-darker-red/50",
              error && "text-darker-red"
            )}
          />
        )}
        <input
          type={type}
          disabled={disabled}
          className={cn(
            // Inner input visual reset
            "bg-transparent outline-none w-full font-satoshi text-sm text-primary-navy placeholder:text-gray focus:ring-0 focus:outline-none",
            // Disabled style for text
            disabled && "text-primary-navy/50 placeholder:text-gray/40",
            // Error style for text
            error && "text-primary-red placeholder:text-primary-red/60"
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
