import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const tooltipVariants = cva(
  "absolute z-50 px-3 py-2 text-sm font-medium text-white rounded-lg shadow-lg animate-fade-in",
  {
    variants: {
      variant: {
        default: "gradient-aurora",
        dark: "bg-gray-900",
        light: "bg-white text-gray-900 border border-gray-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TooltipProps {
  /** Content to display in the tooltip */
  content: React.ReactNode;
  /** Element that triggers the tooltip */
  children: React.ReactElement;
  /** Position of the tooltip relative to trigger */
  position?: "top" | "bottom" | "left" | "right";
  /** Visual variant of the tooltip */
  variant?: "default" | "dark" | "light";
  /** Delay before showing tooltip (ms) */
  delay?: number;
  /** Whether tooltip is disabled */
  disabled?: boolean;
  /** Custom className for tooltip */
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  variant = "default",
  delay = 200,
  disabled = false,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | undefined>(undefined);

  // Calculate tooltip position
  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const gap = 8; // Gap between trigger and tooltip

    let top = 0;
    let left = 0;

    switch (position) {
      case "top":
        top = triggerRect.top + scrollY - tooltipRect.height - gap;
        left =
          triggerRect.left +
          scrollX +
          (triggerRect.width - tooltipRect.width) / 2;
        break;
      case "bottom":
        top = triggerRect.bottom + scrollY + gap;
        left =
          triggerRect.left +
          scrollX +
          (triggerRect.width - tooltipRect.width) / 2;
        break;
      case "left":
        top =
          triggerRect.top +
          scrollY +
          (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left + scrollX - tooltipRect.width - gap;
        break;
      case "right":
        top =
          triggerRect.top +
          scrollY +
          (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + scrollX + gap;
        break;
    }

    // Keep tooltip within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 0) left = gap;
    if (left + tooltipRect.width > viewportWidth) {
      left = viewportWidth - tooltipRect.width - gap;
    }
    if (top < scrollY) top = scrollY + gap;
    if (top + tooltipRect.height > scrollY + viewportHeight) {
      top = scrollY + viewportHeight - tooltipRect.height - gap;
    }

    setTooltipPosition({ top, left });
  };

  const showTooltip = () => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      window.addEventListener("scroll", calculatePosition);
      window.addEventListener("resize", calculatePosition);
    }

    return () => {
      window.removeEventListener("scroll", calculatePosition);
      window.removeEventListener("resize", calculatePosition);
    };
  }, [isVisible]);

  // Clone child element and attach event handlers
  const trigger = React.cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: (e: React.MouseEvent<Element>) => {
      showTooltip();
      const childProps = children.props as any;
      childProps.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent<Element>) => {
      hideTooltip();
      const childProps = children.props as any;
      childProps.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent<Element>) => {
      showTooltip();
      const childProps = children.props as any;
      childProps.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent<Element>) => {
      hideTooltip();
      const childProps = children.props as any;
      childProps.onBlur?.(e);
    },
  } as any);

  // Arrow styles based on position
  const arrowStyles = {
    top: "bottom-[-6px] left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent",
    bottom:
      "top-[-6px] left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent",
    left: "right-[-6px] top-1/2 -translate-y-1/2 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent",
    right:
      "left-[-6px] top-1/2 -translate-y-1/2 border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent",
  };

  const arrowColorClasses = {
    default:
      "border-t-purple-600 border-b-purple-600 border-l-purple-600 border-r-purple-600",
    dark: "border-t-gray-900 border-b-gray-900 border-l-gray-900 border-r-gray-900",
    light: "border-t-white border-b-white border-l-white border-r-white",
  };

  const tooltipElement = isVisible
    ? createPortal(
        <div
          ref={tooltipRef}
          role="tooltip"
          className={cn(tooltipVariants({ variant }), className)}
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          {content}
          {/* Arrow */}
          <div
            className={cn(
              "absolute",
              arrowStyles[position],
              arrowColorClasses[variant]
            )}
          />
        </div>,
        document.body
      )
    : null;

  return (
    <>
      {trigger}
      {tooltipElement}
    </>
  );
};

Tooltip.displayName = "Tooltip";
