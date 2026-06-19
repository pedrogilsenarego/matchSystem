# UI Components

A shared UI component library for the scoreboard monorepo, built with React, Radix UI, and vanilla-extract.

## Features

- **Design System Integration**: Consumes the design-system library for consistent theming
- **Radix UI**: Uses Radix UI Slot for polymorphic components
- **Type-safe**: Full TypeScript support
- **ES Modules**: Modern ES module format
- **Monorepo Ready**: Consumable directly by apps via Vite (no build step required)
- **Styled with vanilla-extract**: Type-safe CSS-in-TS

## Installation

The library is already available in the monorepo workspace. Apps can use it directly:

```tsx
import { Button, Card, Badge } from 'ui-components';
```

**Important:** Both ui-components and design-system must be built before use:

```bash
npm run build -w design-system -w ui-components
```

### Setup

Import the required CSS files in your app's entry point (e.g., `main.tsx`):

```tsx
import 'design-system/design-system.css';
import 'ui-components/ui-components.css';
import App from './App';

// ... rest of your app setup
```

**Why these imports are needed:**

- `design-system/design-system.css` - Provides CSS variables and base styles
- `ui-components/ui-components.css` - Contains component styles (Button, Card, Badge, etc.)

Without these CSS imports, components will render but have no styling.

## Components

This library provides a set of reusable UI components. For detailed documentation, usage examples, and prop types, see the JSDoc comments in each component file:

- **Button** - Flexible button with multiple variants, sizes, and states
- **Heading** - Semantic headings with automatic sizing and hierarchy
- **Card** - Simple card container with consistent styling
- **Badge** - Status badges with semantic color variants
- **ErrorBoundary** - Error boundary for catching JavaScript errors in child trees
- **ErrorMessage** - Error messages with consistent styling
- **LoadingMessage** - Loading state indicators

All components support the `asChild` prop via Radix UI Slot for polymorphic rendering.

## Development

```bash
# Build the library
npm run build --workspace=libs/ui-components

# Watch mode for development
npm run dev --workspace=libs/ui-components

# Build from root
npm run build:ui-components
```

## Dependencies

- **React 19**: Peer dependency
- **Radix UI Slot**: For polymorphic component behavior
- **design-system**: Internal workspace dependency for theming
- **vanilla-extract**: For type-safe styles
