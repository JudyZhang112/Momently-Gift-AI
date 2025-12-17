"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, ...props }, ref) => {
    return (
      <label className="inline-flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          className="peer sr-only"
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            "relative h-6 w-10 rounded-full bg-muted transition peer-checked:bg-primary/70",
            className
          )}
        >
          <span className="absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow transition peer-checked:left-5" />
        </div>
      </label>
    );
  }
);
Switch.displayName = "Switch";
