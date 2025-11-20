import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

const inputVariants = cva(
  "w-full rounded-aurora border bg-white px-4 py-2 text-base transition-all duration-200 placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-gray-300 focus:border-aurora-500 focus:ring-2 focus:ring-aurora-500/20",
        error:
          "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20",
      },
      inputSize: {
        sm: "h-9 text-sm px-3",
        md: "h-11 text-base px-4",
        lg: "h-13 text-lg px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Label text displayed above the input */
  label?: string;
  /** Error message displayed below the input */
  error?: string;
  /** Helper text displayed below the input when no error */
  helperText?: string;
  /** Icon to display on the left side of the input */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right side of the input */
  rightIcon?: React.ReactNode;
  /** Visual variant of the input */
  variant?: "default" | "error";
  /** Size of the input */
  inputSize?: "sm" | "md" | "lg";
  /** Full width input */
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant,
      inputSize,
      fullWidth = true,
      id,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${React.useId()}`;
    const errorId = `${inputId}-error`;
    const helperTextId = `${inputId}-helper`;
    const hasError = Boolean(error);
    const finalVariant = hasError ? "error" : variant;

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? errorId : helperText ? helperTextId : undefined
            }
            className={cn(
              inputVariants({ variant: finalVariant, inputSize }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={helperTextId} className="text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
