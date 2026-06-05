import * as React from "react";
import { cn } from "@/shared/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base Styles (Mobile First / Default)
        "w-[478px] min-h-[132px] gap-2.5 rounded-[10px] border-2 border-gray bg-white px-5 py-4 text-xl transition-colors outline-none",
        "placeholder:text-muted-foreground",
        "shadow-[0px_0px_30px_0px_rgba(139,0,32,0.08)]",
        // Width 478px
        // Height 132px
        // Gap 2.5
        // Rounded 10px
        // Border 2px
        // Border Color #808080 (gray)
        // Background white
        // Padding 20px 16px
        // Text 20px <-- watch in /auth-test/globals.css
        // transition-colors for Smooth Transition
        // outline-none to remove outline (focus)
        // placeholder:text-muted-foreground for placeholder text color
        // shadow
        // X: 0
        // Y: 0
        // Blur: 30
        // Spread: 0
        // Color: #8B0020 (8%)

        // Hover States (Enabled only)
        "enabled:hover:border-primary-red",

        // Focus States (Using CSS Variables)
        "focus-visible:border-primary-red",

        // Validation / Invalid States
        "aria-invalid:cursor-not-allowed aria-invalid:border-primary-red aria-invalid:bg-primary-red/10",

        // Responsive (sm breakpoint)
        //"sm:px-5 sm:py-4 sm:text-sm", <-- What is it IDK

        // Disabled States
        "disabled:cursor-not-allowed disabled:opacity-50",

        // Dark Mode Adjustments
        //"dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-brand/50 dark:aria-invalid:ring-brand/40", <-- IDK What is it too

        className
      )}
      style={{ fontFamily: "var(--font-noto-thai), sans-serif", ...props.style }}
      {...props}
    />
  );
}

export { Textarea };
