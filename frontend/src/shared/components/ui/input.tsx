"use client";

import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  /**
   * Optional icon content to display on the left.
   * Accepts any React node while preserving the component's icon styling.
   */
  icon?: React.ReactNode;
  /**
   * Whether the input is in an error or invalid state.
   * If true, changes the background color and applies a primary red border.
   */
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", icon, error, disabled, ...props }, ref) => {
    const renderedIcon = React.isValidElement<{ className?: string }>(icon)
      ? React.cloneElement(icon, {
          className: cn(
            "w-5 h-5 shrink-0 transition-colors duration-200 text-darker-red",
            disabled && "text-dark-gray/70",
            error && "text-darker-red",
            icon.props.className
          ),
        })
      : icon;

    return (
      <div
        className={cn(
          // Layout & Sizing
          "flex items-center w-full rounded-[10px] transition-all duration-200 border-2 shadow-black",
          // Paddings (mobile: px-3, py-1.5; desktop/medium+: px-4, py-2) and Gap (10px)
          "px-3 py-1.5 md:px-4 md:py-2 gap-[10px]",
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
        {renderedIcon && <span className="shrink-0">{renderedIcon}</span>}
        <input
          type={type}
          disabled={disabled}
          className={cn(
            // Inner input visual reset
            "bg-transparent outline-none w-full font-satoshi text-sm md:text-base text-black placeholder:text-dark-gray focus:ring-0 focus:outline-none",
            // Disabled style for text
            disabled && "text-black/50 placeholder:text-dark-gray/70",
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
