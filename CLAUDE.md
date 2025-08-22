# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development
```bash
npm run dev              # Start development server (Express + Vite HMR)
```

### Build & Production
```bash
npm run build           # Build both client (Vite) and server (esbuild)
npm run start           # Run production server
```

### Database
```bash
npm run db:push         # Push database schema changes using Drizzle Kit
```

### Type Checking
```bash
npm run check           # Run TypeScript type checking
```

## Architecture Overview

### Full-Stack TypeScript Application
This is a telecommunications self-care portal (Smart/CareFlow) built with a modern full-stack TypeScript architecture.

### Frontend Stack (`/client`)
- **React 18** with TypeScript and Wouter for routing
- **Vite** for fast development and optimized builds
- **shadcn/ui components** - Pre-built accessible components using Radix UI primitives
- **TailwindCSS** for styling with custom telecommunications branding
- **TanStack Query** for server state management
- **React Hook Form + Zod** for form handling and validation

### Backend Stack (`/server`)
- **Express.js** server with TypeScript
- **PostgreSQL** database with **Drizzle ORM** for type-safe queries
- **Neon serverless** PostgreSQL hosting (requires DATABASE_URL env var)
- RESTful API architecture at `/api/*` endpoints

### Shared Code (`/shared`)
- **Database schema** defined in `schema.ts` using Drizzle
- Zod validation schemas automatically generated from database schema
- Shared TypeScript types between frontend and backend

### Key Database Tables
- `customers` - Customer profiles with MSISDN, account type (prepaid/postpaid)
- `plans` - Service plans with pricing and allowances
- `subscriptions` - Active customer plan subscriptions
- `usage` - Data/voice/SMS usage tracking
- `transactions` - Payment and top-up history
- `promos` - Available promotional offers
- `customerPromos` - Active customer promotions
- `notifications` - Customer alerts and messages

### Development Environment
- **Port**: Runs on PORT env var (default 5000)
- **Database**: Requires DATABASE_URL environment variable for PostgreSQL connection
- **Vite Integration**: Development server proxies frontend requests through Express
- **Path Aliases**:
  - `@/` → `client/src/`
  - `@shared/` → `shared/`
  - `@assets/` → `attached_assets/`

### API Structure
All API routes are prefixed with `/api` and defined in `server/routes.ts`. The server includes request logging for API calls in development mode.

### Frontend Pages
- `/` - Self-care dashboard (main landing)
- `/load` - Load/top-up page
- `/promos` - Available promotions
- `/account` - Account management (postpaid)

### Component Organization
- `client/src/components/ui/` - Reusable shadcn/ui components
- `client/src/components/` - Feature-specific components
- `client/src/pages/` - Route page components
- `client/src/hooks/` - Custom React hooks

### Build Output
- Client assets: `dist/public/`
- Server bundle: `dist/index.js`

The application follows a telecommunications self-care portal pattern with customer account management, usage tracking, and service subscription features typical of mobile network operators.