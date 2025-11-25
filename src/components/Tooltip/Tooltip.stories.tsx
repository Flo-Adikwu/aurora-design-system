import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button";
import React from "react";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Position of tooltip relative to trigger",
    },
    variant: {
      control: "select",
      options: ["default", "dark", "light"],
      description: "Visual variant of the tooltip",
    },
    delay: {
      control: "number",
      description: "Delay before showing tooltip (ms)",
    },
    disabled: {
      control: "boolean",
      description: "Disable the tooltip",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "This is a helpful tooltip",
    children: <Button>Hover me</Button>,
  },
};

export const Positions: Story = {
  render: () => (
    <div className="flex gap-8 items-center justify-center p-20">
      <Tooltip content="Tooltip on top" position="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="Tooltip on bottom" position="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="Tooltip on left" position="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip content="Tooltip on right" position="right">
        <Button>Right</Button>
      </Tooltip>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Tooltip content="Aurora gradient tooltip" variant="default">
        <Button>Default</Button>
      </Tooltip>
      <Tooltip content="Dark tooltip" variant="dark">
        <Button variant="secondary">Dark</Button>
      </Tooltip>
      <Tooltip content="Light tooltip" variant="light">
        <Button variant="outline">Light</Button>
      </Tooltip>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-700">Hover the icon for help</span>
      <Tooltip content="This feature helps you manage your account settings">
        <button className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 text-xs font-semibold transition-colors">
          ?
        </button>
      </Tooltip>
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    content:
      "This is a longer tooltip with multiple lines of text to demonstrate how the tooltip handles longer content gracefully.",
    children: <Button>Hover for long tooltip</Button>,
  },
};

export const WithDelay: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="Instant tooltip" delay={0}>
        <Button>No delay</Button>
      </Tooltip>
      <Tooltip content="200ms delay (default)" delay={200}>
        <Button>Default delay</Button>
      </Tooltip>
      <Tooltip content="1 second delay" delay={1000}>
        <Button>Long delay</Button>
      </Tooltip>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    content: "This tooltip is disabled",
    disabled: true,
    children: <Button>No tooltip</Button>,
  },
};

export const OnDifferentElements: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-start">
      <Tooltip content="Tooltip on a button">
        <Button>Button</Button>
      </Tooltip>

      <Tooltip content="Tooltip on a link">
        <a
          href="#"
          className="text-aurora-500 hover:text-aurora-600 font-medium underline"
        >
          Link with tooltip
        </a>
      </Tooltip>

      <Tooltip content="Tooltip on an input">
        <input
          type="text"
          placeholder="Input with tooltip"
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-aurora-500"
        />
      </Tooltip>

      <Tooltip content="Tooltip on a badge">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-aurora-100 text-aurora-700">
          Badge
        </span>
      </Tooltip>
    </div>
  ),
};

export const RichContent: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip
        content={
          <div className="flex flex-col gap-1">
            <div className="font-semibold">Pro Feature</div>
            <div className="text-xs opacity-90">
              Upgrade to unlock this feature
            </div>
          </div>
        }
      >
        <Button>Rich tooltip</Button>
      </Tooltip>

      <Tooltip
        content={
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span>Online</span>
          </div>
        }
        variant="dark"
      >
        <div className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer" />
      </Tooltip>
    </div>
  ),
};

export const Playground: Story = {
  render: () => (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
      <div className="grid grid-cols-3 gap-8">
        <div className="flex justify-center">
          <Tooltip content="Top tooltip" position="top">
            <Button>Top</Button>
          </Tooltip>
        </div>
        <div className="col-start-2" />
        <div className="flex justify-center">
          <Tooltip content="Top tooltip" position="top">
            <Button>Top</Button>
          </Tooltip>
        </div>

        <div className="flex items-center justify-end">
          <Tooltip content="Left tooltip" position="left">
            <Button>Left</Button>
          </Tooltip>
        </div>
        <div className="flex items-center justify-center">
          <Tooltip content="Center tooltip">
            <Button size="lg">Center</Button>
          </Tooltip>
        </div>
        <div className="flex items-center justify-start">
          <Tooltip content="Right tooltip" position="right">
            <Button>Right</Button>
          </Tooltip>
        </div>

        <div className="flex justify-center">
          <Tooltip content="Bottom tooltip" position="bottom">
            <Button>Bottom</Button>
          </Tooltip>
        </div>
        <div className="col-start-2" />
        <div className="flex justify-center">
          <Tooltip content="Bottom tooltip" position="bottom">
            <Button>Bottom</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [count, setCount] = React.useState(0);

    return (
      <div className="flex flex-col items-center gap-8 p-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Interactive Tooltip Demo
          </h3>
          <p className="text-sm text-gray-600">
            Hover over the button to see the tooltip with live count
          </p>
        </div>

        <Tooltip content={`You've clicked ${count} times`}>
          <Button onClick={() => setCount(count + 1)}>
            Click me (Count: {count})
          </Button>
        </Tooltip>

        <div className="flex gap-4">
          <Tooltip content="Reset the counter" position="top" variant="dark">
            <Button variant="outline" size="sm" onClick={() => setCount(0)}>
              Reset
            </Button>
          </Tooltip>
          <Tooltip content="Add 10 to counter" position="top" variant="default">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCount(count + 10)}
            >
              +10
            </Button>
          </Tooltip>
        </div>
      </div>
    );
  },
};
