import * as React from "react";
import { cn } from "@/shared/libs/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

function Textarea({
  className,
  label,
  error,
  errorMessage,
  id,
  required,
  ...props
}: TextareaProps) {
  const hasError = error || !!errorMessage;

  const textareaEl = (
    <textarea
      data-slot="textarea"
      id={id}
      aria-invalid={hasError || undefined}
      required={required}
      className={cn(
        "w-full min-h-[132px] gap-2.5 rounded-lg border-[1.5px] border-gray bg-white px-3 py-2 md:px-4text-sm md:text-base transition-colors outline-none",
        "placeholder:text-dark-gray",

        "enabled:hover:border-primary-red",
        "focus-visible:border-primary-red",
        "aria-invalid:border-primary-red aria-invalid:bg-primary-red/10 aria-invalid:placeholder:text-primary-red",
        "disabled:cursor-not-allowed disabled:opacity-50",
        !label && !errorMessage ? className : undefined
      )}
      {...props}
    />
  );

  if (!label && !errorMessage) return textareaEl;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label htmlFor={id} className="text-sm sm:text-base font-medium">
          {label}
          {required && <span className="text-primary-red"> *</span>}
        </label>
      )}
      {textareaEl}
      {errorMessage && <p className="text-xs sm:text-sm text-primary-red">{errorMessage}</p>}
    </div>
  );
}

export { Textarea };
