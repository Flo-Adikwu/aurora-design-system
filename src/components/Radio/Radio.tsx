import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const radioVariants = cva(
  "peer h-5 w-5 shrink-0 rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-gray-300 focus:ring-aurora-500 checked:border-aurora-500 checked:bg-aurora-500",
        error:
          "border-red-500 focus:ring-red-500 checked:border-red-500 checked:bg-red-500",
      },
      radioSize: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      radioSize: "md",
    },
  }
);

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
  helperText?: string;
}

export interface RadioGroupProps
  extends Omit<VariantProps<typeof radioVariants>, "size"> {
  /** Label for the radio group */
  label?: string;
  /** Array of radio options */
  options: RadioOption[];
  /** Currently selected value */
  value?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Name attribute for all radios in the group */
  name?: string;
  /** Error message displayed below the group */
  error?: string;
  /** Helper text displayed below the group when no error */
  helperText?: string;
  /** Layout direction */
  layout?: "vertical" | "horizontal";
  /** Visual variant */
  variant?: "default" | "error";
  /** Size of the radio buttons */
  radioSize?: "sm" | "md" | "lg";
  /** Whether the group is disabled */
  disabled?: boolean;
  /** Whether the group is required */
  required?: boolean;
  /** Custom className */
  className?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      name,
      error,
      helperText,
      layout = "vertical",
      variant,
      radioSize = "md",
      disabled = false,
      required = false,
      className,
    },
    ref
  ) => {
    const groupId = React.useId();
    const groupName = name || `radio-group-${groupId}`;
    const errorId = `${groupId}-error`;
    const helperTextId = `${groupId}-helper`;
    const hasError = Boolean(error);
    const finalVariant = hasError ? "error" : variant;

    return (
      <div ref={ref} className={cn("flex flex-col gap-3", className)}>
        {label && (
          <div className="text-sm font-medium text-gray-700">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </div>
        )}

        <div
          role="radiogroup"
          aria-labelledby={label ? `${groupId}-label` : undefined}
          aria-describedby={
            hasError ? errorId : helperText ? helperTextId : undefined
          }
          aria-invalid={hasError}
          className={cn(
            "flex gap-4",
            layout === "vertical" ? "flex-col" : "flex-row flex-wrap"
          )}
        >
          {options.map((option) => (
            <Radio
              key={option.value}
              name={groupName}
              value={option.value}
              label={option.label}
              helperText={option.helperText}
              checked={value === option.value}
              onChange={() => onChange?.(option.value)}
              disabled={disabled || option.disabled}
              variant={finalVariant}
              radioSize={radioSize}
            />
          ))}
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

RadioGroup.displayName = "RadioGroup";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Label text displayed next to the radio */
  label?: string;
  /** Helper text displayed below the label */
  helperText?: string;
  /** Visual variant of the radio */
  variant?: "default" | "error";
  /** Size of the radio button */
  radioSize?: "sm" | "md" | "lg";
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      label,
      helperText,
      variant = "default",
      radioSize = "md",
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const radioId = id || `radio-${React.useId()}`;
    const helperTextId = helperText ? `${radioId}-helper` : undefined;

    return (
      <div className="flex items-start gap-2">
        <div className="relative inline-flex items-center">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            disabled={disabled}
            aria-describedby={helperTextId}
            className={cn(
              radioVariants({ variant, radioSize }),
              "cursor-pointer appearance-none",
              className
            )}
            {...props}
          />
          {/* Custom radio dot */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 peer-checked:opacity-100",
              radioSize === "sm" && "p-1",
              radioSize === "md" && "p-1.5",
              radioSize === "lg" && "p-2"
            )}
            aria-hidden="true"
          >
            <div className="h-full w-full rounded-full bg-white" />
          </div>
        </div>

        {(label || helperText) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <label
                htmlFor={radioId}
                className={cn(
                  "text-sm font-medium text-gray-700 cursor-pointer select-none",
                  disabled && "cursor-not-allowed opacity-50"
                )}
              >
                {label}
              </label>
            )}
            {helperText && (
              <p
                id={helperTextId}
                className={cn(
                  "text-xs text-gray-500",
                  disabled && "opacity-50"
                )}
              >
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";
