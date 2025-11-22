import type { Meta, StoryObj } from "@storybook/react";
import { Select, SelectOption } from "./Select";
import React from "react";

const frameworkOptions: SelectOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid.js" },
];

const countryOptions: SelectOption[] = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "ng", label: "Nigeria" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
];

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error"],
      description: "The visual variant of the select",
    },
    selectSize: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the select",
    },
    disabled: {
      control: "boolean",
      description: "Disables the select",
    },
    required: {
      control: "boolean",
      description: "Marks the select as required",
    },
    fullWidth: {
      control: "boolean",
      description: "Makes the select full width",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    options: frameworkOptions,
    placeholder: "Select a framework",
  },
};

export const WithLabel: Story = {
  args: {
    options: frameworkOptions,
    label: "Framework",
    placeholder: "Choose your framework",
  },
};

export const WithHelperText: Story = {
  args: {
    options: frameworkOptions,
    label: "Framework",
    helperText: "Select your preferred JavaScript framework",
  },
};

export const WithError: Story = {
  args: {
    options: frameworkOptions,
    label: "Framework",
    error: "Please select a framework",
  },
};

export const Required: Story = {
  args: {
    options: frameworkOptions,
    label: "Framework",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    options: frameworkOptions,
    label: "Framework",
    disabled: true,
    value: "react",
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue.js", disabled: true },
      { value: "angular", label: "Angular" },
      { value: "svelte", label: "Svelte", disabled: true },
    ],
    label: "Framework",
    helperText: "Some options are disabled",
  },
};

export const PreSelected: Story = {
  args: {
    options: frameworkOptions,
    label: "Framework",
    value: "react",
  },
};

export const Small: Story = {
  args: {
    options: frameworkOptions,
    label: "Small Select",
    selectSize: "sm",
  },
};

export const Medium: Story = {
  args: {
    options: frameworkOptions,
    label: "Medium Select",
    selectSize: "md",
  },
};

export const Large: Story = {
  args: {
    options: frameworkOptions,
    label: "Large Select",
    selectSize: "lg",
  },
};

export const LongOptionList: Story = {
  args: {
    options: countryOptions,
    label: "Country",
    placeholder: "Select your country",
    helperText: "Scroll to see all options",
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("");

    return (
      <div className="w-80 space-y-4">
        <Select
          options={frameworkOptions}
          label="Framework"
          value={value}
          onChange={setValue}
          helperText="Select a framework to see it below"
        />
        {value && (
          <div className="rounded-aurora border border-aurora-200 bg-aurora-50 p-4">
            <p className="text-sm font-medium text-aurora-900">
              Selected: <span className="font-bold">{value}</span>
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Select
        options={frameworkOptions}
        label="Small"
        selectSize="sm"
        placeholder="Small select"
      />
      <Select
        options={frameworkOptions}
        label="Medium"
        selectSize="md"
        placeholder="Medium select"
      />
      <Select
        options={frameworkOptions}
        label="Large"
        selectSize="lg"
        placeholder="Large select"
      />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      framework: "",
      country: "",
      experience: "",
    });

    const experienceOptions = [
      { value: "beginner", label: "Beginner (0-2 years)" },
      { value: "intermediate", label: "Intermediate (2-5 years)" },
      { value: "advanced", label: "Advanced (5+ years)" },
    ];

    return (
      <form className="flex flex-col gap-4 w-80">
        <Select
          options={frameworkOptions}
          label="Framework"
          value={formData.framework}
          onChange={(value) => setFormData({ ...formData, framework: value })}
          required
          helperText="Your primary framework"
        />
        <Select
          options={experienceOptions}
          label="Experience Level"
          value={formData.experience}
          onChange={(value) => setFormData({ ...formData, experience: value })}
          required
        />
        <Select
          options={countryOptions}
          label="Country"
          value={formData.country}
          onChange={(value) => setFormData({ ...formData, country: value })}
          required
          helperText="Where are you located?"
        />
        <div className="mt-2 rounded-aurora border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm font-medium text-gray-700">Form Data:</p>
          <pre className="mt-2 text-xs text-gray-600">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </form>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const [error, setError] = React.useState("");

    const handleChange = (newValue: string) => {
      setValue(newValue);
      if (newValue === "angular") {
        setError("Angular is not recommended for new projects");
      } else {
        setError("");
      }
    };

    return (
      <div className="w-80">
        <Select
          options={frameworkOptions}
          label="Framework"
          value={value}
          onChange={handleChange}
          error={error}
          helperText={!error ? "Choose wisely!" : undefined}
        />
      </div>
    );
  },
};

export const InteractivePlayground: Story = {
  render: () => {
    const [framework, setFramework] = React.useState("");
    const [country, setCountry] = React.useState("");

    return (
      <div className="space-y-6 w-96">
        <div className="rounded-aurora gradient-aurora p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Developer Profile</h3>
          <p className="text-sm opacity-90">
            Build your developer profile by selecting options
          </p>
        </div>

        <Select
          options={frameworkOptions}
          label="Favorite Framework"
          value={framework}
          onChange={setFramework}
          placeholder="Choose framework..."
          required
        />

        <Select
          options={countryOptions}
          label="Location"
          value={country}
          onChange={setCountry}
          placeholder="Select country..."
          required
        />

        {(framework || country) && (
          <div className="rounded-aurora border-2 border-aurora-500 bg-aurora-50 p-4 animate-slide-up">
            <h4 className="font-semibold text-aurora-900 mb-2">
              Your Profile:
            </h4>
            <ul className="space-y-1 text-sm text-aurora-700">
              {framework && (
                <li>
                  • Framework:{" "}
                  {frameworkOptions.find((o) => o.value === framework)?.label}
                </li>
              )}
              {country && (
                <li>
                  • Location:{" "}
                  {countryOptions.find((o) => o.value === country)?.label}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  },
};
