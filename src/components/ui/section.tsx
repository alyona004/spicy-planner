import { cn } from "@/lib/utils";

export function Section({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "bg-white rounded-2xl p-6 shadow-sm border border-muted mb-8",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
} 