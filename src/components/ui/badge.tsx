import { cn } from "@/lib/utils";

const badgeVariants = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  success: "bg-green-500 text-white",
  warning: "bg-yellow-400 text-foreground",
  destructive: "bg-destructive text-white",
  muted: "bg-muted text-foreground",
};

export function Badge({
  children,
  variant = "primary",
  className = "",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: keyof typeof badgeVariants }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-xs font-semibold shadow-sm align-middle select-none transition-colors",
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
} 