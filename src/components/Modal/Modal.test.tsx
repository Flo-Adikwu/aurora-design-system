import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { Modal } from "./Modal";

expect.extend(toHaveNoViolations);

describe("Modal", () => {
  let originalBodyOverflow: string;

  beforeEach(() => {
    originalBodyOverflow = document.body.style.overflow;
  });

  afterEach(() => {
    document.body.style.overflow = originalBodyOverflow;
  });

  describe("Rendering", () => {
    it("renders nothing when closed", () => {
      render(
        <Modal isOpen={false} onClose={() => {}}>
          Content
        </Modal>
      );
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renders when open", () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          Content
        </Modal>
      );
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("renders with title", () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Modal Title">
          Content
        </Modal>
      );
      expect(screen.getByText("Modal Title")).toBeInTheDocument();
    });

    it("renders children content", () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <p>Modal Content</p>
        </Modal>
      );
      expect(screen.getByText("Modal Content")).toBeInTheDocument();
    });

    it("renders footer", () => {
      render(
        <Modal
          isOpen={true}
          onClose={() => {}}
          footer={<button>Confirm</button>}
        >
          Content
        </Modal>
      );
      expect(screen.getByText("Confirm")).toBeInTheDocument();
    });

    it("shows close button by default", () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          Content
        </Modal>
      );
      expect(screen.getByLabelText("Close modal")).toBeInTheDocument();
    });

    it("hides close button when showCloseButton is false", () => {
      render(
        <Modal isOpen={true} onClose={() => {}} showCloseButton={false}>
          Content
        </Modal>
      );
      expect(screen.queryByLabelText("Close modal")).not.toBeInTheDocument();
    });

    it("renders different sizes", () => {
      const { rerender } = render(
        <Modal isOpen={true} onClose={() => {}} modalSize="sm">
          Content
        </Modal>
      );
      expect(screen.getByRole("dialog")).toHaveClass("max-w-sm");

      rerender(
        <Modal isOpen={true} onClose={() => {}} modalSize="md">
          Content
        </Modal>
      );
      expect(screen.getByRole("dialog")).toHaveClass("max-w-md");

      rerender(
        <Modal isOpen={true} onClose={() => {}} modalSize="lg">
          Content
        </Modal>
      );
      expect(screen.getByRole("dialog")).toHaveClass("max-w-lg");
    });
  });

  describe("Interactions", () => {
    it("calls onClose when close button clicked", async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          Content
        </Modal>
      );

      await user.click(screen.getByLabelText("Close modal"));
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when ESC key pressed", async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          Content
        </Modal>
      );

      await user.keyboard("{Escape}");
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("does not close on ESC when closeOnEsc is false", async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={handleClose} closeOnEsc={false}>
          Content
        </Modal>
      );

      await user.keyboard("{Escape}");
      expect(handleClose).not.toHaveBeenCalled();
    });

    it("calls onClose when overlay clicked", async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          Content
        </Modal>
      );

      const backdrop = screen.getByRole("dialog").parentElement;
      if (backdrop) {
        await user.click(backdrop);
        expect(handleClose).toHaveBeenCalledTimes(1);
      }
    });

    it("does not close when overlay clicked if closeOnOverlayClick is false", async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={handleClose} closeOnOverlayClick={false}>
          Content
        </Modal>
      );

      const backdrop = screen.getByRole("dialog").parentElement;
      if (backdrop) {
        await user.click(backdrop);
        expect(handleClose).not.toHaveBeenCalled();
      }
    });

    it("does not close when clicking inside modal", async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          <p>Modal Content</p>
        </Modal>
      );

      await user.click(screen.getByText("Modal Content"));
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe("Body Scroll Lock", () => {
    it("locks body scroll when modal opens", () => {
      const { rerender } = render(
        <Modal isOpen={false} onClose={() => {}}>
          Content
        </Modal>
      );
      expect(document.body.style.overflow).toBe("");

      rerender(
        <Modal isOpen={true} onClose={() => {}}>
          Content
        </Modal>
      );
      expect(document.body.style.overflow).toBe("hidden");
    });

    it("restores body scroll when modal closes", () => {
      const { rerender } = render(
        <Modal isOpen={true} onClose={() => {}}>
          Content
        </Modal>
      );
      expect(document.body.style.overflow).toBe("hidden");

      rerender(
        <Modal isOpen={false} onClose={() => {}}>
          Content
        </Modal>
      );
      expect(document.body.style.overflow).toBe("");
    });

    it("restores body scroll on unmount", () => {
      const { unmount } = render(
        <Modal isOpen={true} onClose={() => {}}>
          Content
        </Modal>
      );
      expect(document.body.style.overflow).toBe("hidden");

      unmount();
      expect(document.body.style.overflow).toBe("");
    });
  });

  describe("Focus Management", () => {
    it("focuses first focusable element when opened", async () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <button>First Button</button>
          <button>Second Button</button>
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByText("First Button")).toHaveFocus();
      });
    });

    it("traps focus within modal", async () => {
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <button>First</button>
          <button>Second</button>
          <button>Third</button>
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByText("First")).toHaveFocus();
      });

      // Tab through elements
      await user.tab();
      expect(screen.getByText("Second")).toHaveFocus();

      await user.tab();
      expect(screen.getByText("Third")).toHaveFocus();

      await user.tab();
      expect(screen.getByLabelText("Close modal")).toHaveFocus();

      // Tab from last element should go to first
      await user.tab();
      expect(screen.getByText("First")).toHaveFocus();
    });

    it("handles shift+tab for backwards navigation", async () => {
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <button>First</button>
          <button>Second</button>
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByText("First")).toHaveFocus();
      });

      // Shift+Tab from first element should go to last
      await user.tab({ shift: true });
      expect(screen.getByLabelText("Close modal")).toHaveFocus();
    });
  });

  describe("Accessibility", () => {
    it("has no accessibility violations", async () => {
      const { container } = render(
        <Modal isOpen={true} onClose={() => {}} title="Accessible Modal">
          <p>Content</p>
        </Modal>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has proper role", () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          Content
        </Modal>
      );
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("has aria-modal attribute", () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          Content
        </Modal>
      );
      expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
    });

    it("associates title with dialog", () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Dialog Title">
          Content
        </Modal>
      );
      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
      expect(screen.getByText("Dialog Title")).toHaveAttribute(
        "id",
        "modal-title"
      );
    });

    it("close button has accessible label", () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          Content
        </Modal>
      );
      expect(screen.getByLabelText("Close modal")).toBeInTheDocument();
    });

    it("backdrop is hidden from screen readers", () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          Content
        </Modal>
      );
      const backdrop = document.querySelector(".bg-black\\/50");
      expect(backdrop).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Custom Props", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Modal ref={ref} isOpen={true} onClose={() => {}}>
          Content
        </Modal>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("accepts custom className", () => {
      render(
        <Modal isOpen={true} onClose={() => {}} className="custom-class">
          Content
        </Modal>
      );
      expect(screen.getByRole("dialog")).toHaveClass("custom-class");
    });
  });

  describe("Controlled Behavior", () => {
    it("works as controlled component", async () => {
      const TestComponent = () => {
        const [isOpen, setIsOpen] = React.useState(false);
        return (
          <div>
            <button onClick={() => setIsOpen(true)}>Open Modal</button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <p>Modal Content</p>
            </Modal>
          </div>
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

      await user.click(screen.getByText("Open Modal"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      await user.click(screen.getByLabelText("Close modal"));
      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });
  });
});
