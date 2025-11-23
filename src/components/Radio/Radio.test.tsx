import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { Radio, RadioGroup, RadioOption } from "./Radio";

expect.extend(toHaveNoViolations);

const mockOptions: RadioOption[] = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];

describe("Radio", () => {
  describe("Rendering", () => {
    it("renders without label", () => {
      render(<Radio name="test" value="test" />);
      expect(screen.getByRole("radio")).toBeInTheDocument();
    });

    it("renders with label", () => {
      render(<Radio label="Test option" name="test" value="test" />);
      expect(screen.getByLabelText("Test option")).toBeInTheDocument();
    });

    it("renders with helper text", () => {
      render(
        <Radio
          label="Option"
          helperText="Additional information"
          name="test"
          value="test"
        />
      );
      expect(screen.getByText("Additional information")).toBeInTheDocument();
    });

    it("renders all sizes correctly", () => {
      const { rerender } = render(
        <Radio radioSize="sm" name="test" value="test" />
      );
      expect(screen.getByRole("radio")).toHaveClass("h-4");

      rerender(<Radio radioSize="md" name="test" value="test" />);
      expect(screen.getByRole("radio")).toHaveClass("h-5");

      rerender(<Radio radioSize="lg" name="test" value="test" />);
      expect(screen.getByRole("radio")).toHaveClass("h-6");
    });
  });

  describe("States", () => {
    it("can be checked", () => {
      render(<Radio name="test" value="test" defaultChecked />);
      expect(screen.getByRole("radio")).toBeChecked();
    });

    it("can be disabled", () => {
      render(<Radio name="test" value="test" disabled />);
      expect(screen.getByRole("radio")).toBeDisabled();
    });
  });

  describe("Interactions", () => {
    it("handles change event", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Radio
          label="Option"
          name="test"
          value="test"
          onChange={handleChange}
        />
      );

      await user.click(screen.getByRole("radio"));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("handles label click", async () => {
      const user = userEvent.setup();
      render(<Radio label="Click me" name="test" value="test" />);

      await user.click(screen.getByText("Click me"));
      expect(screen.getByRole("radio")).toBeChecked();
    });

    it("does not trigger change when disabled", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Radio
          label="Disabled"
          name="test"
          value="test"
          disabled
          onChange={handleChange}
        />
      );

      await user.click(screen.getByRole("radio"));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("has no accessibility violations", async () => {
      const { container } = render(
        <Radio label="Accessible radio" name="test" value="test" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("associates label with radio", () => {
      render(<Radio label="My radio" name="test" value="test" />);
      const radio = screen.getByLabelText("My radio");
      expect(radio).toBeInTheDocument();
    });

    it("associates helper text with radio", () => {
      render(
        <Radio label="Option" helperText="Help text" name="test" value="test" />
      );
      const radio = screen.getByRole("radio");
      const helperId = radio.getAttribute("aria-describedby");
      expect(helperId).toBeTruthy();
      expect(screen.getByText("Help text")).toHaveAttribute("id", helperId);
    });
  });
});

describe("RadioGroup", () => {
  describe("Rendering", () => {
    it("renders all options", () => {
      render(<RadioGroup options={mockOptions} />);
      expect(screen.getByLabelText("Small")).toBeInTheDocument();
      expect(screen.getByLabelText("Medium")).toBeInTheDocument();
      expect(screen.getByLabelText("Large")).toBeInTheDocument();
    });

    it("renders with label", () => {
      render(<RadioGroup label="Size" options={mockOptions} />);
      expect(screen.getByText("Size")).toBeInTheDocument();
    });

    it("renders with helper text", () => {
      render(
        <RadioGroup
          label="Size"
          options={mockOptions}
          helperText="Choose your size"
        />
      );
      expect(screen.getByText("Choose your size")).toBeInTheDocument();
    });

    it("renders with error", () => {
      render(
        <RadioGroup
          label="Size"
          options={mockOptions}
          error="Size is required"
        />
      );
      expect(screen.getByText("Size is required")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveTextContent("Size is required");
    });

    it("shows required indicator when required", () => {
      render(<RadioGroup label="Size" options={mockOptions} required />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("renders in vertical layout by default", () => {
      const { container } = render(<RadioGroup options={mockOptions} />);
      const group = container.querySelector('[role="radiogroup"]');
      expect(group).toHaveClass("flex-col");
    });

    it("renders in horizontal layout when specified", () => {
      const { container } = render(
        <RadioGroup options={mockOptions} layout="horizontal" />
      );
      const group = container.querySelector('[role="radiogroup"]');
      expect(group).toHaveClass("flex-row");
    });

    it("renders with selected value", () => {
      render(<RadioGroup options={mockOptions} value="medium" />);
      expect(screen.getByLabelText("Medium")).toBeChecked();
    });

    it("renders disabled options", () => {
      const optionsWithDisabled: RadioOption[] = [
        ...mockOptions,
        { value: "xlarge", label: "Extra Large", disabled: true },
      ];
      render(<RadioGroup options={optionsWithDisabled} />);
      expect(screen.getByLabelText("Extra Large")).toBeDisabled();
    });

    it("renders with helper text on individual options", () => {
      const optionsWithHelp: RadioOption[] = [
        { value: "small", label: "Small", helperText: "Best for mobile" },
        { value: "large", label: "Large", helperText: "Best for desktop" },
      ];
      render(<RadioGroup options={optionsWithHelp} />);
      expect(screen.getByText("Best for mobile")).toBeInTheDocument();
      expect(screen.getByText("Best for desktop")).toBeInTheDocument();
    });
  });

  describe("Selection Behavior", () => {
    it("only allows one option to be selected", async () => {
      const user = userEvent.setup();
      render(<RadioGroup options={mockOptions} />);

      await user.click(screen.getByLabelText("Small"));
      expect(screen.getByLabelText("Small")).toBeChecked();
      expect(screen.getByLabelText("Medium")).not.toBeChecked();

      await user.click(screen.getByLabelText("Medium"));
      expect(screen.getByLabelText("Small")).not.toBeChecked();
      expect(screen.getByLabelText("Medium")).toBeChecked();
    });

    it("calls onChange with selected value", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<RadioGroup options={mockOptions} onChange={handleChange} />);

      await user.click(screen.getByLabelText("Large"));
      expect(handleChange).toHaveBeenCalledWith("large");
    });

    it("works as controlled component", async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState("small");
        return (
          <RadioGroup options={mockOptions} value={value} onChange={setValue} />
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      expect(screen.getByLabelText("Small")).toBeChecked();
      await user.click(screen.getByLabelText("Large"));
      expect(screen.getByLabelText("Large")).toBeChecked();
      expect(screen.getByLabelText("Small")).not.toBeChecked();
    });
  });

  describe("States", () => {
    it("disables all options when disabled", () => {
      render(<RadioGroup options={mockOptions} disabled />);
      mockOptions.forEach((option) => {
        expect(screen.getByLabelText(option.label)).toBeDisabled();
      });
    });

    it("applies error variant when error is present", () => {
      render(<RadioGroup options={mockOptions} error="Error message" />);
      const radios = screen.getAllByRole("radio");
      radios.forEach((radio) => {
        expect(radio).toHaveClass("border-red-500");
      });
    });

    it("does not select disabled options", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      const optionsWithDisabled: RadioOption[] = [
        ...mockOptions,
        { value: "xlarge", label: "Extra Large", disabled: true },
      ];
      render(
        <RadioGroup options={optionsWithDisabled} onChange={handleChange} />
      );

      await user.click(screen.getByLabelText("Extra Large"));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("has no accessibility violations", async () => {
      const { container } = render(
        <RadioGroup label="Choose size" options={mockOptions} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has no accessibility violations with error", async () => {
      const { container } = render(
        <RadioGroup
          label="Size"
          options={mockOptions}
          error="This field is required"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has proper radiogroup role", () => {
      render(<RadioGroup options={mockOptions} />);
      expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    });

    it("associates error message with group", () => {
      render(
        <RadioGroup label="Size" options={mockOptions} error="Required" />
      );
      const group = screen.getByRole("radiogroup");
      const errorId = group.getAttribute("aria-describedby");
      expect(errorId).toBeTruthy();
      expect(screen.getByText("Required")).toHaveAttribute("id", errorId);
    });

    it("associates helper text with group", () => {
      render(
        <RadioGroup
          label="Size"
          options={mockOptions}
          helperText="Choose one"
        />
      );
      const group = screen.getByRole("radiogroup");
      const helperId = group.getAttribute("aria-describedby");
      expect(helperId).toBeTruthy();
      expect(screen.getByText("Choose one")).toHaveAttribute("id", helperId);
    });

    it("marks invalid group with aria-invalid", () => {
      render(<RadioGroup options={mockOptions} error="Error" />);
      expect(screen.getByRole("radiogroup")).toHaveAttribute(
        "aria-invalid",
        "true"
      );
    });

    it("supports keyboard navigation", async () => {
      const user = userEvent.setup();
      render(<RadioGroup options={mockOptions} />);

      const firstRadio = screen.getByLabelText("Small");
      firstRadio.focus();
      expect(firstRadio).toHaveFocus();

      await user.keyboard(" ");
      expect(firstRadio).toBeChecked();
    });
  });

  describe("Layout", () => {
    it("prioritizes error over helper text", () => {
      render(
        <RadioGroup options={mockOptions} error="Error" helperText="Helper" />
      );
      expect(screen.getByText("Error")).toBeInTheDocument();
      expect(screen.queryByText("Helper")).not.toBeInTheDocument();
    });
  });

  describe("Custom Props", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<RadioGroup ref={ref} options={mockOptions} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("accepts custom className", () => {
      const { container } = render(
        <RadioGroup options={mockOptions} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("uses custom name for radio group", () => {
      render(<RadioGroup options={mockOptions} name="custom-name" />);
      const radios = screen.getAllByRole("radio") as HTMLInputElement[];
      radios.forEach((radio) => {
        expect(radio.name).toBe("custom-name");
      });
    });
  });
});
