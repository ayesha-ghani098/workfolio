# Workfolio - Project Structure & Documentation

## 🏗️ Project Overview

AG.Workfolio is a modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. It features a gaming-inspired design with interactive elements, smooth animations, and a clean, professional layout.

## 📁 Folder Structure

```
Workfolio/
├── content/                   # Content data files
│   └── site-data.json         # Main content data
├── src/
│   ├── assets/                # Static assets (images, icons, etc.)
│   ├── components/            # Reusable UI components
│   │   ├── ui/                # Base UI components (shadcn/ui style)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── heading.tsx    # NEW: Centralized heading components
│   │   ├── Footer.tsx
│   │   ├── GameCard.tsx
│   │   ├── Hero3D.tsx
│   │   ├── ImageRevealHero.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProjectSlide.tsx
│   │   ├── QuestCarousel.tsx
│   │   └── TypewriterText.tsx
│   ├── contexts/              # React contexts
│   │   └── ThemeContext.tsx   # Theme management (light/dark mode)
│   ├── lib/                   # Utility libraries
│   │   ├── data.ts            # Data fetching and management
│   │   ├── email.ts           # Email functionality
│   │   └── utils.ts           # Utility functions
│   ├── pages/                 # Page components
│   │   ├── Contact.tsx        # Contact form
│   │   ├── Dashboard.tsx      # Main dashboard page
│   │   ├── Journey.tsx        # Career timeline
│   │   ├── Lab.tsx            # Experimental demos
│   │   ├── Projects.tsx       # Projects showcase
│   │   └── SideMissions.tsx   # Additional side projects/missions
│   ├── styles/                # Styling helpers
│   │   └── tw.ts
│   ├── types/                 # TypeScript type definitions
│   │   └── site-data.ts       # Content type definitions
│   ├── App.tsx                # Main app component
│   ├── index.css              # Global styles
│   ├── main.tsx               # App entry point
│   └── vite-env.d.ts          # Vite type declarations
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
├── package-lock.json
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── tsconfig.node.json         # TS config for tooling
├── vite.config.ts             # Vite build configuration
├── README.md
├── setup.md
└── PROJECT_STRUCTURE.md
```

## 🛠️ Libraries & Technologies

### Core Framework

- **React 18.2.0** - UI library for building user interfaces
- **TypeScript 5.2.2** - Type-safe JavaScript for better development experience
- **Vite 5.0.0** - Fast build tool and development server

### Styling & UI

- **Tailwind CSS 3.3.5** - Utility-first CSS framework
  - **Why**: Rapid development, consistent design system, easy customization
- **PostCSS 8.4.31** - CSS processing tool
- **Autoprefixer 10.4.16** - Automatic vendor prefixing

### UI Components

- **Radix UI** - Headless UI primitives
  - `@radix-ui/react-slot` - Component slot system
  - `@radix-ui/react-toggle` - Toggle component
- **Lucide React 0.294.0** - Beautiful, customizable icons
  - **Why**: Consistent icon library, tree-shakable, TypeScript support

### Animation & 3D

- **Framer Motion 10.16.16** - Production-ready motion library
  - **Why**: Smooth animations, gesture support, performance optimized
- **Three.js 0.158.0** - 3D graphics library
- **@react-three/fiber 8.15.12** - React renderer for Three.js
- **@react-three/drei 9.88.13** - Useful helpers for React Three Fiber
- **@lottiefiles/dotlottie-react 0.15.2** - Lightweight .lottie animation player

### Routing

- **React Router DOM 6.30.1** - Client-side routing
  - **Why**: Declarative routing, nested routes, navigation state

### Utilities

- **Class Variance Authority 0.7.0** - Type-safe component variants
- **clsx 2.0.0** - Conditional className utility
- **tailwind-merge 2.0.0** - Merge Tailwind classes without conflicts

### Email & Communication

- **EmailJS 3.2.0** - Email service integration
  - **Why**: Client-side email sending, no backend required

### Development Tools

- **ESLint 8.53.0** - Code linting and formatting
- **@typescript-eslint** - TypeScript-specific linting rules

## 🎨 Design System

### Color Palette

The project uses a consistent color system with CSS custom properties:

**Light Mode:**

- Primary: `hsl(330 60% 45%)` - Dark magenta
- Background: `hsl(0 0% 100%)` - Pure white
- Foreground: `hsl(222.2 84% 4.9%)` - Dark text

**Dark Mode:**

- Primary: `hsl(330 60% 45%)` - Same dark magenta
- Background: `hsl(222.2 84% 4.9%)` - Dark background
- Foreground: `hsl(210 40% 98%)` - Light text

### Typography

- **Display Font**: Inter, 700 weight, -0.025em letter spacing
- **Heading Font**: Inter, 600 weight, -0.02em letter spacing
- **Body Font**: Inter, 400 weight, 1.6 line height

### Component Architecture

#### Heading Components (NEW)

```typescript
// Centralized heading components for consistency
<PageHeader
  title="Page Title"
  subtitle="Page description"
  icon={<Icon />}
/>

<SectionHeader
  title="Section Title"
  icon={<Icon />}
/>

<Heading level={1}>Custom Heading</Heading>
```

#### UI Components

- **Button**: Variant-based button component with multiple styles
- **Card**: Container component with header, content, and footer
- **Input**: Form input with consistent styling
- **Textarea**: Multi-line text input

## 🔧 Code Organization Principles

### 1. Consistent Imports

- Use `@/` alias for absolute imports from src directory
- Group imports: React, third-party, local components, types
- Alphabetical ordering within groups

### 2. Component Structure

```typescript
// 1. Imports
import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "lucide-react";

// 2. Types/Interfaces
interface ComponentProps {
  // ...
}

// 3. Constants
const variants = {
  // ...
};

// 4. Component
export default function Component({ ... }: ComponentProps) {
  // 5. State
  const [state, setState] = useState();

  // 6. Handlers
  const handleClick = () => {
    // ...
  };

  // 7. Render
  return (
    // JSX
  );
}
```

### 3. File Naming

- **Components**: PascalCase (e.g., `GameCard.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Types**: kebab-case (e.g., `site-data.ts`)
- **Pages**: PascalCase (e.g., `Dashboard.tsx`)

### 4. State Management

- **Local State**: React useState for component-specific state
- **Global State**: React Context for theme and app-wide state
- **Data**: Centralized in `lib/data.ts` for content management

## 🚀 Development Workflow

### Setup

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

### Code Quality

```bash
npm run lint
```

## 🎯 Key Features

1. **Responsive Design** - Mobile-first approach with Tailwind CSS
2. **Dark/Light Mode** - Theme switching with persistent storage
3. **Smooth Animations** - Framer Motion for engaging interactions
4. **3D Elements** - Three.js integration for visual appeal
5. **Type Safety** - Full TypeScript coverage
6. **Performance** - Vite for fast builds and HMR
7. **Accessibility** - ARIA labels, semantic HTML, keyboard navigation

## 🔄 Recent Improvements

### Heading Consistency

- **Problem**: Inconsistent heading styles across pages (gradients vs plain text)
- **Solution**: Created centralized `Heading`, `PageHeader`, and `SectionHeader` components
- **Result**: Consistent typography and spacing across all pages

### Import Organization

- **Problem**: Mixed import styles (relative vs absolute paths)
- **Solution**: Standardized on `@/` alias for all imports
- **Result**: Cleaner, more maintainable import statements

### Code Structure

- **Problem**: Inconsistent component organization
- **Solution**: Established clear patterns for component structure
- **Result**: Easier to read, maintain, and extend codebase
