import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";
import { Button } from "../Button";
import React from "react";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error"],
      description: "The visual variant of the switch",
    },
    switchSize: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the switch",
    },
    labelPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Position of the label relative to switch",
    },
    disabled: {
      control: "boolean",
      description: "Disables the switch",
    },
    required: {
      control: "boolean",
      description: "Marks the switch as required",
    },
    checked: {
      control: "boolean",
      description: "Whether the switch is on",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: "Enable notifications",
  },
};

export const Checked: Story = {
  args: {
    label: "Enabled feature",
    checked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Dark mode",
    helperText: "Toggle dark mode on or off",
  },
};

export const WithError: Story = {
  args: {
    label: "Accept terms",
    error: "You must accept to continue",
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
    label: "Disabled switch",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled and on",
    disabled: true,
    checked: true,
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
    label: "Small switch",
    switchSize: "sm",
  },
};

export const Medium: Story = {
  args: {
    label: "Medium switch (default)",
    switchSize: "md",
  },
};

export const Large: Story = {
  args: {
    label: "Large switch",
    switchSize: "lg",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Small" switchSize="sm" checked />
      <Switch label="Medium (default)" switchSize="md" checked />
      <Switch label="Large" switchSize="lg" checked />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);

    return (
      <div className="space-y-4">
        <Switch
          label="Controlled switch"
          checked={checked}
          onChange={setChecked}
        />
        <div className="text-sm text-gray-600">
          Status:{" "}
          <span className="font-semibold">{checked ? "On" : "Off"}</span>
        </div>
        <Button onClick={() => setChecked(!checked)} size="sm">
          Toggle Externally
        </Button>
      </div>
    );
  },
};

export const SettingsPanel: Story = {
  render: () => {
    const [settings, setSettings] = React.useState({
      notifications: true,
      emailUpdates: false,
      darkMode: true,
      autoSave: true,
    });

    return (
      <div className="w-96 space-y-6">
        <div className="rounded-aurora gradient-aurora p-4 text-white">
          <h3 className="text-lg font-bold">Settings</h3>
          <p className="text-sm opacity-90">Customize your experience</p>
        </div>

        <div className="space-y-4">
          <Switch
            label="Push Notifications"
            checked={settings.notifications}
            onChange={(checked) =>
              setSettings({ ...settings, notifications: checked })
            }
            helperText="Receive push notifications on your device"
          />

          <Switch
            label="Email Updates"
            checked={settings.emailUpdates}
            onChange={(checked) =>
              setSettings({ ...settings, emailUpdates: checked })
            }
            helperText="Get weekly email updates about new features"
          />

          <Switch
            label="Dark Mode"
            checked={settings.darkMode}
            onChange={(checked) =>
              setSettings({ ...settings, darkMode: checked })
            }
            helperText="Use dark theme throughout the app"
          />

          <Switch
            label="Auto-save"
            checked={settings.autoSave}
            onChange={(checked) =>
              setSettings({ ...settings, autoSave: checked })
            }
            helperText="Automatically save your work"
          />
        </div>

        <div className="rounded-aurora border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm font-medium text-gray-700">Settings State:</p>
          <pre className="mt-2 text-xs text-gray-600">
            {JSON.stringify(settings, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};

export const PrivacyControls: Story = {
  render: () => {
    const [privacy, setPrivacy] = React.useState({
      publicProfile: false,
      showEmail: false,
      allowMessages: true,
      shareActivity: false,
    });

    return (
      <div className="w-96 space-y-4">
        <div className="rounded-aurora border-2 border-aurora-500 bg-aurora-50 p-4">
          <h3 className="font-semibold text-aurora-900">Privacy Settings</h3>
          <p className="text-sm text-aurora-700">Control your privacy</p>
        </div>

        <div className="space-y-3">
          <Switch
            label="Public Profile"
            checked={privacy.publicProfile}
            onChange={(checked) =>
              setPrivacy({ ...privacy, publicProfile: checked })
            }
            helperText="Make your profile visible to everyone"
          />

          <Switch
            label="Show Email"
            checked={privacy.showEmail}
            onChange={(checked) =>
              setPrivacy({ ...privacy, showEmail: checked })
            }
            helperText="Display your email on your profile"
          />

          <Switch
            label="Allow Messages"
            checked={privacy.allowMessages}
            onChange={(checked) =>
              setPrivacy({ ...privacy, allowMessages: checked })
            }
            helperText="Let others send you direct messages"
          />

          <Switch
            label="Share Activity"
            checked={privacy.shareActivity}
            onChange={(checked) =>
              setPrivacy({ ...privacy, shareActivity: checked })
            }
            helperText="Share your activity with followers"
          />
        </div>
      </div>
    );
  },
};

export const FeatureToggles: Story = {
  render: () => {
    const [features, setFeatures] = React.useState({
      betaFeatures: false,
      analytics: true,
      experiments: false,
    });

    return (
      <div className="w-96 space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900">Feature Flags</h3>
          <p className="text-sm text-gray-600">Enable experimental features</p>
        </div>

        <div className="space-y-3">
          <Switch
            label="Beta Features"
            checked={features.betaFeatures}
            onChange={(checked) =>
              setFeatures({ ...features, betaFeatures: checked })
            }
            helperText="Access features before they're released"
          />

          <Switch
            label="Analytics"
            checked={features.analytics}
            onChange={(checked) =>
              setFeatures({ ...features, analytics: checked })
            }
            helperText="Help us improve by sharing usage data"
          />

          <Switch
            label="Experimental Mode"
            checked={features.experiments}
            onChange={(checked) =>
              setFeatures({ ...features, experiments: checked })
            }
            error={
              features.experiments
                ? "Experimental features may be unstable"
                : undefined
            }
          />
        </div>

        {features.betaFeatures && (
          <div className="rounded-aurora border-2 border-aurora-500 bg-aurora-50 p-3 animate-slide-up">
            <p className="text-sm font-semibold text-aurora-900">
              🎉 Beta features enabled!
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const [accepted, setAccepted] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleSubmit = () => {
      if (!accepted) {
        setError("You must accept the terms to continue");
      } else {
        setError("");
        alert("Form submitted!");
      }
    };

    return (
      <div className="w-96 space-y-4">
        <Switch
          label="I accept the terms and conditions"
          checked={accepted}
          onChange={(checked) => {
            setAccepted(checked);
            if (checked) setError("");
          }}
          error={error}
          required
        />

        <Button onClick={handleSubmit} fullWidth>
          Submit
        </Button>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="grid gap-4">
      <div className="font-semibold text-gray-900">All Switch States:</div>

      <div className="grid gap-3">
        <Switch label="Off (default)" checked={false} onChange={() => {}} />
        <Switch label="On" checked={true} onChange={() => {}} />
        <Switch
          label="Disabled Off"
          disabled
          checked={false}
          onChange={() => {}}
        />
        <Switch
          label="Disabled On"
          disabled
          checked={true}
          onChange={() => {}}
        />
        <Switch label="With Error" error="This field is required" />
        <Switch label="Required" required />
        <Switch label="With Helper Text" helperText="Toggle this option" />
        <Switch label="Label Left" labelPosition="left" checked />
      </div>
    </div>
  ),
};

export const CompactList: Story = {
  render: () => {
    const [items, setItems] = React.useState([
      { id: 1, name: "Feature A", enabled: true },
      { id: 2, name: "Feature B", enabled: false },
      { id: 3, name: "Feature C", enabled: true },
      { id: 4, name: "Feature D", enabled: false },
    ]);

    const toggleItem = (id: number) => {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, enabled: !item.enabled } : item
        )
      );
    };

    return (
      <div className="w-80 rounded-aurora border border-gray-200 divide-y divide-gray-200">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4">
            <span className="text-sm font-medium text-gray-900">
              {item.name}
            </span>
            <Switch
              checked={item.enabled}
              onChange={() => toggleItem(item.id)}
              switchSize="sm"
            />
          </div>
        ))}
      </div>
    );
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [isOn, setIsOn] = React.useState(false);

    return (
      <div className="flex flex-col items-center gap-6 p-8">
        <div
          className={cn(
            "w-32 h-32 rounded-full transition-all duration-300 flex items-center justify-center text-4xl",
            isOn
              ? "bg-gradient-to-br from-aurora-400 to-aurora-600 scale-110"
              : "bg-gray-300 scale-100"
          )}
        >
          {isOn ? "💡" : "🌙"}
        </div>

        <Switch
          label={isOn ? "Lights On" : "Lights Off"}
          checked={isOn}
          onChange={setIsOn}
          switchSize="lg"
        />

        <p className="text-sm text-gray-600">
          {isOn ? "The room is bright!" : "The room is dark."}
        </p>
      </div>
    );
  },
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
