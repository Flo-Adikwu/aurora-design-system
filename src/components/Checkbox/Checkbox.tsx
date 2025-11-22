import React, { useEffect, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const checkboxVariants = cva(
  "peer h-5 w-5 shrink-0 rounded border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-gray-300 focus:ring-aurora-500 checked:bg-aurora-500 checked:border-aurora-500",
        error:
          "border-red-500 focus:ring-red-500 checked:bg-red-500 checked:border-red-500",
      },
      checkboxSize: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      checkboxSize: "md",
    },
  }
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Label text displayed next to the checkbox */
  label?: string;
  /** Error message displayed below the checkbox */
  error?: string;
  /** Helper text displayed below the checkbox when no error */
  helperText?: string;
  /** Whether the checkbox is in an indeterminate state */
  indeterminate?: boolean;
  /** Visual variant of the checkbox */
  variant?: "default" | "error";
  /** Size of the checkbox */
  checkboxSize?: "sm" | "md" | "lg";
  /** Position of the label */
  labelPosition?: "left" | "right";
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      indeterminate = false,
      variant,
      checkboxSize = "md",
      labelPosition = "right",
      id,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const checkboxRef = useRef<HTMLInputElement>(null);
    const checkboxId = id || `checkbox-${React.useId()}`;
    const errorId = `${checkboxId}-error`;
    const helperTextId = `${checkboxId}-helper`;
    const hasError = Boolean(error);
    const finalVariant = hasError ? "error" : variant;

    // Handle indeterminate state
    useEffect(() => {
      const checkbox = checkboxRef.current || (ref as any)?.current;
      if (checkbox) {
        checkbox.indeterminate = indeterminate;
      }
    }, [indeterminate, ref]);

    const checkbox = (
      <div className="relative inline-flex items-center">
        <input
          ref={(element) => {
            checkboxRef.current = element;
            if (typeof ref === "function") {
              ref(element);
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLInputElement | null>).current =
                element;
            }
          }}
          type="checkbox"
          id={checkboxId}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? errorId : helperText ? helperTextId : undefined
          }
          className={cn(
            checkboxVariants({ variant: finalVariant, checkboxSize }),
            "cursor-pointer appearance-none",
            className
          )}
          {...props}
        />
        {/* Custom checkmark */}
        <svg
          className={cn(
            "pointer-events-none absolute left-0 h-full w-full text-white opacity-0 transition-opacity duration-200",
            "peer-checked:opacity-100",
            checkboxSize === "sm" && "p-0.5",
            checkboxSize === "md" && "p-1",
            checkboxSize === "lg" && "p-1.5"
          )}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"
            fill="currentColor"
          />
        </svg>
        {/* Indeterminate dash */}
        {indeterminate && (
          <svg
            className={cn(
              "pointer-events-none absolute left-0 h-full w-full text-white",
              checkboxSize === "sm" && "p-1",
              checkboxSize === "md" && "p-1.5",
              checkboxSize === "lg" && "p-2"
            )}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect
              x="3"
              y="7"
              width="10"
              height="2"
              rx="1"
              fill="currentColor"
            />
          </svg>
        )}
      </div>
    );

    const labelElement = label && (
      <label
        htmlFor={checkboxId}
        className={cn(
          "text-sm font-medium text-gray-700 cursor-pointer select-none",
          disabled && "cursor-not-allowed opacity-50",
          labelPosition === "left" ? "mr-2" : "ml-2"
        )}
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
    );

    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center">
          {labelPosition === "left" && labelElement}
          {checkbox}
          {labelPosition === "right" && labelElement}
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

Checkbox.displayName = "Checkbox";
