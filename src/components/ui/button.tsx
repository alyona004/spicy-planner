import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-base font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:outline-none shadow-md",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white px-6 py-3 hover:bg-blue-700",
        destructive:
          "bg-red-600 text-white px-6 py-3 hover:bg-red-700 border-2 border-red-600 focus-visible:ring-red-300",
        outline:
          "bg-white text-blue-700 border-2 border-blue-600 px-6 py-3 hover:bg-blue-50 hover:border-blue-700",
        secondary:
          "bg-gray-100 text-blue-700 px-6 py-3 hover:bg-gray-200",
        ghost:
          "bg-transparent text-blue-700 px-6 py-3 hover:bg-blue-50",
        link:
          "bg-transparent text-blue-700 underline underline-offset-4 px-6 py-3 hover:text-blue-900",
      },
      size: {
        default: "h-11 px-6 py-3 has-[>svg]:px-5",
        sm: "h-9 rounded-2xl gap-1.5 px-4 has-[>svg]:px-3.5",
        lg: "h-12 rounded-2xl px-8 has-[>svg]:px-6",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
