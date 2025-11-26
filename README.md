# 🌟 Aurora UI

> A modern React component library with TypeScript, Tailwind CSS, and Web3 aesthetics.

[![npm version](https://img.shields.io/npm/v/@flo-adikwu/aurora-ui.svg)](https://www.npmjs.com/package/@flo-adikwu/aurora-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[📖 Documentation](https://aurora-design-system.vercel.app) | [💻 GitHub](https://github.com/Flo-Adikwu/aurora-design-system)

---

## ✨ Features

- 🎨 **10 Beautiful Components** - Button, Input, Select, Checkbox, Radio, Switch, Modal, Tooltip, Card, Badge
- 📘 **Full TypeScript Support** - Complete type definitions
- ♿ **Accessible** - WCAG 2.1 AA compliant
- 🎭 **Multiple Variants** - Extensive customization options
- 🌈 **Aurora Theme** - Unique gradient aesthetics
- 🧪 **Well Tested** - Comprehensive test coverage
- 📦 **Tree-shakeable** - Import only what you need

---

## 📦 Installation

```bash
npm install @flo-adikwu/aurora-ui
```

---

## 🚀 Quick Start

```tsx
import { Button, Card, Input } from "@flo-adikwu/aurora-ui";
import "@flo-adikwu/aurora-ui/dist/style.css";

function App() {
  return (
    <Card variant="gradient" padding="lg">
      <h2>Welcome to Aurora</h2>
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Button variant="gradient" size="lg">
        Get Started
      </Button>
    </Card>
  );
}
```

---

## 📖 Components

- **Button** - Multiple variants, sizes, and states
- **Input** - Text inputs with validation and icons
- **Select** - Custom dropdown with search
- **Checkbox** - Standard and indeterminate states
- **Radio** - Radio groups with layouts
- **Switch** - Animated toggle switches
- **Modal** - Accessible dialogs with focus management
- **Tooltip** - Positioned tooltips with auto-placement
- **Card** - Flexible layout component
- **Badge** - Status indicators and counts

[View Full Documentation →](https://aurora-design-system.vercel.app)

---

## 🎨 Customization

Aurora uses Tailwind CSS. Add the Aurora colors to your `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        aurora: {
          500: "#0ea5e9",
          600: "#0284c7",
        },
      },
    },
  },
};
```

---

## 📄 License

MIT © [Florence Adikwu](https://github.com/Flo-Adikwu)

---

## 🤝 Contributing

Contributions are welcome! See [GitHub repository](https://github.com/Flo-Adikwu/aurora-design-system).

---

**Made with ❤️ by Florence Adikwu**
