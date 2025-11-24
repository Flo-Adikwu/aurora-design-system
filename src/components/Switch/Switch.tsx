import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const switchVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "focus:ring-aurora-500",
        error: "focus:ring-red-500",
      },
      switchSize: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      switchSize: "md",
    },
  }
);

const switchThumbVariants = cva(
  "pointer-events-none inline-block transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
  {
    variants: {
      switchSize: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      switchSize: "md",
    },
  }
);

export interface SwitchProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "onChange"
  > {
  /** Label text displayed next to the switch */
  label?: string;
  /** Error message displayed below the switch */
  error?: string;
  /** Helper text displayed below the switch when no error */
  helperText?: string;
  /** Visual variant of the switch */
  variant?: "default" | "error";
  /** Size of the switch */
  switchSize?: "sm" | "md" | "lg";
  /** Position of the label */
  labelPosition?: "left" | "right";
  /** Whether the switch is checked */
  checked?: boolean;
  /** Callback when switch state changes */
  onChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      variant = "default",
      switchSize = "md",
      labelPosition = "right",
      checked,
      onChange,
      disabled = false,
      required = false,
      id,
      ...props
    },
    ref
  ) => {
    const switchId = id || `switch-${React.useId()}`;
    const errorId = `${switchId}-error`;
    const helperTextId = `${switchId}-helper`;
    const hasError = Boolean(error);
    const finalVariant = hasError ? "error" : variant;

    // Support uncontrolled mode
    const [internalChecked, setInternalChecked] = React.useState(false);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      onChange?.(newChecked);
    };

    const thumbTranslateClasses = {
      sm: isChecked ? "translate-x-4" : "translate-x-0",
      md: isChecked ? "translate-x-5" : "translate-x-0",
      lg: isChecked ? "translate-x-7" : "translate-x-0",
    };

    const switchElement = (
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-labelledby={label ? `${switchId}-label` : undefined}
        aria-describedby={
          hasError ? errorId : helperText ? helperTextId : undefined
        }
        aria-invalid={hasError}
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            const newChecked = !isChecked;
            if (!isControlled) {
              setInternalChecked(newChecked);
            }
            onChange?.(newChecked);
          }
        }}
        className={cn(
          switchVariants({ variant: finalVariant, switchSize }),
          isChecked
            ? finalVariant === "error"
              ? "bg-red-500"
              : "gradient-aurora"
            : "bg-gray-200",
          className
        )}
      >
        <span className="sr-only">{label || "Toggle switch"}</span>
        <input
          ref={ref}
          type="checkbox"
          id={switchId}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className="sr-only"
          {...props}
        />
        <span
          aria-hidden="true"
          className={cn(
            switchThumbVariants({ switchSize }),
            thumbTranslateClasses[switchSize]
          )}
        />
      </button>
    );

    const labelElement = label && (
      <label
        id={`${switchId}-label`}
        htmlFor={switchId}
        className={cn(
          "text-sm font-medium text-gray-700 cursor-pointer select-none",
          disabled && "cursor-not-allowed opacity-50",
          labelPosition === "left" ? "mr-3" : "ml-3"
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
          {switchElement}
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

Switch.displayName = "Switch";
