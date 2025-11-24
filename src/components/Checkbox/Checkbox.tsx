import React, { useEffect, useRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const checkboxContainerVariants = cva(
  "relative inline-flex items-center justify-center shrink-0 transition-all duration-200",
  {
    variants: {
      checkboxSize: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
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
      variant = "default", // DEFAULT VALUE!
      checkboxSize = "md",
      labelPosition = "right",
      id,
      disabled,
      required,
      checked,
      defaultChecked, // Accept defaultChecked
      onChange,
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

    // Determine if controlled
    const isControlled = checked !== undefined;

    // Track internal checked state (use defaultChecked as initial value)
    const [internalChecked, setInternalChecked] = useState(
      defaultChecked || false
    );

    // Sync with external checked prop (controlled mode only)
    useEffect(() => {
      if (isControlled && checked !== undefined) {
        setInternalChecked(checked);
      }
    }, [checked, isControlled]);

    // Handle indeterminate state
    useEffect(() => {
      const checkbox = checkboxRef.current || (ref as any)?.current;
      if (checkbox) {
        checkbox.indeterminate = indeterminate;
      }
    }, [indeterminate, ref]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalChecked(e.target.checked);
      }
      onChange?.(e);
    };

    const isChecked = isControlled ? checked : internalChecked;

    // Smaller padding so gradient shows more
    const checkmarkPadding = {
      sm: "p-[3px]",
      md: "p-1",
      lg: "p-[5px]",
    };

    const checkbox = (
      <div className={cn(checkboxContainerVariants({ checkboxSize }))}>
        {/* Hidden actual input */}
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
          checked={isChecked}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? errorId : helperText ? helperTextId : undefined
          }
          className="sr-only"
          onChange={handleChange}
          {...props}
        />

        {/* Visual checkbox - EXACT SAME STRUCTURE AS RADIO */}
        <div
          className={cn(
            "absolute inset-0 rounded-sm border-2 transition-all duration-200 cursor-pointer",
            !isChecked && !indeterminate && "border-gray-300",
            (isChecked || indeterminate) &&
              finalVariant === "default" &&
              "border-transparent gradient-aurora",
            (isChecked || indeterminate) &&
              finalVariant === "error" &&
              "border-red-500 bg-red-500",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => {
            if (!disabled) {
              const input = document.getElementById(
                checkboxId
              ) as HTMLInputElement;
              input?.click();
            }
          }}
        />

        {/* Checkmark */}
        {isChecked && !indeterminate && (
          <svg
            className={cn(
              "absolute inset-0 text-white pointer-events-none z-10",
              checkmarkPadding[checkboxSize]
            )}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"
              fill="currentColor"
            />
          </svg>
        )}

        {/* Indeterminate dash */}
        {indeterminate && (
          <svg
            className={cn(
              "absolute inset-0 text-white pointer-events-none z-10",
              checkmarkPadding[checkboxSize]
            )}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
