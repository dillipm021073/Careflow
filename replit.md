# Healthcare Management System

## Overview

This is a comprehensive healthcare management system built with React and Express, designed to streamline care flow management, patient tracking, and clinical operations. The system provides healthcare professionals with tools to manage patient care workflows, track progress, monitor alerts, and coordinate care activities across different medical specialties.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: TailwindCSS with a custom healthcare-focused design system featuring gradients and medical-appropriate color schemes
- **State Management**: TanStack Query for server state management and data fetching
- **Routing**: Wouter for lightweight client-side routing
- **Component Structure**: Modular component architecture with reusable UI components and feature-specific components

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **API Design**: RESTful API with endpoints for care flows, patients, alerts, and dashboard statistics
- **Data Validation**: Zod schemas for runtime type validation and API request/response validation
- **Storage Pattern**: Repository pattern with an in-memory storage implementation (can be extended to database persistence)

### Database Schema Design
The system uses a comprehensive schema covering:
- **Users**: Healthcare professionals with role-based access (nurse, doctor, admin)
- **Patients**: Complete patient demographics and medical history
- **Care Flows**: Structured care workflows with progress tracking, priority levels, and stage management
- **Alerts**: System notifications and alerts for care coordination
- **Activities**: Audit trail and activity logging for compliance

### Development Architecture
- **Monorepo Structure**: Shared types and schemas between frontend and backend
- **Build System**: Vite for frontend bundling, esbuild for backend compilation
- **Development Server**: Integrated development environment with hot reloading
- **Code Quality**: TypeScript for type safety, ESLint configuration via shadcn/ui setup

### Healthcare-Specific Features
- **Care Flow Management**: Multi-stage care workflows with progress tracking
- **Patient Dashboard**: Comprehensive patient overview with medical history
- **Alert System**: Priority-based notification system for clinical alerts
- **Category-Based Navigation**: Medical specialty-specific navigation (cardiac, diabetes, mental health)
- **Mobile Responsiveness**: Healthcare professionals can access the system from mobile devices

## External Dependencies

### Database and ORM
- **PostgreSQL**: Primary database with Neon serverless hosting support
- **Drizzle ORM**: Type-safe database operations with schema-first approach
- **connect-pg-simple**: PostgreSQL session storage for user sessions

### UI and Design System
- **Radix UI**: Comprehensive set of accessible UI primitives
- **shadcn/ui**: Pre-built component library with consistent design patterns
- **TailwindCSS**: Utility-first CSS framework with custom healthcare theme
- **Lucide React**: Medical and general-purpose iconography

### Data Management
- **TanStack Query**: Server state management with caching and synchronization
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation for type-safe data handling
- **date-fns**: Date manipulation and formatting for medical records

### Development Tools
- **Replit Integration**: Development environment optimizations for Replit platform
- **Vite Plugins**: Hot reloading, error overlays, and development enhancements
- **TypeScript**: Full-stack type safety with shared type definitions

### Healthcare-Specific Integrations
The architecture is designed to support future integrations with:
- Electronic Health Records (EHR) systems
- Laboratory information systems
- Pharmacy management systems
- Telehealth platforms
- Medical device integration