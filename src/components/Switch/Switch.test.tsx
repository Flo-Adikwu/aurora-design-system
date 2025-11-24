import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { Switch } from "./Switch";

expect.extend(toHaveNoViolations);

describe("Switch", () => {
  describe("Rendering", () => {
    it("renders without label", () => {
      render(<Switch />);
      expect(screen.getByRole("switch")).toBeInTheDocument();
    });

    it("renders with label", () => {
      render(<Switch label="Enable notifications" />);
      expect(screen.getByText("Enable notifications")).toBeInTheDocument();
    });

    it("renders with helper text", () => {
      render(
        <Switch label="Dark mode" helperText="Toggle dark mode on or off" />
      );
      expect(
        screen.getByText("Toggle dark mode on or off")
      ).toBeInTheDocument();
    });

    it("renders with error message", () => {
      render(<Switch label="Accept" error="You must accept to continue" />);
      expect(
        screen.getByText("You must accept to continue")
      ).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveTextContent(
        "You must accept to continue"
      );
    });

    it("shows required indicator when required", () => {
      render(<Switch label="Terms" required />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("renders label on the left when specified", () => {
      const { container } = render(
        <Switch label="Left label" labelPosition="left" />
      );
      const wrapper = container.querySelector(".flex.items-center");
      const label = screen.getByText("Left label");

      expect(wrapper?.firstChild).toBe(label);
    });

    it("renders label on the right by default", () => {
      const { container } = render(<Switch label="Right label" />);
      const wrapper = container.querySelector(".flex.items-center");
      const switchButton = screen.getByRole("switch");

      expect(wrapper?.firstChild).toBe(switchButton);
    });

    it("renders all sizes correctly", () => {
      const { rerender } = render(<Switch switchSize="sm" />);
      expect(screen.getByRole("switch")).toHaveClass("h-5");

      rerender(<Switch switchSize="md" />);
      expect(screen.getByRole("switch")).toHaveClass("h-6");

      rerender(<Switch switchSize="lg" />);
      expect(screen.getByRole("switch")).toHaveClass("h-7");
    });
  });

  describe("States", () => {
    it("can be checked by default", () => {
      render(<Switch checked={true} onChange={() => {}} />);
      const switchButton = screen.getByRole("switch");
      expect(switchButton).toHaveAttribute("aria-checked", "true");
    });

    it("can be unchecked by default", () => {
      render(<Switch checked={false} onChange={() => {}} />);
      const switchButton = screen.getByRole("switch");
      expect(switchButton).toHaveAttribute("aria-checked", "false");
    });

    it("can be disabled", () => {
      render(<Switch disabled />);
      expect(screen.getByRole("switch")).toBeDisabled();
    });

    it("applies error variant when error is present", () => {
      render(<Switch error="Error message" />);
      expect(screen.getByRole("switch")).toHaveClass("focus:ring-red-500");
    });

    it("shows checked state with Aurora background", () => {
      render(<Switch checked={true} onChange={() => {}} />);
      expect(screen.getByRole("switch")).toHaveClass("bg-aurora-500");
    });

    it("shows unchecked state with gray background", () => {
      render(<Switch checked={false} onChange={() => {}} />);
      expect(screen.getByRole("switch")).toHaveClass("bg-gray-200");
    });

    it("shows error variant when checked", () => {
      render(<Switch checked={true} error="Error" onChange={() => {}} />);
      expect(screen.getByRole("switch")).toHaveClass("bg-red-500");
    });
  });

  describe("Interactions", () => {
    it("toggles on click", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Switch onChange={handleChange} />);

      await user.click(screen.getByRole("switch"));
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("toggles from checked to unchecked", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Switch checked={true} onChange={handleChange} />);

      await user.click(screen.getByRole("switch"));
      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it("handles label click", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Switch label="Click me" onChange={handleChange} />);

      await user.click(screen.getByText("Click me"));
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("does not toggle when disabled", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Switch disabled onChange={handleChange} />);

      await user.click(screen.getByRole("switch"));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("handles keyboard interaction (Space)", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Switch onChange={handleChange} />);

      const switchButton = screen.getByRole("switch");
      switchButton.focus();
      await user.keyboard(" ");

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("handles keyboard interaction (Enter)", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Switch onChange={handleChange} />);

      const switchButton = screen.getByRole("switch");
      switchButton.focus();
      await user.keyboard("{Enter}");

      expect(handleChange).toHaveBeenCalledWith(true);
    });
  });

  describe("Accessibility", () => {
    it("has no accessibility violations", async () => {
      const { container } = render(<Switch label="Accessible switch" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has no accessibility violations with error", async () => {
      const { container } = render(
        <Switch label="Terms" error="You must accept the terms" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has proper role", () => {
      render(<Switch />);
      expect(screen.getByRole("switch")).toBeInTheDocument();
    });

    it("has proper aria-checked attribute", () => {
      const { rerender } = render(
        <Switch checked={false} onChange={() => {}} />
      );
      expect(screen.getByRole("switch")).toHaveAttribute(
        "aria-checked",
        "false"
      );

      rerender(<Switch checked={true} onChange={() => {}} />);
      expect(screen.getByRole("switch")).toHaveAttribute(
        "aria-checked",
        "true"
      );
    });

    it("associates label with switch", () => {
      render(<Switch label="My switch" />);
      const switchButton = screen.getByRole("switch");
      const labelId = switchButton.getAttribute("aria-labelledby");
      expect(labelId).toBeTruthy();
      expect(screen.getByText("My switch")).toHaveAttribute("id", labelId);
    });

    it("associates error message with switch", () => {
      render(<Switch label="Terms" error="Required field" />);
      const switchButton = screen.getByRole("switch");
      const errorId = switchButton.getAttribute("aria-describedby");
      expect(errorId).toBeTruthy();
      expect(screen.getByText("Required field")).toHaveAttribute("id", errorId);
    });

    it("associates helper text with switch", () => {
      render(<Switch label="Subscribe" helperText="Optional" />);
      const switchButton = screen.getByRole("switch");
      const helperId = switchButton.getAttribute("aria-describedby");
      expect(helperId).toBeTruthy();
      expect(screen.getByText("Optional")).toHaveAttribute("id", helperId);
    });

    it("marks invalid switch with aria-invalid", () => {
      render(<Switch error="Error" />);
      expect(screen.getByRole("switch")).toHaveAttribute(
        "aria-invalid",
        "true"
      );
    });

    it("error message has role alert", () => {
      render(<Switch error="This is an error" />);
      expect(screen.getByRole("alert")).toHaveTextContent("This is an error");
    });

    it("can be focused", () => {
      render(<Switch />);
      const switchButton = screen.getByRole("switch");
      switchButton.focus();
      expect(switchButton).toHaveFocus();
    });

    it("is keyboard accessible", async () => {
      const user = userEvent.setup();
      render(<Switch label="Keyboard test" onChange={() => {}} />);
      const switchButton = screen.getByRole("switch");

      await user.tab();
      expect(switchButton).toHaveFocus();

      await user.keyboard(" ");
      expect(switchButton).toHaveAttribute("aria-checked", "true");
    });

    it("provides screen reader text when no label", () => {
      render(<Switch />);
      expect(screen.getByText("Toggle switch")).toBeInTheDocument();
    });
  });

  describe("Controlled Component", () => {
    it("works as controlled component", async () => {
      const TestComponent = () => {
        const [checked, setChecked] = React.useState(false);
        return (
          <Switch checked={checked} onChange={setChecked} label="Controlled" />
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);
      const switchButton = screen.getByRole("switch");

      expect(switchButton).toHaveAttribute("aria-checked", "false");
      await user.click(switchButton);
      expect(switchButton).toHaveAttribute("aria-checked", "true");
      await user.click(switchButton);
      expect(switchButton).toHaveAttribute("aria-checked", "false");
    });

    it("can be controlled externally", async () => {
      const TestComponent = () => {
        const [checked, setChecked] = React.useState(false);
        return (
          <div>
            <Switch checked={checked} onChange={setChecked} />
            <button onClick={() => setChecked(true)}>Turn On</button>
            <button onClick={() => setChecked(false)}>Turn Off</button>
          </div>
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);
      const switchButton = screen.getByRole("switch");

      expect(switchButton).toHaveAttribute("aria-checked", "false");

      await user.click(screen.getByText("Turn On"));
      expect(switchButton).toHaveAttribute("aria-checked", "true");

      await user.click(screen.getByText("Turn Off"));
      expect(switchButton).toHaveAttribute("aria-checked", "false");
    });
  });

  describe("Custom Props", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Switch ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it("accepts custom className", () => {
      render(<Switch className="custom-class" />);
      expect(screen.getByRole("switch")).toHaveClass("custom-class");
    });

    it("forwards additional props", () => {
      render(<Switch data-testid="custom-switch" name="notifications" />);
      const checkbox = screen.getByTestId("custom-switch");
      expect(checkbox).toHaveAttribute("name", "notifications");
    });

    it("accepts custom id", () => {
      render(<Switch id="my-switch" label="Custom ID" />);
      const checkbox = document.getElementById("my-switch");
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe("Layout", () => {
    it("prioritizes error over helper text", () => {
      render(<Switch error="Error" helperText="Helper" />);
      expect(screen.getByText("Error")).toBeInTheDocument();
      expect(screen.queryByText("Helper")).not.toBeInTheDocument();
    });

    it("applies disabled styles to label", () => {
      render(<Switch label="Disabled" disabled />);
      const label = screen.getByText("Disabled");
      expect(label).toHaveClass("opacity-50");
    });
  });

  describe("Visual States", () => {
    it("animates thumb position when checked", () => {
      const { rerender } = render(
        <Switch checked={false} onChange={() => {}} switchSize="md" />
      );
      const thumb = document.querySelector('[aria-hidden="true"]');
      expect(thumb).toHaveClass("translate-x-0");

      rerender(<Switch checked={true} onChange={() => {}} switchSize="md" />);
      expect(thumb).toHaveClass("translate-x-5");
    });

    it("uses correct thumb translation for small size", () => {
      render(<Switch checked={true} onChange={() => {}} switchSize="sm" />);
      const thumb = document.querySelector('[aria-hidden="true"]');
      expect(thumb).toHaveClass("translate-x-4");
    });

    it("uses correct thumb translation for large size", () => {
      render(<Switch checked={true} onChange={() => {}} switchSize="lg" />);
      const thumb = document.querySelector('[aria-hidden="true"]');
      expect(thumb).toHaveClass("translate-x-7");
    });
  });
});
