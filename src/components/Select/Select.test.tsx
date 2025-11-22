import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { Select, SelectOption } from "./Select";

expect.extend(toHaveNoViolations);

const mockOptions: SelectOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte", disabled: true },
];

describe("Select", () => {
  describe("Rendering", () => {
    it("renders with placeholder", () => {
      render(<Select options={mockOptions} placeholder="Choose framework" />);
      expect(screen.getByText("Choose framework")).toBeInTheDocument();
    });

    it("renders with label", () => {
      render(<Select options={mockOptions} label="Framework" />);
      expect(screen.getByText("Framework")).toBeInTheDocument();
    });

    it("renders with helper text", () => {
      render(
        <Select
          options={mockOptions}
          helperText="Select your preferred framework"
        />
      );
      expect(
        screen.getByText("Select your preferred framework")
      ).toBeInTheDocument();
    });

    it("renders with error message", () => {
      render(
        <Select options={mockOptions} error="Please select a framework" />
      );
      expect(screen.getByText("Please select a framework")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Please select a framework"
      );
    });

    it("shows required indicator when required", () => {
      render(<Select options={mockOptions} label="Framework" required />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("displays selected value", () => {
      render(<Select options={mockOptions} value="react" />);
      expect(screen.getByText("React")).toBeInTheDocument();
    });
  });

  describe("Dropdown Behavior", () => {
    it("opens dropdown when clicked", async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(screen.getByRole("listbox")).toBeInTheDocument();
      expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("closes dropdown when clicking outside", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Select options={mockOptions} />
          <button>Outside</button>
        </div>
      );

      const selectButton = screen.getByRole("button", { name: /select/i });
      await user.click(selectButton);
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.click(screen.getByText("Outside"));
      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("displays all options when open", async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      await user.click(screen.getByRole("button"));

      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("Vue")).toBeInTheDocument();
      expect(screen.getByText("Angular")).toBeInTheDocument();
      expect(screen.getByText("Svelte")).toBeInTheDocument();
    });

    it("does not open when disabled", async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} disabled />);

      await user.click(screen.getByRole("button"));
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  describe("Selection", () => {
    it("handles option selection", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Select options={mockOptions} onChange={handleChange} />);

      await user.click(screen.getByRole("button"));
      await user.click(screen.getByText("Vue"));

      expect(handleChange).toHaveBeenCalledWith("vue");
    });

    it("closes dropdown after selection", async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      await user.click(screen.getByRole("button"));
      await user.click(screen.getByText("React"));

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("does not select disabled options", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Select options={mockOptions} onChange={handleChange} />);

      await user.click(screen.getByRole("button"));
      await user.click(screen.getByText("Svelte"));

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("displays selected option correctly", async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [value, setValue] = React.useState("");
        return (
          <Select options={mockOptions} value={value} onChange={setValue} />
        );
      };

      render(<TestComponent />);

      await user.click(screen.getByRole("button"));
      await user.click(screen.getByText("Angular"));

      expect(screen.getByRole("button")).toHaveTextContent("Angular");
    });
  });

  describe("Keyboard Navigation", () => {
    it("opens dropdown with Enter key", async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard("{Enter}");

      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("opens dropdown with Space key", async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard(" ");

      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("closes dropdown with Escape key", async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      await user.click(screen.getByRole("button"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.keyboard("{Escape}");
      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("navigates options with ArrowDown", async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard("{ArrowDown}");

      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("selects option with Enter when focused", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Select options={mockOptions} onChange={handleChange} />);

      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard("{ArrowDown}"); // Open
      await user.keyboard("{ArrowDown}"); // Focus first option
      await user.keyboard("{Enter}"); // Select

      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe("States", () => {
    it("applies error variant when error is present", () => {
      render(<Select options={mockOptions} error="Error message" />);
      const button = screen.getByRole("button");
      expect(button.parentElement).toHaveClass("border-red-500");
    });

    it("shows disabled state", () => {
      render(<Select options={mockOptions} disabled />);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("renders different sizes correctly", () => {
      const { rerender } = render(
        <Select options={mockOptions} selectSize="sm" />
      );
      expect(screen.getByRole("button")).toHaveClass("h-9");

      rerender(<Select options={mockOptions} selectSize="md" />);
      expect(screen.getByRole("button")).toHaveClass("h-11");

      rerender(<Select options={mockOptions} selectSize="lg" />);
      expect(screen.getByRole("button")).toHaveClass("h-13");
    });
  });

  describe("Accessibility", () => {
    it("has no accessibility violations", async () => {
      const { container } = render(
        <Select options={mockOptions} label="Framework" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has proper ARIA attributes when closed", () => {
      render(<Select options={mockOptions} />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-haspopup", "listbox");
      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("has proper ARIA attributes when open", async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(button).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("marks options with aria-selected", async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} value="react" />);

      await user.click(screen.getByRole("button"));

      const reactOption = screen.getByRole("option", { name: "React" });
      expect(reactOption).toHaveAttribute("aria-selected", "true");
    });

    it("marks disabled options with aria-disabled", async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      await user.click(screen.getByRole("button"));

      const svelteOption = screen.getByRole("option", { name: "Svelte" });
      expect(svelteOption).toHaveAttribute("aria-disabled", "true");
    });

    it("associates error message with select", () => {
      render(
        <Select options={mockOptions} label="Framework" error="Invalid" />
      );
      const button = screen.getByRole("button");
      const errorId = button.getAttribute("aria-describedby");
      expect(errorId).toBeTruthy();
      expect(screen.getByText("Invalid")).toHaveAttribute("id", errorId);
    });

    it("associates helper text with select", () => {
      render(
        <Select
          options={mockOptions}
          label="Framework"
          helperText="Choose wisely"
        />
      );
      const button = screen.getByRole("button");
      const helperId = button.getAttribute("aria-describedby");
      expect(helperId).toBeTruthy();
      expect(screen.getByText("Choose wisely")).toHaveAttribute("id", helperId);
    });

    it("marks invalid select with aria-invalid", () => {
      render(<Select options={mockOptions} error="Error" />);
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-invalid",
        "true"
      );
    });
  });

  describe("Layout", () => {
    it("renders full width by default", () => {
      const { container } = render(<Select options={mockOptions} />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("w-full");
    });

    it("can disable full width", () => {
      const { container } = render(
        <Select options={mockOptions} fullWidth={false} />
      );
      const wrapper = container.firstChild;
      expect(wrapper).not.toHaveClass("w-full");
    });

    it("prioritizes error over helper text", () => {
      render(
        <Select options={mockOptions} error="Error" helperText="Helper" />
      );
      expect(screen.getByText("Error")).toBeInTheDocument();
      expect(screen.queryByText("Helper")).not.toBeInTheDocument();
    });
  });
});
