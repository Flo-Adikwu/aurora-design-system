import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { Checkbox } from "./Checkbox";

expect.extend(toHaveNoViolations);

describe("Checkbox", () => {
  describe("Rendering", () => {
    it("renders without label", () => {
      render(<Checkbox />);
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("renders with label", () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByLabelText("Accept terms")).toBeInTheDocument();
    });

    it("renders with helper text", () => {
      render(<Checkbox label="Subscribe" helperText="Get weekly updates" />);
      expect(screen.getByText("Get weekly updates")).toBeInTheDocument();
    });

    it("renders with error message", () => {
      render(<Checkbox label="Accept" error="You must accept" />);
      expect(screen.getByText("You must accept")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveTextContent("You must accept");
    });

    it("shows required indicator when required", () => {
      render(<Checkbox label="Terms" required />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("renders label on the left when specified", () => {
      const { container } = render(
        <Checkbox label="Left label" labelPosition="left" />
      );
      const wrapper = container.querySelector(".flex.items-center");
      const label = screen.getByText("Left label");
      const checkbox = screen.getByRole("checkbox");

      expect(wrapper?.firstChild).toBe(label.parentElement);
    });

    it("renders label on the right by default", () => {
      const { container } = render(<Checkbox label="Right label" />);
      const wrapper = container.querySelector(".flex.items-center");
      const checkbox = screen.getByRole("checkbox");

      expect(wrapper?.firstChild).toBe(checkbox.parentElement);
    });

    it("renders all sizes correctly", () => {
      const { rerender } = render(<Checkbox checkboxSize="sm" />);
      expect(screen.getByRole("checkbox")).toHaveClass("h-4");

      rerender(<Checkbox checkboxSize="md" />);
      expect(screen.getByRole("checkbox")).toHaveClass("h-5");

      rerender(<Checkbox checkboxSize="lg" />);
      expect(screen.getByRole("checkbox")).toHaveClass("h-6");
    });
  });

  describe("States", () => {
    it("can be checked by default", () => {
      render(<Checkbox defaultChecked />);
      expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("can be controlled", () => {
      const { rerender } = render(
        <Checkbox checked={false} onChange={() => {}} />
      );
      expect(screen.getByRole("checkbox")).not.toBeChecked();

      rerender(<Checkbox checked={true} onChange={() => {}} />);
      expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("can be disabled", () => {
      render(<Checkbox disabled />);
      expect(screen.getByRole("checkbox")).toBeDisabled();
    });

    it("applies error variant when error is present", () => {
      render(<Checkbox error="Error message" />);
      expect(screen.getByRole("checkbox")).toHaveClass("border-red-500");
    });

    it("sets indeterminate state", () => {
      render(<Checkbox indeterminate />);
      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
    });

    it("updates indeterminate state when prop changes", () => {
      const { rerender } = render(<Checkbox indeterminate={false} />);
      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(false);

      rerender(<Checkbox indeterminate={true} />);
      expect(checkbox.indeterminate).toBe(true);
    });
  });

  describe("Interactions", () => {
    it("handles click to check", async () => {
      const user = userEvent.setup();
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).not.toBeChecked();
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it("handles click to uncheck", async () => {
      const user = userEvent.setup();
      render(<Checkbox defaultChecked />);
      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeChecked();
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it("handles onChange callback", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Checkbox onChange={handleChange} />);

      await user.click(screen.getByRole("checkbox"));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("handles label click", async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Click me" />);
      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).not.toBeChecked();
      await user.click(screen.getByText("Click me"));
      expect(checkbox).toBeChecked();
    });

    it("does not toggle when disabled", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Checkbox disabled onChange={handleChange} />);

      await user.click(screen.getByRole("checkbox"));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("handles keyboard interaction (Space)", async () => {
      const user = userEvent.setup();
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");

      checkbox.focus();
      expect(checkbox).not.toBeChecked();

      await user.keyboard(" ");
      expect(checkbox).toBeChecked();
    });
  });

  describe("Accessibility", () => {
    it("has no accessibility violations", async () => {
      const { container } = render(<Checkbox label="Accessible checkbox" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has no accessibility violations with error", async () => {
      const { container } = render(
        <Checkbox label="Terms" error="You must accept the terms" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("associates label with checkbox", () => {
      render(<Checkbox label="My checkbox" />);
      const checkbox = screen.getByLabelText("My checkbox");
      expect(checkbox).toBeInTheDocument();
    });

    it("associates error message with checkbox", () => {
      render(<Checkbox label="Terms" error="Required field" />);
      const checkbox = screen.getByRole("checkbox");
      const errorId = checkbox.getAttribute("aria-describedby");
      expect(errorId).toBeTruthy();
      expect(screen.getByText("Required field")).toHaveAttribute("id", errorId);
    });

    it("associates helper text with checkbox", () => {
      render(<Checkbox label="Subscribe" helperText="Optional" />);
      const checkbox = screen.getByRole("checkbox");
      const helperId = checkbox.getAttribute("aria-describedby");
      expect(helperId).toBeTruthy();
      expect(screen.getByText("Optional")).toHaveAttribute("id", helperId);
    });

    it("marks invalid checkbox with aria-invalid", () => {
      render(<Checkbox error="Error" />);
      expect(screen.getByRole("checkbox")).toHaveAttribute(
        "aria-invalid",
        "true"
      );
    });

    it("error message has role alert", () => {
      render(<Checkbox error="This is an error" />);
      expect(screen.getByRole("alert")).toHaveTextContent("This is an error");
    });

    it("can be focused", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      checkbox.focus();
      expect(checkbox).toHaveFocus();
    });

    it("is keyboard accessible", async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Keyboard test" />);
      const checkbox = screen.getByRole("checkbox");

      await user.tab();
      expect(checkbox).toHaveFocus();

      await user.keyboard(" ");
      expect(checkbox).toBeChecked();
    });
  });

  describe("Custom Props", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Checkbox ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it("accepts custom className", () => {
      render(<Checkbox className="custom-class" />);
      expect(screen.getByRole("checkbox")).toHaveClass("custom-class");
    });

    it("forwards additional props", () => {
      render(
        <Checkbox data-testid="custom-checkbox" name="terms" value="accepted" />
      );
      const checkbox = screen.getByTestId("custom-checkbox");
      expect(checkbox).toHaveAttribute("name", "terms");
      expect(checkbox).toHaveAttribute("value", "accepted");
    });

    it("accepts custom id", () => {
      render(<Checkbox id="my-checkbox" label="Custom ID" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("id", "my-checkbox");
    });
  });

  describe("Controlled Component", () => {
    it("works as controlled component", async () => {
      const TestComponent = () => {
        const [checked, setChecked] = React.useState(false);
        return (
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            label="Controlled"
          />
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);
      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).not.toBeChecked();
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it("can be controlled externally", async () => {
      const TestComponent = () => {
        const [checked, setChecked] = React.useState(false);
        return (
          <div>
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <button onClick={() => setChecked(true)}>Check it</button>
          </div>
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);
      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).not.toBeChecked();
      await user.click(screen.getByText("Check it"));
      expect(checkbox).toBeChecked();
    });
  });

  describe("Layout", () => {
    it("prioritizes error over helper text", () => {
      render(<Checkbox error="Error" helperText="Helper" />);
      expect(screen.getByText("Error")).toBeInTheDocument();
      expect(screen.queryByText("Helper")).not.toBeInTheDocument();
    });

    it("applies disabled styles to label", () => {
      render(<Checkbox label="Disabled" disabled />);
      const label = screen.getByText("Disabled");
      expect(label).toHaveClass("opacity-50");
    });
  });
});
