# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development

```bash
# Start development server
pnpm dev

# Build the component library
pnpm build

# Build and watch for changes
pnpm build:watch

# Run Storybook for component development
pnpm storybook

# Build Storybook static site
pnpm build-storybook
```

### Code Quality

```bash
# Run ESLint
pnpm lint

# Fix ESLint issues
pnpm lint:fix

# Check code formatting with Prettier
pnpm prettier

# Format code with Prettier
pnpm prettier:fix

# TypeScript type checking (no emit)
pnpm codecheck
```

### Testing

```bash
# Run unit tests with Vitest
pnpm test:unit

# Run Storybook tests
pnpm test-storybook
```

### Publishing

```bash
# Publish beta version
pnpm publish:beta
```

## Architecture Overview

This is a React component library built with TypeScript and Vite. The library uses:

- **Mantine** (v7) for base UI components and theming
- **Storybook** for component documentation and testing
- **Vite** for fast development and optimized builds
- **CSS Modules** and **SCSS** for styling with a design system approach
- **Framer Motion** for animations
- **React 19** with latest features

### Project Structure

```
src/
├── assets/          # Images, icons, and static assets
├── components/      # React components (each with its own folder)
│   └── [Component]/
│       ├── index.tsx           # Component implementation
│       ├── [Component].module.scss  # Component styles
│       └── [Component].stories.tsx  # Storybook stories
├── styles/          # Global styles and design system
│   ├── designSystem/   # Design tokens (colors, typography, spacing, buttons)
│   └── utilities/      # SCSS utilities and mixins
├── utils/           # Utility functions and hooks
└── index.ts         # Main export file
```

### Key Design System Files

- `src/styles/designSystem/_colors.scss` - Color variables
- `src/styles/designSystem/_typography.scss` - Type scale system
- `src/styles/designSystem/_spacing.scss` - Spacing system (relative and fixed)
- `src/styles/designSystem/_buttons.scss` - Button styles
- `src/styles/utilities/_variables.scss` - Breakpoints and responsive mixins

### Component Development Patterns

1. **Component Structure**: Each component lives in its own folder with the component file, styles, and stories
2. **Styling**: Use CSS Modules with SCSS. Import design system variables and mixins
3. **Stories**: Every component should have a corresponding `.stories.tsx` file
4. **Exports**: All public components are exported through `src/index.ts`
5. **Props**: Use TypeScript interfaces for all component props, exported alongside the component

### Responsive Design

The library uses a mobile-first approach with predefined breakpoints:

- `for-mobile-only`: max-width 599px
- `for-tablet-portrait-up`: min-width 600px
- `for-desktop-up`: min-width 1200px
- `for-big-desktop-up`: min-width 1800px

Use the mixins from `_variables.scss` rather than hardcoding media queries.

### Build Configuration

The library is built as an ES module with:

- TypeScript declarations generated via `vite-plugin-dts`
- 'use client' directive automatically added for Next.js compatibility
- Assets (fonts, styles) copied to dist folder
- Peer dependencies for React, Mantine, and other core libraries

### Important Notes

- This is a UI component library, not an application
- Components should be reusable and well-documented with Storybook
- Follow the existing design system for consistency
- All new components must include TypeScript types and Storybook stories
- Use the spacing and typography variables from the design system rather than hardcoded values
