# Laraigo Demo - Modules

## Module Structure

Each module in the Laraigo application follows a consistent structure for maintainability and scalability.

## Standard Module Layout

```
modules/[module-name]/
├── components/     # React components
├── contexts/       # React contexts (if needed)
├── hooks/          # Custom hooks
├── schemas/        # Zod validation schemas
├── styles/         # MUI styled components and sx objects
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── index.ts        # Module exports
```

## Current Modules

### 1. Home Module

**Path**: `src/modules/home/`

- **Purpose**: Landing page and welcome experience
- **Components**: `Laraigo.tsx` - Main landing page with gradient background

### 2. Campaigns Module

**Path**: `src/modules/campaigns/`

- **Purpose**: Campaign management functionality
- **Components**:
  - `Campaigns.tsx` - Main campaigns list and form component
- **Schemas**:
  - `campaignSchema.ts` - Zod validation for campaign data
- **Styles**:
  - `stylesCampaign.ts` - MUI styled components and sx objects

### 3. Templates Module (Planned)

**Path**: `src/modules/templates/`

- **Purpose**: Marketing template management
- **Status**: Directory structure created, awaiting implementation

### 4. Dashboard Module (Planned)

**Path**: `src/modules/dashboard/`

- **Purpose**: Analytics and overview dashboard
- **Status**: Directory structure created, awaiting implementation

### 5. Reports Module (Planned)

**Path**: `src/modules/reports/`

- **Purpose**: Reporting and data export functionality
- **Status**: Directory structure created, awaiting implementation

## Module Development Guidelines

### Component Organization

- Use functional components with TypeScript
- Implement proper prop typing
- Follow React Hooks patterns
- Use MUI components as base layer

### Schema Definition

- Define Zod schemas for all data models
- Export TypeScript types using `z.infer`
- Include validation messages in appropriate language

### Styling Approach

- Use MUI's `styled()` for complex, reusable components
- Use `sx` prop for simple, one-off styling
- Maintain consistent design tokens from theme
- Create style objects for reusable sx patterns

### State Management

- Use React's built-in state for local component state
- Implement contexts for module-specific shared state
- Consider external state management for complex cross-module state

## Integration Points

### Shared Dependencies

- All modules can access shared components from `src/shared/`
- Common utilities and hooks available across modules
- Centralized theme and styling system

### Routing Integration

- Each module registers its routes in `AppRoutes.tsx`
- Follow consistent URL patterns
- Implement proper navigation guards if needed

### Language Support

- Use translation keys following the pattern: `[module].[section].[key]`
- Add translations to both `es.json` and `en.json`
- Implement proper fallback handling
