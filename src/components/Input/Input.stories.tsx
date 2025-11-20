import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import React from "react";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error"],
      description: "The visual variant of the input",
    },
    inputSize: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the input",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
      description: "The type of input",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input",
    },
    required: {
      control: "boolean",
      description: "Marks the input as required",
    },
    fullWidth: {
      control: "boolean",
      description: "Makes the input full width",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "you@example.com",
    type: "email",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Username",
    placeholder: "johndoe",
    helperText: "Choose a unique username",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    error: "Please enter a valid email address",
    defaultValue: "invalid-email",
  },
};

export const Required: Story = {
  args: {
    label: "Full Name",
    placeholder: "John Doe",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "Cannot edit",
    disabled: true,
    defaultValue: "Disabled value",
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    leftIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
};

export const WithRightIcon: Story = {
  args: {
    label: "Website",
    placeholder: "https://example.com",
    type: "url",
    rightIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
};

export const PasswordWithToggle: Story = {
  render: () => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter password"
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer hover:text-gray-600"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        }
      />
    );
  },
};

export const Small: Story = {
  args: {
    label: "Small Input",
    placeholder: "Small size",
    inputSize: "sm",
  },
};

export const Medium: Story = {
  args: {
    label: "Medium Input",
    placeholder: "Medium size (default)",
    inputSize: "md",
  },
};

export const Large: Story = {
  args: {
    label: "Large Input",
    placeholder: "Large size",
    inputSize: "lg",
  },
};

export const EmailInput: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    helperText: "We will never share your email",
  },
};

export const NumberInput: Story = {
  args: {
    label: "Age",
    type: "number",
    placeholder: "25",
    min: 0,
    max: 120,
  },
};

export const PhoneInput: Story = {
  args: {
    label: "Phone Number",
    type: "tel",
    placeholder: "+1 (555) 123-4567",
    leftIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input inputSize="sm" placeholder="Small input" label="Small" />
      <Input inputSize="md" placeholder="Medium input" label="Medium" />
      <Input inputSize="lg" placeholder="Large input" label="Large" />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form className="flex flex-col gap-4 w-80">
      <Input label="Full Name" placeholder="John Doe" required />
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        required
        helperText="We'll never share your email"
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        required
        helperText="Must be at least 8 characters"
      />
      <Input
        label="Phone"
        type="tel"
        placeholder="+1 (555) 123-4567"
        leftIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        }
      />
    </form>
  ),
};
