import { cn } from "@/lib/utils";

const alertVariants = {
  info: "bg-blue-50 text-blue-800 border-blue-300",
  success: "bg-green-50 text-green-800 border-green-300",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-300",
  destructive: "bg-red-50 text-red-800 border-red-300",
};

const alertIcons = {
  info: "ℹ️",
  success: "✅",
  warning: "⚠️",
  destructive: "⛔",
};

export function Alert({
  children,
  variant = "info",
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: keyof typeof alertVariants }) {
  return (
    <div
      role="alert"
      className={cn(
        "flex items-center gap-3 border-l-4 rounded-lg px-4 py-3 text-sm font-medium shadow-sm",
        alertVariants[variant],
        className
      )}
      {...props}
    >
      <span className="text-lg" aria-hidden>{alertIcons[variant]}</span>
      <span>{children}</span>
    </div>
  );
} 