import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardFooter } from "./Card";
import { Button } from "../Button";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Card Title</h3>
        <p className="text-gray-600">
          This is a basic card with default styling. It includes a border and
          subtle shadow.
        </p>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Elevated Card</h3>
        <p className="text-gray-600">
          This card has more prominent shadows and will lift on hover.
        </p>
      </div>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Outlined Card</h3>
        <p className="text-gray-600">
          This card has a thicker border and no shadow.
        </p>
      </div>
    ),
  },
};

export const Gradient: Story = {
  args: {
    variant: "gradient",
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Gradient Card</h3>
        <p className="text-white/90">
          This card features the Aurora gradient background with white text.
        </p>
      </div>
    ),
  },
};

export const WithHeader: Story = {
  args: {
    header: (
      <CardHeader
        title="Card with Header"
        subtitle="This card has a header section"
      />
    ),
    children: (
      <p className="text-gray-600">
        The main content goes here. The header is separated by a border.
      </p>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    children: (
      <p className="text-gray-600">
        This card has a footer with action buttons below the content.
      </p>
    ),
    footer: (
      <CardFooter align="right">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </CardFooter>
    ),
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: (
      <CardHeader
        title="Complete Card"
        subtitle="With header and footer"
        actions={
          <button className="text-gray-400 hover:text-gray-600">⋮</button>
        }
      />
    ),
    children: (
      <div className="space-y-2">
        <p className="text-gray-600">
          This demonstrates a full card with header, content, and footer
          sections.
        </p>
        <p className="text-sm text-gray-500">
          Each section is properly separated with borders.
        </p>
      </div>
    ),
    footer: (
      <CardFooter align="between">
        <span className="text-sm text-gray-500">Last updated: Today</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button size="sm">View</Button>
        </div>
      </CardFooter>
    ),
  },
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Hoverable Card</h3>
        <p className="text-gray-600">
          Hover over this card to see the lift effect and enhanced shadow.
        </p>
      </div>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    padding: "none",
    children: (
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
        alt="Landscape"
        className="w-full h-48 object-cover rounded-aurora"
      />
    ),
  },
};

export const SmallPadding: Story = {
  args: {
    padding: "sm",
    children: (
      <div>
        <h4 className="font-semibold mb-1">Compact Card</h4>
        <p className="text-sm text-gray-600">
          Small padding for compact layouts
        </p>
      </div>
    ),
  },
};

export const LargePadding: Story = {
  args: {
    padding: "lg",
    children: (
      <div>
        <h3 className="text-xl font-semibold mb-3">Spacious Card</h3>
        <p className="text-gray-600">Large padding for more breathing room</p>
      </div>
    ),
  },
};

export const ProductCard: Story = {
  args: {
    hoverable: true,
    padding: "none",
    children: (
      <div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
            alt="Product"
            className="w-full h-64 object-cover"
          />
          <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Sale
          </span>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">Premium Headphones</h3>
          <p className="text-gray-600 mb-4">
            High-quality audio with noise cancellation
          </p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-aurora-600">$299</span>
              <span className="text-gray-400 line-through ml-2">$399</span>
            </div>
            <Button>Add to Cart</Button>
          </div>
        </div>
      </div>
    ),
  },
};

export const UserProfileCard: Story = {
  args: {
    variant: "elevated",
    padding: "none",
    children: (
      <div>
        <div className="h-32 gradient-aurora" />
        <div className="p-6 -mt-16">
          <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg mb-4 flex items-center justify-center text-4xl">
            👤
          </div>
          <h3 className="text-xl font-bold mb-1">Florence Adikwu</h3>
          <p className="text-gray-600 mb-4">Senior Frontend Engineer</p>
          <div className="flex gap-4 text-sm text-gray-600 mb-4">
            <span>📍 Lagos</span>
            <span>💼 Building Aurora</span>
          </div>
          <Button className="w-full">View Profile</Button>
        </div>
      </div>
    ),
  },
};

export const StatisticsCard: Story = {
  args: {
    variant: "gradient",
    children: (
      <div>
        <div className="text-sm font-medium mb-1 text-white/80">
          Total Revenue
        </div>
        <div className="text-3xl font-bold mb-2">$45,231</div>
        <div className="text-sm text-white/80">↑ 20.1% from last month</div>
      </div>
    ),
  },
};

export const GridOfCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card hoverable>
        <h3 className="text-lg font-semibold mb-2">Card 1</h3>
        <p className="text-gray-600">First card in a grid layout</p>
      </Card>
      <Card hoverable variant="elevated">
        <h3 className="text-lg font-semibold mb-2">Card 2</h3>
        <p className="text-gray-600">Second card with elevated style</p>
      </Card>
      <Card hoverable variant="gradient">
        <h3 className="text-lg font-semibold mb-2">Card 3</h3>
        <p className="text-white/90">Third card with gradient</p>
      </Card>
    </div>
  ),
};
