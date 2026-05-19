import * as React from "react";
import { cn } from "@/shared/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base Styles (Mobile First / Default)
        "w-full min-h-[132px] rounded-[8px] border border-input bg-transparent px-5 py-4 text-lg transition-colors outline-none",
        "placeholder:text-muted-foreground",

        // Focus States (Using CSS Variables)
        "focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-inset",

        // Hover States (Enabled only)
        "enabled:hover:border-brand enabled:hover:ring-2 enabled:hover:ring-brand/30 enabled:hover:ring-inset",

        // Validation / Invalid States
        "aria-invalid:border-brand aria-invalid:ring-2 aria-invalid:ring-brand/20 aria-invalid:ring-inset aria-invalid:bg-brand/10",

        // Responsive (sm breakpoint)
        "sm:px-5 sm:py-4 sm:text-sm",

        // Disabled States
        "disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50",

        // Dark Mode Adjustments
        "dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-brand/50 dark:aria-invalid:ring-brand/40",

        className
      )}
      style={{ fontFamily: "var(--font-noto-thai), sans-serif", ...props.style }}
      {...props}
    />
  );
}

export { Textarea };
