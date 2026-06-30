# Sneakers Technical Assignment

A professional frontend developer technical assignment project template, bootstrapped and pre-configured for scalability, performance, and best practices.

## Overview

This repository establishes a clean, professional, and lightweight base for building the Sneakers storefront application. It contains zero pre-built business logic, placeholder pages, or boilerplate UI, leaving all design, architectural implementation, and feature construction decisions to the developer.

## Tech Stack & Tooling

- **Core Framework**: [Next.js](https://nextjs.org/) (Latest stable, using the App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety
- **Styling**: [Sass (SCSS)](https://sass-lang.com/) with a decoupled design-token variables & mixins structure
- **Code Quality & Formatting**:
  - [ESLint](https://eslint.org/) (Configured with Next.js flat config)
  - [Prettier](https://prettier.io/) integrated directly into ESLint
  - [EditorConfig](https://editorconfig.org/) for unified editor behavior (indentation, line endings)

---

## Folder Structure

The project follows a clean, modular structure nested under the `src/` directory to organize concerns logically:

```text
src/
├── app/                  # Next.js App Router (pages, layout, routing, global style)
│   ├── globals.scss      # Main global styles entry importing reset, variables, base etc.
│   ├── layout.tsx        # Base root layout configuration
│   └── page.tsx          # Storefront entry point
├── components/           # Feature-first component structure
│   ├── cart/             # Cart components (e.g., CartButton, CartBadge)
│   ├── common/           # Generic reusable elements (e.g., Button, Spinner, Skeleton, ErrorState)
│   ├── filters/          # Catalog search and sorting (e.g., SearchBar, CategoryFilter, SortSelect)
│   ├── layout/           # Page wrapper layouts (e.g., Navbar, Footer, Container)
│   └── product/          # Product display components (e.g., ProductCard, ProductGrid, ProductImage)
├── constants/            # Application-wide immutable variables and configs
├── context/              # React Context Providers for global state (e.g., CartContext)
├── hooks/                # Custom reusable React hooks
├── lib/                  # External services or SDK clients (e.g., API fetch wrapper)
├── styles/               # Global SCSS style sheets (partials)
│   ├── _base.scss        # Default layouts, container widths, and global typography
│   ├── _mixins.scss      # Media queries, flex/grid helpers, line-clamp, etc.
│   ├── _reset.scss       # Modern cross-browser CSS reset overrides
│   └── _variables.scss   # HSL Design tokens (colors, font families, transitions, breakpoints)
├── types/                # TypeScript definitions & interfaces (e.g., product.ts, cart.ts, api.ts)
└── utils/                # Helper functions (e.g., formatters, storage utilities)
```

> [!NOTE]
> Every folder under `src/components/` and `src/types/` has been prepared with folder groups to support modularity. For example, adding components like `ProductCard` is as simple as creating `ProductCard.tsx`, `ProductCard.module.scss`, and `index.ts` under its respective directory.

---

## Getting Started

### Installation

To install all dependencies:

```bash
npm install
```

### Development Server

Start the local development server:

```bash
npm run dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

### Build

Compile the application for production:

```bash
npm run build
```

### Linting & Formatting

Verify files are aligned with ESLint and Prettier styling rules:

```bash
npm run lint
```

Auto-format files manually using Prettier:

```bash
npx prettier --write .
```

---

## Future Roadmap & Guidelines

When implementing features on top of this template:

1. **No assumptions**: Keep layouts responsive and use the established design variables in `src/styles/_variables.scss`.
2. **Modular SCSS**: Utilize CSS Modules for local component styling (e.g. `ComponentName.module.scss`) and `@use` the variables or mixins in them where appropriate.
3. **Type Safety**: Maintain robust, clean interfaces in `src/types/` (such as `product.ts`, `cart.ts`, and `api.ts`) matching the upstream API responses.
