import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const badgeVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        primary: "bg-aurora-100 text-aurora-800 hover:bg-aurora-200",
        success: "bg-green-100 text-green-800 hover:bg-green-200",
        warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        error: "bg-red-100 text-red-800 hover:bg-red-200",
        info: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        gradient: "gradient-aurora text-white shadow-aurora-sm",
      },
      badgeSize: {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-2.5 py-0.5",
        lg: "text-base px-3 py-1",
      },
      shape: {
        rounded: "rounded",
        pill: "rounded-full",
        square: "rounded-none",
      },
      dot: {
        true: "pl-1.5",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      badgeSize: "md",
      shape: "pill",
      dot: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    Omit<VariantProps<typeof badgeVariants>, "dot"> {
  /** Whether to show a dot indicator */
  dot?: boolean;
  /** Size of the badge */
  badgeSize?: "sm" | "md" | "lg";
  /** Color variant */
  variant?:
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "gradient";
  /** Shape of the badge */
  shape?: "rounded" | "pill" | "square";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, variant, badgeSize, shape, dot = false, children, ...props },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          badgeVariants({ variant, badgeSize, shape, dot }),
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "inline-block w-1.5 h-1.5 rounded-full mr-1.5",
              variant === "default" && "bg-gray-500",
              variant === "primary" && "bg-aurora-600",
              variant === "success" && "bg-green-600",
              variant === "warning" && "bg-yellow-600",
              variant === "error" && "bg-red-600",
              variant === "info" && "bg-blue-600",
              variant === "gradient" && "bg-white"
            )}
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

// Notification Badge Component (for counts)
export interface NotificationBadgeProps extends Omit<BadgeProps, "children"> {
  /** Count to display */
  count: number;
  /** Max count to display before showing + */
  max?: number;
  /** Whether to show when count is 0 */
  showZero?: boolean;
}

export const NotificationBadge = React.forwardRef<
  HTMLSpanElement,
  NotificationBadgeProps
>(
  (
    {
      count,
      max = 99,
      showZero = false,
      variant = "error",
      badgeSize = "sm",
      ...props
    },
    ref
  ) => {
    if (count === 0 && !showZero) {
      return null;
    }

    const displayCount = count > max ? `${max}+` : count.toString();

    return (
      <Badge
        ref={ref}
        variant={variant}
        badgeSize={badgeSize}
        shape="pill"
        {...props}
      >
        {displayCount}
      </Badge>
    );
  }
);

NotificationBadge.displayName = "NotificationBadge";
