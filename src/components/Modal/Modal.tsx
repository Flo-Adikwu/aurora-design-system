import React, { useEffect, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const modalVariants = cva(
  "relative bg-white rounded-aurora shadow-aurora-xl transform transition-all",
  {
    variants: {
      modalSize: {
        sm: "max-w-sm w-full",
        md: "max-w-md w-full",
        lg: "max-w-lg w-full",
        xl: "max-w-xl w-full",
        full: "max-w-7xl w-full mx-4",
      },
    },
    defaultVariants: {
      modalSize: "md",
    },
  }
);

export interface ModalProps
  extends Omit<VariantProps<typeof modalVariants>, "size"> {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Footer content (typically buttons) */
  footer?: React.ReactNode;
  /** Size of the modal */
  modalSize?: "sm" | "md" | "lg" | "xl" | "full";
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Whether clicking overlay closes modal */
  closeOnOverlayClick?: boolean;
  /** Whether pressing ESC closes modal */
  closeOnEsc?: boolean;
  /** Custom className for modal content */
  className?: string;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      children,
      footer,
      modalSize = "md",
      showCloseButton = true,
      closeOnOverlayClick = true,
      closeOnEsc = true,
      className,
    },
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
      if (isOpen) {
        previousActiveElement.current = document.activeElement as HTMLElement;
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }

      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);

    // Handle ESC key
    useEffect(() => {
      if (!isOpen || !closeOnEsc) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, closeOnEsc, onClose]);

    // Focus trap
    useEffect(() => {
      if (!isOpen) {
        // Restore focus when modal closes
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
        return;
      }

      const modal = modalRef.current;
      if (!modal) return;

      // Focus first focusable element
      const focusableElements = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (firstElement) {
        firstElement.focus();
      }

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      modal.addEventListener("keydown", handleTab as any);
      return () => modal.removeEventListener("keydown", handleTab as any);
    }, [isOpen]);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose();
      }
    };

    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
        onClick={handleOverlayClick}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Modal */}
        <div
          ref={(node) => {
            modalRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLDivElement | null>).current =
                node;
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
          className={cn(
            modalVariants({ modalSize }),
            "relative z-10 max-h-[90vh] flex flex-col animate-slide-up",
            className
          )}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-start justify-between p-6 border-b border-gray-200">
              {title && (
                <h2
                  id="modal-title"
                  className="text-xl font-semibold text-gray-900"
                >
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-auto -mr-2 -mt-2 rounded-aurora p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-aurora-500"
                  aria-label="Close modal"
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";
