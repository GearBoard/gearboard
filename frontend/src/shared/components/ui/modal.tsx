"use client";

import * as React from "react";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showCloseButton?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Modal({
  open,
  onOpenChange,
  showCloseButton = true,
  className,
  children,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "w-[282px] sm:w-[564px]",
            "rounded-[10px] bg-white",
            "p-4 sm:p-6",
            "shadow-[0_0_30px_rgba(139,0,32,0.08)]",
            "focus:outline-none",
            className
          )}
        >
          {showCloseButton && (
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close"
              className={cn(
                "absolute right-4 top-4 sm:right-6 sm:top-6",
                "flex items-center justify-center",
                "size-[38px]",
                "rounded-[20px] sm:rounded-[8px]",
                "bg-primary-red transition-colors hover:bg-dark-red active:bg-darker-red",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-red focus-visible:ring-offset-2"
              )}
            >
              <X className="size-6 text-white" strokeWidth={2} />
            </button>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
