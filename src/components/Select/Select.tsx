import React, { useState, useRef, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const selectVariants = cva(
  "relative w-full rounded-aurora border bg-white transition-all duration-200 focus-within:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-gray-300 focus-within:border-aurora-500 focus-within:ring-2 focus-within:ring-aurora-500/20",
        error:
          "border-red-500 focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-500/20",
      },
      selectSize: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      selectSize: "md",
    },
  }
);

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<VariantProps<typeof selectVariants>, "size"> {
  /** Label text displayed above the select */
  label?: string;
  /** Error message displayed below the select */
  error?: string;
  /** Helper text displayed below the select when no error */
  helperText?: string;
  /** Array of options to display */
  options: SelectOption[];
  /** Currently selected value */
  value?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Size of the select */
  selectSize?: "sm" | "md" | "lg";
  /** Visual variant of the select */
  variant?: "default" | "error";
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the select is required */
  required?: boolean;
  /** Full width select */
  fullWidth?: boolean;
  /** Custom className */
  className?: string;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      value,
      onChange,
      placeholder = "Select an option",
      selectSize = "md",
      variant,
      disabled = false,
      required = false,
      fullWidth = true,
      className,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const selectRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const selectId = React.useId();
    const errorId = `${selectId}-error`;
    const helperTextId = `${selectId}-helper`;
    const hasError = Boolean(error);
    const finalVariant = hasError ? "error" : variant;

    const selectedOption = options.find((opt) => opt.value === value);

    const sizeClasses = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-4 text-base",
      lg: "h-13 px-5 text-lg",
    };

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          if (isOpen && focusedIndex >= 0) {
            const option = options[focusedIndex];
            if (!option.disabled) {
              onChange?.(option.value);
              setIsOpen(false);
            }
          } else {
            setIsOpen(!isOpen);
          }
          break;
        case "Escape":
          setIsOpen(false);
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            const nextIndex = Math.min(focusedIndex + 1, options.length - 1);
            setFocusedIndex(nextIndex);
            // Scroll to focused item
            if (listRef.current) {
              const item = listRef.current.children[nextIndex] as HTMLElement;
              item?.scrollIntoView({ block: "nearest" });
            }
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (isOpen) {
            const prevIndex = Math.max(focusedIndex - 1, 0);
            setFocusedIndex(prevIndex);
            // Scroll to focused item
            if (listRef.current) {
              const item = listRef.current.children[prevIndex] as HTMLElement;
              item?.scrollIntoView({ block: "nearest" });
            }
          }
          break;
        case "Home":
          if (isOpen) {
            e.preventDefault();
            setFocusedIndex(0);
          }
          break;
        case "End":
          if (isOpen) {
            e.preventDefault();
            setFocusedIndex(options.length - 1);
          }
          break;
      }
    };

    const handleSelect = (option: SelectOption) => {
      if (!option.disabled) {
        onChange?.(option.value);
        setIsOpen(false);
      }
    };

    return (
      <div
        className={cn(
          "flex flex-col gap-1.5",
          fullWidth && "w-full",
          className
        )}
        ref={ref}
      >
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div
          ref={selectRef}
          className={cn(selectVariants({ variant: finalVariant, selectSize }))}
        >
          <button
            id={selectId}
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-labelledby={label ? `${selectId}-label` : undefined}
            aria-describedby={
              hasError ? errorId : helperText ? helperTextId : undefined
            }
            aria-invalid={hasError}
            className={cn(
              "flex w-full items-center justify-between",
              sizeClasses[selectSize],
              "focus:outline-none",
              !selectedOption && "text-gray-400"
            )}
          >
            <span className="truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <svg
              className={cn(
                "ml-2 h-5 w-5 text-gray-400 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isOpen && !disabled && (
            <ul
              ref={listRef}
              role="listbox"
              className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-aurora border border-gray-200 bg-white py-1 shadow-aurora-lg animate-slide-up"
              aria-labelledby={selectId}
            >
              {options.map((option, index) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={option.value === value}
                  aria-disabled={option.disabled}
                  className={cn(
                    "cursor-pointer px-4 py-2 transition-colors duration-150",
                    option.value === value &&
                      "bg-aurora-50 font-medium text-aurora-700",
                    focusedIndex === index && "bg-gray-100",
                    option.disabled
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-gray-50",
                    sizeClasses[selectSize]
                  )}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
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

Select.displayName = "Select";
