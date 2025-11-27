import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const cardVariants = cva("rounded-lg bg-white transition-all duration-200", {
  variants: {
    variant: {
      default: "border border-gray-200 shadow-sm",
      elevated: "shadow-md hover:shadow-lg",
      outlined: "border-2 border-gray-300",
      gradient: "text-white shadow-md border-0", // Base styles for gradient
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
    hoverable: {
      true: "hover:shadow-lg hover:-translate-y-1 cursor-pointer",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
    hoverable: false,
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      hoverable,
      header,
      footer,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const hasHeaderOrFooter = header || footer;
    const contentPadding = hasHeaderOrFooter ? "none" : padding;

    // Apply inline gradient when variant is gradient
    const gradientStyle =
      variant === "gradient"
        ? {
            background:
              "linear-gradient(135deg, #0ea5e9 0%, #a855f7 50%, #ec4899 100%)",
            backgroundSize: "200% 200%",
            ...style,
          }
        : style;

    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, padding: contentPadding, hoverable }),
          className
        )}
        style={gradientStyle}
        {...props}
      >
        {header && (
          <div
            className={cn(
              "border-b",
              variant === "gradient" ? "border-white/20" : "border-gray-200",
              padding === "sm" && "px-4 py-3",
              padding === "md" && "px-6 py-4",
              padding === "lg" && "px-8 py-5"
            )}
          >
            {header}
          </div>
        )}

        <div
          className={cn(
            hasHeaderOrFooter && padding === "sm" && "p-4",
            hasHeaderOrFooter && padding === "md" && "p-6",
            hasHeaderOrFooter && padding === "lg" && "p-8"
          )}
        >
          {children}
        </div>

        {footer && (
          <div
            className={cn(
              "border-t",
              variant === "gradient" ? "border-white/20" : "border-gray-200",
              padding === "sm" && "px-4 py-3",
              padding === "md" && "px-6 py-4",
              padding === "lg" && "px-8 py-5"
            )}
          >
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = "Card";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, actions, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-start justify-between", className)}
        {...props}
      >
        <div className="flex-1">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
          {!title && !subtitle && children}
        </div>
        {actions && <div className="ml-4 flex-shrink-0">{actions}</div>}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center" | "right" | "between";
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, align = "left", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2",
          align === "left" && "justify-start",
          align === "center" && "justify-center",
          align === "right" && "justify-end",
          align === "between" && "justify-between",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";
