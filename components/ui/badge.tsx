import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "soft" | "outline";
};

export function Badge({ className, children, variant = "soft", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        variant === "soft"
          ? "bg-primary/15 text-primary border border-primary/20"
          : "border border-border text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
