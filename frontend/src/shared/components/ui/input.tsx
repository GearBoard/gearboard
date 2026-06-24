"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const inputVariants = cva(
  "flex items-center w-full rounded-lg transition-all duration-200 border-[1.5px] border-gray px-3 py-2 md:px-4 h-10 gap-[10px] bg-white hover:border-primary-red focus-within:border-primary-red",
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
  label?: string;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      icon,
      error,
      errorMessage,
      label,
      disabled,
      id,
      required,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";
    const hasError = error || !!errorMessage;

    const renderedIcon = React.isValidElement<{ className?: string }>(icon)
      ? React.cloneElement(icon, {
          className: cn(
            "w-4 h-4 shrink-0 transition-colors duration-200 text-primary-red",
            icon.props.className
          ),
        })
      : icon;

    const inputWrapper = (
      <div
        data-slot="input-wrapper"
        data-error={hasError || undefined}
        data-disabled={disabled || undefined}
        className={cn(
          inputVariants({ error: hasError, disabled }),
          !label && !errorMessage ? className : undefined
        )}
      >
        {renderedIcon && (
          <span data-slot="input-icon" className="shrink-0">
            {renderedIcon}
          </span>
        )}
        <input
          data-slot="input"
          type={isPassword ? (showPassword ? "text" : "password") : type}
          id={id}
          disabled={disabled}
          className={cn(
            "bg-transparent outline-none w-full text-sm md:text-base text-black placeholder:text-dark-gray focus:placeholder-transparent focus:ring-0 focus:outline-none",
            disabled && "text-black/50 placeholder:text-dark-gray/50",
            hasError && "placeholder:text-primary-red"
          )}
          required={required}
          ref={ref}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="shrink-0 text-dark-gray hover:text-black transition-colors"
            aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    );

    if (!label && !errorMessage) return inputWrapper;

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label && (
          <label htmlFor={id} className="text-sm sm:text-base font-medium">
            {label}
            {required && <span className="text-primary-red"> *</span>}
          </label>
        )}
        {inputWrapper}
        {errorMessage && <p className="text-xs sm:text-sm text-primary-red">{errorMessage}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
