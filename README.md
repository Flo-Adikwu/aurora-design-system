# Aurora Design System

A modern, playful design system built with React, TypeScript, and Tailwind CSS.

## Features

✨ **Modern & Playful** - Clean aesthetics with gradient accents and smooth animations  
🎨 **Fully Typed** - Complete TypeScript support with excellent IntelliSense  
♿ **Accessible** - WCAG 2.1 compliant with comprehensive accessibility testing  
🎯 **Customizable** - Built with Tailwind CSS and class-variance-authority  
📦 **Tree-shakeable** - Import only what you need  
🧪 **Well Tested** - Comprehensive test coverage with Vitest and jest-axe

## Installation

```bash
npm install aurora-design-system
# or
yarn add aurora-design-system
# or
pnpm add aurora-design-system
```

## Usage

```tsx
import { Button } from "aurora-design-system";

function App() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}
```

## Components

- **Button** - Versatile button with multiple variants and states
- **Input** - Text input with label, error states, and icons
- **Select** - Dropdown select component
- **Checkbox** - Accessible checkbox with indeterminate state
- **Radio** - Radio button groups
- **Modal** - Accessible dialog/modal component
- **Tooltip** - Contextual tooltips with positioning
- **Card** - Flexible card component
- **Badge** - Small status indicators
- **Switch** - Toggle switch component

## Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Run tests
npm test

# Build library
npm run build
```

## Design Tokens

Aurora Design System uses a cohesive color system with three primary gradients:

- **Aurora Blue** - Primary brand color
- **Purple** - Secondary accent
- **Pink** - Tertiary accent

All components support smooth transitions, hover states, and focus indicators for an engaging user experience.

## Accessibility

All components are built with accessibility in mind:

- Proper ARIA attributes
- Keyboard navigation support
- Screen reader friendly
- Focus management
- Color contrast compliance

## License

MIT © Florence

## Author

Built by Florence Adikwu- Senior Frontend Engineer specializing in React, TypeScript, and modern design systems.
