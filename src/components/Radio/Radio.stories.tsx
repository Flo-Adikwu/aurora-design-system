import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, Radio, RadioOption } from "./Radio";
import React from "react";

const sizeOptions: RadioOption[] = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];

const planOptions: RadioOption[] = [
  { value: "free", label: "Free", helperText: "$0/month - Basic features" },
  { value: "pro", label: "Pro", helperText: "$29/month - Advanced features" },
  {
    value: "enterprise",
    label: "Enterprise",
    helperText: "$99/month - All features + support",
  },
];

const frameworkOptions: RadioOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

const meta: Meta<typeof RadioGroup> = {
  title: "Components/Radio",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error"],
      description: "The visual variant of the radio buttons",
    },
    radioSize: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the radio buttons",
    },
    layout: {
      control: "select",
      options: ["vertical", "horizontal"],
      description: "Layout direction of the radio group",
    },
    disabled: {
      control: "boolean",
      description: "Disables all radio buttons",
    },
    required: {
      control: "boolean",
      description: "Marks the radio group as required",
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    options: sizeOptions,
    label: "Select size",
  },
};

export const WithHelperText: Story = {
  args: {
    options: sizeOptions,
    label: "Select size",
    helperText: "Choose the size that fits your needs",
  },
};

export const WithError: Story = {
  args: {
    options: sizeOptions,
    label: "Select size",
    error: "Please select a size",
  },
};

export const Required: Story = {
  args: {
    options: sizeOptions,
    label: "Select size",
    required: true,
  },
};

export const PreSelected: Story = {
  args: {
    options: sizeOptions,
    label: "Select size",
    value: "medium",
  },
};

export const Disabled: Story = {
  args: {
    options: sizeOptions,
    label: "Select size",
    disabled: true,
    value: "medium",
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: "small", label: "Small" },
      { value: "medium", label: "Medium", disabled: true },
      { value: "large", label: "Large" },
      { value: "xlarge", label: "Extra Large", disabled: true },
    ],
    label: "Select size",
    helperText: "Some sizes are out of stock",
  },
};

export const HorizontalLayout: Story = {
  args: {
    options: sizeOptions,
    label: "Select size",
    layout: "horizontal",
  },
};

export const VerticalLayout: Story = {
  args: {
    options: sizeOptions,
    label: "Select size",
    layout: "vertical",
  },
};

export const WithOptionHelperText: Story = {
  args: {
    options: planOptions,
    label: "Choose your plan",
  },
};

export const Small: Story = {
  args: {
    options: sizeOptions,
    label: "Small radio buttons",
    radioSize: "sm",
  },
};

export const Medium: Story = {
  args: {
    options: sizeOptions,
    label: "Medium radio buttons (default)",
    radioSize: "md",
  },
};

export const Large: Story = {
  args: {
    options: sizeOptions,
    label: "Large radio buttons",
    radioSize: "lg",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <RadioGroup options={sizeOptions} label="Small" radioSize="sm" />
      <RadioGroup
        options={sizeOptions}
        label="Medium (default)"
        radioSize="md"
      />
      <RadioGroup options={sizeOptions} label="Large" radioSize="lg" />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("medium");

    return (
      <div className="space-y-4">
        <RadioGroup
          options={sizeOptions}
          label="Select size"
          value={value}
          onChange={setValue}
        />
        <div className="rounded-aurora border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm text-gray-600">
            Selected: <span className="font-semibold">{value || "None"}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setValue("small")}
            className="rounded-aurora bg-aurora-500 px-3 py-1.5 text-sm text-white hover:bg-aurora-600"
          >
            Select Small
          </button>
          <button
            onClick={() => setValue("medium")}
            className="rounded-aurora bg-aurora-500 px-3 py-1.5 text-sm text-white hover:bg-aurora-600"
          >
            Select Medium
          </button>
          <button
            onClick={() => setValue("large")}
            className="rounded-aurora bg-aurora-500 px-3 py-1.5 text-sm text-white hover:bg-aurora-600"
          >
            Select Large
          </button>
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      framework: "",
      plan: "",
      size: "",
    });

    return (
      <form className="w-96 space-y-6">
        <div className="rounded-aurora gradient-aurora p-4 text-white">
          <h3 className="text-lg font-bold">Project Setup</h3>
          <p className="text-sm opacity-90">Configure your new project</p>
        </div>

        <RadioGroup
          options={frameworkOptions}
          label="Framework"
          value={formData.framework}
          onChange={(value) => setFormData({ ...formData, framework: value })}
          required
          layout="horizontal"
        />

        <RadioGroup
          options={planOptions}
          label="Billing Plan"
          value={formData.plan}
          onChange={(value) => setFormData({ ...formData, plan: value })}
          required
        />

        <RadioGroup
          options={sizeOptions}
          label="Instance Size"
          value={formData.size}
          onChange={(value) => setFormData({ ...formData, size: value })}
          required
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

export const PaymentMethod: Story = {
  render: () => {
    const [method, setMethod] = React.useState("");

    const paymentOptions: RadioOption[] = [
      {
        value: "card",
        label: "Credit Card",
        helperText: "Pay with Visa, Mastercard, or Amex",
      },
      {
        value: "paypal",
        label: "PayPal",
        helperText: "Fast and secure PayPal checkout",
      },
      {
        value: "crypto",
        label: "Cryptocurrency",
        helperText: "BTC, ETH, USDC accepted",
      },
    ];

    return (
      <div className="w-96 space-y-4">
        <div className="rounded-aurora border-2 border-aurora-500 bg-aurora-50 p-4">
          <h3 className="font-semibold text-aurora-900">Payment Method</h3>
          <p className="text-sm text-aurora-700">Choose how you want to pay</p>
        </div>

        <RadioGroup
          options={paymentOptions}
          value={method}
          onChange={setMethod}
          required
        />

        {method && (
          <div className="rounded-aurora border border-green-500 bg-green-50 p-3 animate-slide-up">
            <p className="text-sm font-medium text-green-900">
              Selected: {paymentOptions.find((o) => o.value === method)?.label}
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const SurveyQuestion: Story = {
  render: () => {
    const [experience, setExperience] = React.useState("");

    const experienceOptions: RadioOption[] = [
      { value: "beginner", label: "Beginner", helperText: "0-2 years" },
      { value: "intermediate", label: "Intermediate", helperText: "2-5 years" },
      { value: "advanced", label: "Advanced", helperText: "5-10 years" },
      { value: "expert", label: "Expert", helperText: "10+ years" },
    ];

    return (
      <div className="w-96 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            How much experience do you have with React?
          </h3>
          <p className="text-sm text-gray-600">
            This helps us personalize your experience
          </p>
        </div>

        <RadioGroup
          options={experienceOptions}
          value={experience}
          onChange={setExperience}
        />
      </div>
    );
  },
};

export const ComparisonGrid: Story = {
  render: () => (
    <div className="grid gap-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Layout Comparison</h3>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h4 className="mb-3 text-sm font-medium text-gray-700">
              Vertical (Default)
            </h4>
            <RadioGroup
              options={sizeOptions}
              layout="vertical"
              value="medium"
            />
          </div>
          <div>
            <h4 className="mb-3 text-sm font-medium text-gray-700">
              Horizontal
            </h4>
            <RadioGroup
              options={sizeOptions}
              layout="horizontal"
              value="medium"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="grid gap-6">
      <div className="font-semibold text-gray-900">All Radio States:</div>

      <div className="grid gap-4">
        <RadioGroup options={sizeOptions} label="Default" />
        <RadioGroup
          options={sizeOptions}
          label="With Selection"
          value="medium"
        />
        <RadioGroup
          options={sizeOptions}
          label="With Error"
          error="This field is required"
        />
        <RadioGroup
          options={sizeOptions}
          label="Disabled"
          disabled
          value="medium"
        />
        <RadioGroup options={sizeOptions} label="Required" required />
        <RadioGroup
          options={sizeOptions}
          label="With Helper Text"
          helperText="Choose the option that best fits"
        />
        <RadioGroup
          options={sizeOptions}
          label="Horizontal Layout"
          layout="horizontal"
        />
      </div>
    </div>
  ),
};

export const IndividualRadio: Story = {
  render: () => {
    const [selected, setSelected] = React.useState("option1");

    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">
          Individual Radio Buttons
        </h3>
        <p className="text-sm text-gray-600">
          Using Radio component directly without RadioGroup
        </p>

        <div className="space-y-3">
          <Radio
            name="individual"
            value="option1"
            label="Option 1"
            checked={selected === "option1"}
            onChange={() => setSelected("option1")}
          />
          <Radio
            name="individual"
            value="option2"
            label="Option 2"
            helperText="This option has helper text"
            checked={selected === "option2"}
            onChange={() => setSelected("option2")}
          />
          <Radio
            name="individual"
            value="option3"
            label="Option 3"
            checked={selected === "option3"}
            onChange={() => setSelected("option3")}
          />
        </div>
      </div>
    );
  },
};
