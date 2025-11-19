import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { Button } from "./Button";

expect.extend(toHaveNoViolations);

describe("Button", () => {
  describe("Rendering", () => {
    it("renders with children", () => {
      render(<Button>Click me</Button>);
      expect(
        screen.getByRole("button", { name: /click me/i })
      ).toBeInTheDocument();
    });

    it("renders all variants correctly", () => {
      const { rerender } = render(<Button variant="primary">Primary</Button>);
      expect(screen.getByRole("button")).toHaveClass("gradient-aurora");

      rerender(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByRole("button")).toHaveClass("bg-purple-500");

      rerender(<Button variant="outline">Outline</Button>);
      expect(screen.getByRole("button")).toHaveClass("border-2");

      rerender(<Button variant="ghost">Ghost</Button>);
      expect(screen.getByRole("button")).toHaveClass("text-aurora-700");
    });

    it("renders all sizes correctly", () => {
      const { rerender } = render(<Button size="sm">Small</Button>);
      expect(screen.getByRole("button")).toHaveClass("h-9");

      rerender(<Button size="md">Medium</Button>);
      expect(screen.getByRole("button")).toHaveClass("h-11");

      rerender(<Button size="lg">Large</Button>);
      expect(screen.getByRole("button")).toHaveClass("h-13");
    });

    it("renders full width when specified", () => {
      render(<Button fullWidth>Full Width</Button>);
      expect(screen.getByRole("button")).toHaveClass("w-full");
    });

    it("renders with left icon", () => {
      render(
        <Button leftIcon={<span data-testid="left-icon">→</span>}>
          With Icon
        </Button>
      );
      expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    });

    it("renders with right icon", () => {
      render(
        <Button rightIcon={<span data-testid="right-icon">←</span>}>
          With Icon
        </Button>
      );
      expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    });
  });

  describe("Loading State", () => {
    it("shows loading spinner when isLoading is true", () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-busy", "true");
      expect(button).toBeDisabled();
    });

    it("hides icons when loading", () => {
      render(
        <Button
          isLoading
          leftIcon={<span data-testid="left-icon">→</span>}
          rightIcon={<span data-testid="right-icon">←</span>}
        >
          Loading
        </Button>
      );
      expect(screen.queryByTestId("left-icon")).not.toBeInTheDocument();
      expect(screen.queryByTestId("right-icon")).not.toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("handles click events", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click me</Button>);
      await user.click(screen.getByRole("button"));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not trigger click when disabled", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      );
      await user.click(screen.getByRole("button"));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("does not trigger click when loading", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button onClick={handleClick} isLoading>
          Loading
        </Button>
      );
      await user.click(screen.getByRole("button"));

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("has no accessibility violations", async () => {
      const { container } = render(<Button>Accessible Button</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has proper ARIA attributes when loading", () => {
      render(<Button isLoading>Loading</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
    });

    it("is keyboard accessible", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Keyboard</Button>);
      const button = screen.getByRole("button");

      button.focus();
      expect(button).toHaveFocus();

      await user.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalledTimes(1);

      await user.keyboard(" ");
      expect(handleClick).toHaveBeenCalledTimes(2);
    });
  });

  describe("Custom Props", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Button</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("accepts custom className", () => {
      render(<Button className="custom-class">Custom</Button>);
      expect(screen.getByRole("button")).toHaveClass("custom-class");
    });

    it("forwards additional props", () => {
      render(
        <Button data-testid="custom-button" aria-label="Custom label">
          Button
        </Button>
      );
      expect(screen.getByTestId("custom-button")).toBeInTheDocument();
      expect(screen.getByLabelText("Custom label")).toBeInTheDocument();
    });
  });
});
