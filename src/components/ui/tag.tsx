import { cn } from "@/lib/utils";

const tagVariants = {
  primary: "bg-primary/10 text-primary border-primary/30",
  secondary: "bg-secondary/10 text-secondary border-secondary/30",
  accent: "bg-accent/10 text-accent border-accent/30",
  muted: "bg-muted text-foreground border-muted",
};

export function Tag({
  children,
  variant = "primary",
  className = "",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: keyof typeof tagVariants }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-xs font-medium border shadow-sm align-middle select-none transition-colors",
        tagVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
} 