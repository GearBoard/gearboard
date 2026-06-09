"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { Loader2 } from "lucide-react";

import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer active:cursor-default",
  {
    variants: {
      color: {
        red: "bg-primary-red text-white hover:bg-dark-red active:bg-darker-red focus-visible:ring-primary-red",
        navy: "bg-primary-navy text-white hover:bg-dark-navy active:bg-darker-navy focus-visible:ring-primary-navy",
        yellow:
          "bg-primary-yellow text-primary-navy hover:bg-dark-yellow active:bg-darker-yellow focus-visible:ring-primary-yellow",
      },
      size: {
        lg: "px-5 py-3 text-lg gap-2 [&_svg:not([class*='size-'])]:size-[16px]", // Rename the existing default size variant to lg
        md: "px-4 py-2 text-base gap-2 [&_svg:not([class*='size-'])]:size-[16px]",
        sm: "px-3 py-1.5 text-sm gap-2 [&_svg:not([class*='size-'])]:size-[14px]", // Update the sm size variant horizontal padding to px-3
        xs: "px-2 py-1 text-xs gap-2 [&_svg:not([class*='size-'])]:size-[12px]",
      },
    },
    defaultVariants: {
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
    icon?: React.ReactNode;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      color = "red",
      size = "md", // change to md
      asChild = false,
      loading = false,
      disabled,
      icon,
      iconLeft,
      iconRight,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot.Root : "button";
    const isDisabled = disabled || loading;

    // Select the one to display on the left side
    const leftIconSlot = loading ? (
      <>
        <Loader2 className="animate-spin" />
        <span className="sr-only">Loading…</span>
      </>
    ) : (
      icon || iconLeft
    );

    return (
      <Comp
        data-slot="button"
        data-variant={color}
        data-size={size}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        className={cn(buttonVariants({ color, size, className }))}
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
        {/* แสดงผลไอคอนฝั่งซ้าย (หรือ Loader) */}
        {leftIconSlot}

        {/* แสดงผลข้อความหลักของปุ่ม */}
        <Slot.Slottable>{children}</Slot.Slottable>

        {/* แสดงผลไอคอนฝั่งขวา (เฉพาะกรณีที่ไม่ได้อยู่ในสถานะกำลังโหลด เพื่อป้องกัน UI เบียดกัน) */}
        {!loading && iconRight}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
