# Laraigo Demo - Architecture

## Overview

Laraigo Demo is a modern React TypeScript application built with a modular architecture for scalability and maintainability.

## Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type safety and developer experience
- **Material UI v7** - Component library with theming
- **React Hook Form** - Form management with validation
- **Zod** - Schema validation
- **React Table** - Data table functionality
- **i18next** - Internationalization
- **Vite** - Build tool and development server

## Architecture Principles

### 1. Modular Structure

The application follows a module-based architecture where each business domain is encapsulated in its own module:

- `src/modules/` - Business modules (campaigns, templates, dashboard, reports)
- `src/shared/` - Shared components, utilities, and resources
- `src/app/` - Application core (providers, routing, config)

### 2. Layer Separation

- **Presentation Layer**: React components and UI logic
- **Business Logic Layer**: Custom hooks, schemas, and utilities
- **Data Layer**: API integration and state management

### 3. Design System

- **Theme**: Centralized theme configuration with MUI
- **Components**: Reusable UI components with consistent styling
- **Typography & Colors**: Standardized design tokens

## Folder Structure

```
src/
├── app/           # Application core
├── modules/       # Business modules
├── shared/        # Shared resources
└── assets/        # Static assets
```

## Key Features

### Styling Strategy

- **MUI Theme**: Centralized theme with custom purple/indigo palette
- **Sx Props**: Component-level styling using MUI's sx prop
- **Styled Components**: Complex components using MUI's styled() API
- **Global Styles**: Shared style objects and utilities

### Type Safety

- **Zod Schemas**: Runtime validation with TypeScript inference
- **Form Integration**: Type-safe forms with React Hook Form
- **API Types**: Strongly typed data models

### Internationalization

- **React i18next**: Full i18n support
- **Language Files**: JSON-based translations (es/en)
- **Type-safe Keys**: Translation keys with TypeScript support

## Performance Considerations

- **Code Splitting**: Module-based lazy loading
- **Tree Shaking**: Optimized bundle size
- **Caching**: Efficient re-renders with React optimization patterns
