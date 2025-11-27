import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "bg-purple-500 text-white hover:bg-purple-600 hover:shadow-lg",
        outline:
          "border-2 border-blue-500 text-blue-700 hover:bg-blue-50 hover:border-blue-600",
        ghost: "text-blue-700 hover:bg-blue-50 hover:text-blue-900",
        danger: "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg",
        gradient:
          "text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-lg",
        md: "h-11 px-6 text-base rounded-xl",
        lg: "h-13 px-8 text-lg rounded-xl",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Optional loading state */
  isLoading?: boolean;
  /** Optional icon to display before text */
  leftIcon?: React.ReactNode;
  /** Optional icon to display after text */
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    // Apply gradient background for primary and gradient variants
    const backgroundStyle =
      variant === "primary" || variant === "gradient"
        ? {
            background:
              "linear-gradient(135deg, #0ea5e9 0%, #a855f7 50%, #ec4899 100%)",
            backgroundSize: "200% 200%",
            color: "white",
          }
        : {};

    const combinedStyle = {
      ...backgroundStyle,
      ...style,
    };

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        style={combinedStyle}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
