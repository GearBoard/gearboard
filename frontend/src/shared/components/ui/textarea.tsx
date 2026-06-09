import * as React from "react";
import { cn } from "@/shared/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base Styles (Mobile First / Default)
        "w-full min-h-[132px] gap-2.5 rounded-lg border-[1.5px] border-gray bg-white px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base transition-colors outline-none",
        "placeholder:text-dark-gray",
        "shadow-primary-red",

        // Hover States (Enabled only)
        "enabled:hover:border-primary-red",

        // Focus States (Using CSS Variables)
        "focus-visible:border-primary-red",

        // Validation / Invalid States
        "aria-invalid:border-primary-red aria-invalid:bg-primary-red/10 aria-invalid:placeholder:text-primary-red",

        // Disabled States
        "disabled:cursor-not-allowed disabled:opacity-50",

        className
      )}
      {...props}
    />
  );
}

export { Textarea };
