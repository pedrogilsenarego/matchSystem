# Design System

A shared design system library for the scoreboard monorepo, built with [vanilla-extract](https://vanilla-extract.style/).

## Features

- **Theme System**: Consistent colors, spacing, typography, and other design tokens
- **Vanilla CSS Support**: All tokens also available as clean CSS variables (no hashing, no CSS-in-JS required)
- **Utility Styles**: Generic utility classes for layout and text styling
- **Side-effect Free**: No automatic global styles - you control what gets applied
- **Monorepo Ready**: Consumable directly by apps via Vite (no build step required)
- **Type-safe**: Full TypeScript support with vanilla-extract

## Installation

The library is already available in the monorepo workspace. Apps can use it directly:

```tsx
import { vars } from 'design-system';
```

**Important:** The design-system must be built before use to generate CSS files:

```bash
npm run build -w design-system
```

## Usage

### Basic Setup

**Step 1:** Import the design system CSS in your app's entry point (e.g., `main.tsx`):

```tsx
import 'design-system/design-system.css';
import App from './App';
// ... rest of your app setup
```

This imports the pre-built CSS containing:
- CSS custom properties (variables) for all design tokens
- Global styles (box-sizing, body defaults)
- Utility classes (flexRow, gap, textVariant, etc.)

**Step 2:** Use design tokens in your components with vanilla-extract:

```tsx
import { style } from '@vanilla-extract/css';
import { vars } from 'design-system';

const card = style({
  backgroundColor: vars.color.background.surface,
  padding: vars.spacing.xl,
  borderRadius: vars.borderRadius.lg,
});
```

**Or** use the clean CSS variables directly in vanilla CSS:

```css
.card {
  background-color: var(--color-background-surface);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
}
```

### Global Theme (Alternative Import)

**The design-system is completely side-effect free by default.** No global styles are applied unless you explicitly opt-in.

If you prefer a simpler import (without explicitly importing the CSS file), you can use:

```tsx
import 'design-system/global';

function App() {
  return <div>{/* Your app content */}</div>;
}
```

**What gets applied:**

- `box-sizing: border-box` on all elements (modern box model)
- Theme colors, typography, and spacing applied to `body`
- `margin: 0` on `body` (removes default browser margins)
- `min-height: 100vh` on `body` (ensures full viewport height)
- System font stack with smooth font rendering

**When to use:**

- ✅ New projects or apps starting from scratch
- ✅ When you want consistent cross-browser styling and theme
- ❌ Existing apps with established global styles (may conflict)
- ❌ When integrating into third-party applications

### Creating Custom Styles

Use vanilla-extract to create custom styles with access to all theme tokens:

```tsx
import { style } from '@vanilla-extract/css';
import { vars } from 'design-system';

const card = style({
  backgroundColor: vars.color.background.surface,
  padding: vars.spacing.xl,
  borderRadius: vars.borderRadius.lg,
  boxShadow: vars.shadow.sm,

  ':hover': {
    boxShadow: vars.shadow.md,
  },
});

function Card({ children }) {
  return <div className={card}>{children}</div>;
}
```

### Using with Vanilla CSS (No CSS-in-JS Required)

**All design tokens are available as clean, semantic CSS variables** in your stylesheets. No CSS-in-JS, no build step, no JavaScript required - just standard CSS custom properties.

After importing the design system CSS (as shown in Basic Setup), use the CSS variables directly in your stylesheets:

```css
/* style.css */
.card {
  background-color: var(--color-background-surface);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  color: var(--color-text-primary);
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.success-message {
  color: var(--color-semantic-success);
  font-weight: var(--font-weight-semibold);
}

.button {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  border-radius: var(--border-radius-md);
}
```

**All available CSS variables:**

```css
/* Colors */
--color-text-primary, --color-text-secondary, --color-text-muted, --color-text-inverse
--color-background-primary, --color-background-secondary, --color-background-surface, --color-background-light, --color-background-raised
--color-semantic-success, --color-semantic-danger, --color-semantic-warning, --color-semantic-info, --color-semantic-gray
--color-error-background, --color-error-text
--color-border-light, --color-border-medium

/* Spacing */
--spacing-xs, --spacing-sm, --spacing-md, --spacing-lg, --spacing-xl, --spacing-2xl

/* Border Radius */
--border-radius-sm, --border-radius-md, --border-radius-lg

/* Shadows */
--shadow-sm, --shadow-md, --shadow-lg

/* Typography */
--font-size-xs, --font-size-sm, --font-size-base, --font-size-lg, --font-size-xl, --font-size-2xl, --font-size-3xl
--font-weight-normal, --font-weight-medium, --font-weight-semibold, --font-weight-bold, --font-weight-extrabold
--line-height-tight, --line-height-normal, --line-height-relaxed

/* State Layers */
--state-layer-hover, --state-layer-active
```

**Note:** These CSS variables use **clean, semantic names without random hashes**. They are predictable and designed for direct use in vanilla CSS files. Both the `vars` TypeScript object (in vanilla-extract) and direct CSS variable references work seamlessly.

## Design Tokens

### Colors

- **Text**: `primary`, `secondary`, `muted`, `inverse`
- **Background**: `primary`, `secondary`, `surface`, `light`, `raised`
- **Semantic**: `success`, `danger`, `warning`, `info`, `gray`
- **Error**: `background`, `text`
- **Border**: `light`, `medium`

### Spacing

- `xs`: 0.25rem
- `sm`: 0.5rem
- `md`: 0.75rem
- `lg`: 1rem
- `xl`: 1.25rem
- `2xl`: 1.5rem

### Border Radius

- `sm`: 4px
- `md`: 8px
- `lg`: 12px

### Shadows

- `sm`: Light shadow for cards
  **Flex containers:**

```tsx
import { flexRow, flexCol, flexCenter, gap } from 'design-system';

// Horizontal layout with spacing
<div className={`${flexRow} ${gap.md}`}>
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Vertical layout
<div className={`${flexCol} ${gap.lg}`}>
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Centered content
<div className={flexCenter}>
  <span>Centered</span>
</div>
```

Available utilities:

- `flexRow` - Row direction flex container
- `flexCol` - Column direction flex container
- `flexCenter` - Centered content (both axes)
- `gap.xs` through `gap.xl` - Spacing between flex/grid children

### Text Utilities

**Color variants:**

```tsx
import { textVariant } from 'design-system';

<div>
  <p className={textVariant.primary}>Primary text</p>
  <p className={textVariant.secondary}>Secondary text</p>
  <p className={textVariant.muted}>Muted text</p>
  <p className={textVariant.success}>Success message</p>
  <p className={textVariant.danger}>Error message</p>
  <p className={textVariant.warning}>Warning message</p>
  <p className={textVariant.info}>Info message</p>
</div>;
```

### Combining Utilities

````tsx
import { flexCol, gap, textVariant } from 'design-system';

function Header() {
  return (
    <div className={`${flexCol} ${gap.lg}`}>
      <h1 className={textVariant.primary}>Page Title</h1>
      <p className={textVariant.secondary}>Description goes here</p>
      <span className={textVariant.muted}>Last updated: Today

- **Text color variants**: `textVariant.primary`, `textVariant.secondary`, `textVariant.muted`, `textVariant.success`, `textVariant.danger`, `textVariant.warning`, `textVariant.info`

### Usage Example

```typescript
import { flexRow, gap, textVariant } from 'design-system';

function MyComponent() {
  return (
    <div className={`${flexRow} ${gap.md}`}>
      <span className={textVariant.primary}>Primary text</span>
      <span className={textVariant.success}>Success message</span>
    </div>
  );
}
````

## Development

```bash
# Build the library
npm run build --workspace=libs/design-system

# Watch mode for development
npm run dev --workspace=libs/design-system
```
