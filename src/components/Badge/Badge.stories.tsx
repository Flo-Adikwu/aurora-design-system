import type { Meta, StoryObj } from "@storybook/react";
import { Badge, NotificationBadge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Success",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "Error",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "Info",
  },
};

export const Gradient: Story = {
  args: {
    variant: "gradient",
    children: "Gradient",
  },
};

export const SmallSize: Story = {
  args: {
    badgeSize: "sm",
    variant: "primary",
    children: "Small",
  },
};

export const MediumSize: Story = {
  args: {
    badgeSize: "md",
    variant: "primary",
    children: "Medium",
  },
};

export const LargeSize: Story = {
  args: {
    badgeSize: "lg",
    variant: "primary",
    children: "Large",
  },
};

export const PillShape: Story = {
  args: {
    shape: "pill",
    variant: "primary",
    children: "Pill Shape",
  },
};

export const RoundedShape: Story = {
  args: {
    shape: "rounded",
    variant: "primary",
    children: "Rounded",
  },
};

export const SquareShape: Story = {
  args: {
    shape: "square",
    variant: "primary",
    children: "Square",
  },
};

export const WithDot: Story = {
  args: {
    dot: true,
    variant: "success",
    children: "Online",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="gradient">Gradient</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge badgeSize="sm" variant="primary">
        Small
      </Badge>
      <Badge badgeSize="md" variant="primary">
        Medium
      </Badge>
      <Badge badgeSize="lg" variant="primary">
        Large
      </Badge>
    </div>
  ),
};

export const AllShapes: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge shape="pill" variant="primary">
        Pill
      </Badge>
      <Badge shape="rounded" variant="primary">
        Rounded
      </Badge>
      <Badge shape="square" variant="primary">
        Square
      </Badge>
    </div>
  ),
};

export const WithDots: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge dot variant="success">
        Online
      </Badge>
      <Badge dot variant="error">
        Offline
      </Badge>
      <Badge dot variant="warning">
        Away
      </Badge>
      <Badge dot variant="info">
        Busy
      </Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">System Status:</span>
        <Badge dot variant="success">
          Operational
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Build Status:</span>
        <Badge dot variant="error">
          Failed
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Deployment:</span>
        <Badge dot variant="warning">
          In Progress
        </Badge>
      </div>
    </div>
  ),
};

// NotificationBadge Stories
export const NotificationDefault: Story = {
  render: () => (
    <div className="relative inline-block">
      <button className="px-4 py-2 bg-gray-100 rounded-lg">
        Notifications
      </button>
      <span className="absolute -top-2 -right-2">
        <NotificationBadge count={5} />
      </span>
    </div>
  ),
};

export const NotificationWithMax: Story = {
  render: () => (
    <div className="relative inline-block">
      <button className="px-4 py-2 bg-gray-100 rounded-lg">Messages</button>
      <span className="absolute -top-2 -right-2">
        <NotificationBadge count={150} max={99} />
      </span>
    </div>
  ),
};

export const NotificationZero: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="relative inline-block">
        <button className="px-4 py-2 bg-gray-100 rounded-lg">
          Hidden (count=0)
        </button>
        <span className="absolute -top-2 -right-2">
          <NotificationBadge count={0} />
        </span>
      </div>
      <div className="relative inline-block">
        <button className="px-4 py-2 bg-gray-100 rounded-lg">
          Shown (showZero)
        </button>
        <span className="absolute -top-2 -right-2">
          <NotificationBadge count={0} showZero />
        </span>
      </div>
    </div>
  ),
};

export const NotificationVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="relative inline-block">
        <button className="px-4 py-2 bg-gray-100 rounded-lg">Errors</button>
        <span className="absolute -top-2 -right-2">
          <NotificationBadge count={3} variant="error" />
        </span>
      </div>
      <div className="relative inline-block">
        <button className="px-4 py-2 bg-gray-100 rounded-lg">Warnings</button>
        <span className="absolute -top-2 -right-2">
          <NotificationBadge count={7} variant="warning" />
        </span>
      </div>
      <div className="relative inline-block">
        <button className="px-4 py-2 bg-gray-100 rounded-lg">Updates</button>
        <span className="absolute -top-2 -right-2">
          <NotificationBadge count={12} variant="info" />
        </span>
      </div>
    </div>
  ),
};

export const InlineWithText: Story = {
  render: () => (
    <div className="space-y-2">
      <p className="text-gray-700">
        Status: <Badge variant="success">Active</Badge>
      </p>
      <p className="text-gray-700">
        Version: <Badge variant="info">v2.0.1</Badge>
      </p>
      <p className="text-gray-700">
        Priority: <Badge variant="error">High</Badge>
      </p>
    </div>
  ),
};

export const TagList: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="primary">React</Badge>
      <Badge variant="primary">TypeScript</Badge>
      <Badge variant="primary">Tailwind</Badge>
      <Badge variant="primary">Vite</Badge>
      <Badge variant="primary">Storybook</Badge>
    </div>
  ),
};

export const CategoryBadges: Story = {
  render: () => (
    <div className="space-y-3">
      <div>
        <h4 className="text-sm font-medium mb-2">Article Categories</h4>
        <div className="flex flex-wrap gap-2">
          <Badge shape="rounded" variant="gradient">
            Featured
          </Badge>
          <Badge shape="rounded">Technology</Badge>
          <Badge shape="rounded">Design</Badge>
          <Badge shape="rounded">Business</Badge>
        </div>
      </div>
    </div>
  ),
};
