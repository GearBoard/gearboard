"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const inputVariants = cva(
  "flex items-center w-full rounded-lg transition-all duration-200 border-[1.5px] border-gray shadow-primary-red px-3 py-3 md:px-4 md:py-3 gap-[10px] bg-white hover:border-primary-red focus-within:border-primary-red",
  {
    variants: {
      error: {
        true: "bg-primary-red/10 border-primary-red",
        false: "",
      },
      disabled: {
        true: "opacity-50 pointer-events-none",
        false: "",
      },
    },
    defaultVariants: {
      error: false,
      disabled: false,
    },
  }
);

export interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", icon, error, disabled, ...props }, ref) => {
    const renderedIcon = React.isValidElement<{ className?: string }>(icon)
      ? React.cloneElement(icon, {
          className: cn(
            "w-4 h-4 shrink-0 transition-colors duration-200 text-primary-red",
            icon.props.className
          ),
        })
      : icon;

    return (
      <div
        data-slot="input-wrapper"
        data-error={error || undefined}
        data-disabled={disabled || undefined}
        className={cn(inputVariants({ error, disabled }), className)}
      >
        {renderedIcon && (
          <span data-slot="input-icon" className="shrink-0">
            {renderedIcon}
          </span>
        )}
        <input
          data-slot="input"
          type={type}
          disabled={disabled}
          className={cn(
            "bg-transparent outline-none w-full font-satoshi text-sm md:text-base text-black placeholder:text-dark-gray focus:placeholder-transparent focus:ring-0 focus:outline-none",
            disabled && "text-black/50 placeholder:text-dark-gray/50",
            error && "text-primary-red placeholder:text-primary-red"
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
