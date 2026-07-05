"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { Loader2 } from "lucide-react";

import { cn } from "@/shared/libs/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer active:cursor-default",
  {
    variants: {
      variant: {
        default: "",
        outline: "bg-white",
      },
      color: {
        red: "focus-visible:ring-primary-red",
        gray: "focus-visible:ring-primary-dark-gray",
      },
      size: {
        lg: "px-5 py-3 text-base gap-2 [&_svg:not([class*='size-'])]:size-[16px]", // Rename the existing default size variant to lg
        md: "px-4 py-2 text-base gap-2 [&_svg:not([class*='size-'])]:size-[16px]",
        sm: "px-4 py-1.5 text-sm gap-2 [&_svg:not([class*='size-'])]:size-[14px]", // Update the sm size variant horizontal padding to px-3
        xs: "px-2 py-1 text-xs gap-2 [&_svg:not([class*='size-'])]:size-[12px]",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        color: "red",
        className: "bg-primary-red text-white hover:bg-dark-red active:bg-darker-red",
      },
      {
        variant: "default",
        color: "gray",
        className: "bg-dark-gray text-white hover:bg-[#5D636B] active:bg-[#4D5054]",
      },
      {
        variant: "outline",
        color: "red",
        className:
          "border-primary-red text-primary-red hover:bg-[#fff0f0] hover:border-dark-red hover:text-dark-red active:bg-[#ffdede] active:border-darker-red active:text-darker-red",
      },
      {
        variant: "outline",
        color: "gray",
        className:
          "border-gray text-dark-gray hover:bg-[#f5f5f5] hover:border-[#5D636B] hover:text-[#5D636B] active:bg-[#ebebeb] active:border-[#4D5054] active:text-[#4D5054]",
      },
    ],
    defaultVariants: {
      variant: "default",
      color: "red",
      size: "md", //Change the default size fallback from the current default variant to md
    },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      color = "red",
      size = "md", // change to md
      asChild = false,
      loading = false,
      disabled,
      iconLeft,
      iconRight,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot.Root : "button";
    const isDisabled = disabled || loading;

    return (
      <Comp
        data-slot="button"
        data-variant={variant}
        data-color={color}
        data-size={size}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        className={cn(buttonVariants({ variant, color, size, className }))}
        ref={ref}
        {...props}
        onClick={(e) => {
          if (isDisabled) {
            e.preventDefault();
            return;
          }
          props.onClick?.(e);
        }}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            <span className="sr-only">Loading…</span>
          </>
        ) : (
          iconLeft
        )}
        <Slot.Slottable>{children}</Slot.Slottable>
        {iconRight}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
