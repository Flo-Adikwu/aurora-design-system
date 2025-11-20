import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { Input } from "./Input";

expect.extend(toHaveNoViolations);

describe("Input", () => {
  describe("Rendering", () => {
    it("renders with placeholder", () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
    });

    it("renders with label", () => {
      render(<Input label="Email" />);
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
    });

    it("renders with helper text", () => {
      render(<Input helperText="This is a helper text" />);
      expect(screen.getByText("This is a helper text")).toBeInTheDocument();
    });

    it("renders with error message", () => {
      render(<Input error="This field is required" />);
      expect(screen.getByText("This field is required")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveTextContent(
        "This field is required"
      );
    });

    it("shows required indicator when required", () => {
      render(<Input label="Email" required />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("renders with left icon", () => {
      render(
        <Input
          leftIcon={<span data-testid="left-icon">🔍</span>}
          placeholder="Search"
        />
      );
      expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    });

    it("renders with right icon", () => {
      render(
        <Input
          rightIcon={<span data-testid="right-icon">👁️</span>}
          placeholder="Password"
        />
      );
      expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    });

    it("renders all sizes correctly", () => {
      const { rerender } = render(<Input inputSize="sm" />);
      expect(screen.getByRole("textbox")).toHaveClass("h-9");

      rerender(<Input inputSize="md" />);
      expect(screen.getByRole("textbox")).toHaveClass("h-11");

      rerender(<Input inputSize="lg" />);
      expect(screen.getByRole("textbox")).toHaveClass("h-13");
    });

    it("applies error variant when error is present", () => {
      render(<Input error="Error message" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border-red-500");
    });
  });

  describe("Input Types", () => {
    it("renders as email input", () => {
      render(<Input type="email" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
    });

    it("renders as password input", () => {
      render(<Input type="password" />);
      const input = screen.getByPlaceholderText("");
      expect(input).toHaveAttribute("type", "password");
    });

    it("renders as number input", () => {
      render(<Input type="number" />);
      expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    });
  });

  describe("States", () => {
    it("can be disabled", () => {
      render(<Input disabled />);
      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("applies disabled styles when disabled", () => {
      render(<Input disabled />);
      expect(screen.getByRole("textbox")).toHaveClass("disabled:opacity-50");
    });

    it("shows error state", () => {
      render(<Input error="Invalid input" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("Interactions", () => {
    it("handles text input", async () => {
      const user = userEvent.setup();
      render(<Input />);
      const input = screen.getByRole("textbox");

      await user.type(input, "Hello World");
      expect(input).toHaveValue("Hello World");
    });

    it("handles onChange callback", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Input onChange={handleChange} />);

      await user.type(screen.getByRole("textbox"), "test");
      expect(handleChange).toHaveBeenCalled();
    });

    it("handles onFocus callback", async () => {
      const handleFocus = vi.fn();
      const user = userEvent.setup();
      render(<Input onFocus={handleFocus} />);

      await user.click(screen.getByRole("textbox"));
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("handles onBlur callback", async () => {
      const handleBlur = vi.fn();
      const user = userEvent.setup();
      render(<Input onBlur={handleBlur} />);

      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("cannot be interacted with when disabled", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Input disabled onChange={handleChange} />);

      const input = screen.getByRole("textbox");
      await user.type(input, "test");
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("has no accessibility violations", async () => {
      const { container } = render(<Input label="Name" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has no accessibility violations with error", async () => {
      const { container } = render(
        <Input label="Email" error="Invalid email" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("associates label with input", () => {
      render(<Input label="Username" />);
      const input = screen.getByLabelText("Username");
      expect(input).toBeInTheDocument();
    });

    it("associates error message with input", () => {
      render(<Input label="Email" error="Invalid email" />);
      const input = screen.getByRole("textbox");
      const errorId = input.getAttribute("aria-describedby");
      expect(errorId).toBeTruthy();
      expect(screen.getByText("Invalid email")).toHaveAttribute("id", errorId);
    });

    it("associates helper text with input", () => {
      render(<Input label="Password" helperText="Must be 8+ characters" />);
      const input = screen.getByRole("textbox");
      const helperId = input.getAttribute("aria-describedby");
      expect(helperId).toBeTruthy();
      expect(screen.getByText("Must be 8+ characters")).toHaveAttribute(
        "id",
        helperId
      );
    });

    it("marks invalid input with aria-invalid", () => {
      render(<Input error="Error message" />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-invalid",
        "true"
      );
    });

    it("error message has role alert", () => {
      render(<Input error="This is an error" />);
      expect(screen.getByRole("alert")).toHaveTextContent("This is an error");
    });
  });

  describe("Custom Props", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it("accepts custom className", () => {
      render(<Input className="custom-class" />);
      expect(screen.getByRole("textbox")).toHaveClass("custom-class");
    });

    it("forwards additional props", () => {
      render(
        <Input data-testid="custom-input" maxLength={10} autoComplete="off" />
      );
      const input = screen.getByTestId("custom-input");
      expect(input).toHaveAttribute("maxLength", "10");
      expect(input).toHaveAttribute("autoComplete", "off");
    });

    it("accepts default value", () => {
      render(<Input defaultValue="Initial value" />);
      expect(screen.getByRole("textbox")).toHaveValue("Initial value");
    });

    it("can be controlled", async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState("");
        return (
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);
      const input = screen.getByRole("textbox");

      await user.type(input, "controlled");
      expect(input).toHaveValue("controlled");
    });
  });

  describe("Layout", () => {
    it("renders full width by default", () => {
      const { container } = render(<Input />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("w-full");
    });

    it("can disable full width", () => {
      const { container } = render(<Input fullWidth={false} />);
      const wrapper = container.firstChild;
      expect(wrapper).not.toHaveClass("w-full");
    });

    it("prioritizes error over helper text", () => {
      render(<Input error="Error" helperText="Helper" />);
      expect(screen.getByText("Error")).toBeInTheDocument();
      expect(screen.queryByText("Helper")).not.toBeInTheDocument();
    });
  });
});
