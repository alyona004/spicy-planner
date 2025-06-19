import { cn } from "@/lib/utils";

export function Divider({ className = "", ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      className={cn(
        "my-6 border-t-2 border-muted rounded-full opacity-70",
        className
      )}
      {...props}
    />
  );
} 