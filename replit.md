# CyberEvents - Hacking & Cybersecurity Events Platform

## Overview

CyberEvents is a modern, responsive landing page that serves as a visual catalog for hacking and cybersecurity events worldwide. The platform provides users with a comprehensive calendar view of conferences, CTFs, workshops, and other security-related events. Built as a read-only showcase, the application focuses on presenting event information in an engaging, cybersecurity-themed dark interface with neon accent colors. Users can browse, search, and filter events but cannot add or modify content—all event data is managed through JSON files.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**React with TypeScript**: The application uses React 18 with TypeScript for type-safe component development, leveraging modern React patterns including hooks and functional components.

**Vite Build System**: Chosen for its fast development server with HMR (Hot Module Replacement) and optimized production builds. Vite provides superior developer experience with instant server start and lightning-fast updates.

**Routing**: Uses Wouter for lightweight client-side routing, providing a minimal footprint compared to React Router while maintaining essential routing capabilities.

**State Management**: 
- TanStack Query (React Query) for server state management, caching, and data fetching
- Local React state (useState) for UI state and component-level data
- No global state management library needed due to simple read-only nature

**UI Component Library**: shadcn/ui components built on Radix UI primitives, providing accessible, customizable components that match the cybersecurity design aesthetic. All components follow a consistent design system with dark mode support.

**Styling**: 
- Tailwind CSS for utility-first styling
- Custom CSS variables for theme colors (HSL-based color system)
- Dark mode as the primary theme with cybersecurity-inspired color palette (cyan, magenta, purple accents)
- Custom design system defined in `design_guidelines.md` featuring neon highlights and dark backgrounds

### Backend Architecture

**Express.js Server**: Minimal Node.js server handling API requests and serving static files in production. The server includes:
- JSON response logging middleware
- Error handling middleware
- Development-only Vite middleware integration

**File-Based Data Storage**: Events are stored in static JSON files (`data/eventos.json`, `client/public/eventos.json`), eliminating the need for a database. This approach was chosen for:
- Simple manual editing of event data
- No database setup or maintenance required
- Easy version control of event data
- Fast read performance for static catalogs

**API Design**: RESTful endpoints with filtering capabilities:
- `GET /api/eventos` - Retrieve all events with optional query filters (modalidad, nivel, pais, search, tag)
- Events are validated using Zod schemas defined in `shared/schema.ts`

**Data Validation**: Zod schemas ensure type safety and runtime validation for event data, with schemas shared between client and server for consistency.

### Design System

**Typography Stack**:
- Headers: Space Grotesk or Inter for modern, technical aesthetics
- Body: Inter for readability
- Monospace: JetBrains Mono for technical details and IDs

**Color System** (HSL-based):
- Dark backgrounds: Deep slate (220 25% 8%)
- Primary accent: Electric cyan (190 95% 55%)
- Secondary: Magenta (320 90% 60%)
- Status indicators: Green for active, amber for urgent
- Gradient overlays for visual depth

**Component Patterns**:
- Hover elevation effects for interactive elements
- Glassmorphism with backdrop blur on cards
- Neon glow effects on primary CTAs
- Border gradients transitioning cyan to magenta

### External Dependencies

**UI Component Libraries**:
- Radix UI primitives (@radix-ui/*) - Accessible, unstyled component primitives
- shadcn/ui - Pre-built components using Radix UI and Tailwind
- Lucide React - Icon library for consistent iconography
- React Icons - Additional icon sets (Social media icons via react-icons/si)

**Development Tools**:
- Vite plugins:
  - @vitejs/plugin-react - React Fast Refresh
  - @replit/vite-plugin-runtime-error-modal - Development error overlay
  - @replit/vite-plugin-cartographer - Replit integration
  - @replit/vite-plugin-dev-banner - Development banner

**Utilities**:
- clsx & tailwind-merge - Conditional class name management
- class-variance-authority (CVA) - Component variant management
- date-fns - Date formatting and manipulation
- embla-carousel-react - Carousel/slider functionality

**Image Assets**:
- Unsplash - Event placeholder images
- Custom generated images stored in `attached_assets/generated_images/`

**Form Handling**:
- react-hook-form - Form state management
- @hookform/resolvers - Zod integration for form validation

**Data Fetching**:
- TanStack Query - Server state management with caching
- Native fetch API - HTTP requests

**Future Database Considerations**:
- Drizzle ORM configured for PostgreSQL (via @neondatabase/serverless)
- Schema defined but not currently in use
- Can be activated when transitioning from JSON to database storage