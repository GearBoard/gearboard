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
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/50",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
            "duration-200"
          )}
        />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "w-[90%] max-w-[343px] sm:max-w-[800px]",
            "rounded-[10px] bg-white",
            "p-4 sm:p-6",
            "shadow-primary-red",
            "focus:outline-none",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "duration-200",
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
                "flex items-center justify-center"
              )}
            >
              <X
                className="size-6 text-dark-gray hover:text-primary-red transition-color cursor-pointer"
                strokeWidth={2}
              />
            </button>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
