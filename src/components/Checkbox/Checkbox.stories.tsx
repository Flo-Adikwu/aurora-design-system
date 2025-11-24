import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import { Button } from "../Button";
import React from "react";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error"],
      description: "The visual variant of the checkbox",
    },
    checkboxSize: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the checkbox",
    },
    labelPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Position of the label relative to checkbox",
    },
    disabled: {
      control: "boolean",
      description: "Disables the checkbox",
    },
    required: {
      control: "boolean",
      description: "Marks the checkbox as required",
    },
    indeterminate: {
      control: "boolean",
      description: "Shows indeterminate state (dash)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const WithHelperText: Story = {
  args: {
    label: "Subscribe to newsletter",
    helperText: "Get weekly updates about new features",
  },
};

export const WithError: Story = {
  args: {
    label: "Accept terms",
    error: "You must accept the terms to continue",
  },
};

export const Required: Story = {
  args: {
    label: "I agree to the terms",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled checkbox",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled and checked",
    disabled: true,
    defaultChecked: true,
  },
};

export const Checked: Story = {
  args: {
    label: "Already checked",
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Indeterminate state",
    indeterminate: true,
    helperText: 'Used for "select all" when some items are selected',
  },
};

export const LabelLeft: Story = {
  args: {
    label: "Label on the left",
    labelPosition: "left",
  },
};

export const LabelRight: Story = {
  args: {
    label: "Label on the right (default)",
    labelPosition: "right",
  },
};

export const Small: Story = {
  args: {
    label: "Small checkbox",
    checkboxSize: "sm",
  },
};

export const Medium: Story = {
  args: {
    label: "Medium checkbox (default)",
    checkboxSize: "md",
  },
};

export const Large: Story = {
  args: {
    label: "Large checkbox",
    checkboxSize: "lg",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Small" checkboxSize="sm" />
      <Checkbox label="Medium (default)" checkboxSize="md" />
      <Checkbox label="Large" checkboxSize="lg" />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);

    return (
      <div className="space-y-4">
        <Checkbox
          label="Controlled checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <div className="text-sm text-gray-600">
          Status:{" "}
          <span className="font-semibold">
            {checked ? "Checked" : "Unchecked"}
          </span>
        </div>
        <Button onClick={() => setChecked(!checked)} size="sm">
          Toggle Externally
        </Button>
      </div>
    );
  },
};

export const SelectAll: Story = {
  render: () => {
    const [items, setItems] = React.useState([
      { id: 1, label: "Item 1", checked: false },
      { id: 2, label: "Item 2", checked: false },
      { id: 3, label: "Item 3", checked: false },
    ]);

    const allChecked = items.every((item) => item.checked);
    const someChecked = items.some((item) => item.checked) && !allChecked;

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setItems(items.map((item) => ({ ...item, checked })));
    };

    const handleItemChange = (id: number) => {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        )
      );
    };

    return (
      <div className="w-80 space-y-4 rounded-aurora border border-gray-200 p-4">
        <Checkbox
          label="Select All"
          checked={allChecked}
          indeterminate={someChecked}
          onChange={handleSelectAll}
        />
        <div className="ml-6 space-y-2 border-l-2 border-gray-200 pl-4">
          {items.map((item) => (
            <Checkbox
              key={item.id}
              label={item.label}
              checked={item.checked}
              onChange={() => handleItemChange(item.id)}
            />
          ))}
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      terms: false,
      newsletter: false,
      updates: false,
    });

    return (
      <form className="w-80 space-y-4">
        <div className="rounded-aurora gradient-aurora p-4 text-white">
          <h3 className="text-lg font-bold">Sign Up</h3>
          <p className="text-sm opacity-90">Complete your registration</p>
        </div>

        <Checkbox
          label="I accept the terms and conditions"
          checked={formData.terms}
          onChange={(e) =>
            setFormData({ ...formData, terms: e.target.checked })
          }
          required
          error={!formData.terms ? "You must accept the terms" : undefined}
        />

        <Checkbox
          label="Subscribe to newsletter"
          checked={formData.newsletter}
          onChange={(e) =>
            setFormData({ ...formData, newsletter: e.target.checked })
          }
          helperText="Get weekly updates about new features"
        />

        <Checkbox
          label="Notify me about important updates"
          checked={formData.updates}
          onChange={(e) =>
            setFormData({ ...formData, updates: e.target.checked })
          }
          helperText="Security and critical notifications only"
        />

        <div className="rounded-aurora border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm font-medium text-gray-700">Form State:</p>
          <pre className="mt-2 text-xs text-gray-600">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </form>
    );
  },
};

export const CheckboxGroup: Story = {
  render: () => {
    const [interests, setInterests] = React.useState<string[]>([]);

    const options = [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue.js" },
      { value: "angular", label: "Angular" },
      { value: "svelte", label: "Svelte" },
    ];

    const handleChange = (value: string, checked: boolean) => {
      if (checked) {
        setInterests([...interests, value]);
      } else {
        setInterests(interests.filter((v) => v !== value));
      }
    };

    return (
      <div className="w-80 space-y-4">
        <div>
          <h3 className="mb-3 font-semibold text-gray-900">
            What frameworks do you use?
          </h3>
          <div className="space-y-2">
            {options.map((option) => (
              <Checkbox
                key={option.value}
                label={option.label}
                checked={interests.includes(option.value)}
                onChange={(e) => handleChange(option.value, e.target.checked)}
              />
            ))}
          </div>
        </div>

        {interests.length > 0 && (
          <div className="rounded-aurora border-2 border-aurora-500 bg-aurora-50 p-4 animate-slide-up">
            <p className="text-sm font-semibold text-aurora-900">
              Selected: {interests.join(", ")}
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const WithLongLabel: Story = {
  args: {
    label:
      "I have read and agree to the Terms of Service, Privacy Policy, and Cookie Policy. I understand that my data will be processed according to these terms and I consent to receive communications.",
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="grid gap-4">
      <div className="font-semibold text-gray-900">All Checkbox States:</div>

      <div className="grid gap-2">
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Indeterminate" indeterminate />
        <Checkbox label="Disabled" disabled />
        <Checkbox label="Disabled Checked" disabled defaultChecked />
        <Checkbox label="With Error" error="This field is required" />
        <Checkbox label="Required" required />
        <Checkbox label="With Helper Text" helperText="Optional field" />
      </div>
    </div>
  ),
};
