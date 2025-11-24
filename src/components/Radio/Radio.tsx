import React, { useState, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const radioContainerVariants = cva(
  "relative inline-flex items-center justify-center shrink-0 transition-all duration-200",
  {
    variants: {
      radioSize: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
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

export interface RadioGroupProps {
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

    // Internal state for uncontrolled mode
    const [selectedValue, setSelectedValue] = useState(value);

    // Sync with external value prop
    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    const handleChange = (optionValue: string) => {
      setSelectedValue(optionValue);
      onChange?.(optionValue);
    };

    const currentValue = value !== undefined ? value : selectedValue;

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
              checked={currentValue === option.value}
              onChange={() => handleChange(option.value)}
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
      checked,
      onChange,
      ...props
    },
    ref
  ) => {
    const radioId = id || `radio-${React.useId()}`;
    const helperTextId = helperText ? `${radioId}-helper` : undefined;

    // Track internal checked state
    const [internalChecked, setInternalChecked] = useState(checked || false);

    // Sync with external checked prop
    useEffect(() => {
      if (checked !== undefined) {
        setInternalChecked(checked);
      }
    }, [checked]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalChecked(e.target.checked);
      onChange?.(e);
    };

    const isChecked = checked !== undefined ? checked : internalChecked;

    // Smaller dot padding so gradient shows more around it
    const dotPadding = {
      sm: "p-[3px]", // Smaller padding = bigger gradient ring
      md: "p-1", // Smaller padding = bigger gradient ring
      lg: "p-[5px]", // Smaller padding = bigger gradient ring
    };

    return (
      <div className="flex items-start gap-2">
        <div className={cn(radioContainerVariants({ radioSize }))}>
          {/* Hidden actual input */}
          <input
            ref={ref}
            type="radio"
            id={radioId}
            disabled={disabled}
            checked={isChecked}
            aria-describedby={helperTextId}
            className="sr-only"
            onChange={handleChange}
            {...props}
          />

          {/* Visual radio - FULL gradient background when checked */}
          <div
            className={cn(
              "absolute inset-0 rounded-full border-2 transition-all duration-200 cursor-pointer",
              !isChecked && "border-gray-300",
              isChecked &&
                variant === "default" &&
                "border-transparent gradient-aurora",
              isChecked && variant === "error" && "border-red-500 bg-red-500",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => {
              if (!disabled) {
                const input = document.getElementById(
                  radioId
                ) as HTMLInputElement;
                input?.click();
              }
            }}
          />

          {/* Radio dot - SMALLER white dot so gradient ring shows */}
          {isChecked && (
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center pointer-events-none z-10",
                dotPadding[radioSize]
              )}
            >
              <div className="h-full w-full rounded-full bg-white" />
            </div>
          )}
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
