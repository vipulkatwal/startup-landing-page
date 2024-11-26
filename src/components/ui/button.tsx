import * as React from "react"
import { Slot } from "@radix-ui/react-slot" // Allows custom components to be passed in and treated like a slot.
import { cva, type VariantProps } from "class-variance-authority" // Utility for defining class variants.

import { cn } from "@/lib/utils" // Utility function for conditional class merging.

const buttonVariants = cva(
  // Base button styles for consistent appearance and behavior
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      // Variants for different button styles
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      // Variants for button sizes
      size: {
        default: "h-9 px-4 py-2", // Default button size
        sm: "h-8 rounded-md px-3 text-xs", // Small button size
        lg: "h-10 rounded-md px-8", // Large button size
        icon: "h-9 w-9", // Icon-only button
      },
    },
    defaultVariants: {
      // Default variant and size
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, // Includes native button attributes
    VariantProps<typeof buttonVariants> { // Extends to support variant types
  asChild?: boolean // Allows treating the button as a child component (e.g., Slot for custom elements)
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button" // Use Slot if `asChild` is true, else render a standard button.
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} // Merge variant and custom classes
        ref={ref}
        {...props} // Spread additional button attributes
      />
    )
  }
)
Button.displayName = "Button" // Explicit display name for better debugging.

export { Button, buttonVariants }
