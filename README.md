# Onboarding Tour Platform

A comprehensive, embeddable onboarding and guided tour solution for websites. This project consists of a public-facing marketing site with documentation and admin dashboard for tour management.

## Overview

The Onboarding Tour Platform provides businesses with an easy-to-use system for creating guided user experiences. Users are guided through customizable multi-step tours with smooth animations, progress tracking, and analytics. The platform is designed as a complete product ecosystem with distinct components working seamlessly together.

## Team Members

- **@Cynthia AO**
- **@Tiffs**
- **@enesi_dev**
- **@mz_b**

## Live Site
**Live Site**: [onboarding-tour-platform.vercel.app](https://onboarding-tour-platform.vercel.app)
  

## Features

### External Pages

- Beautiful, animated landing page with smooth transitions
- Comprehensive documentation for developers
- Integration guide showing how to add tours to any website
- Professional about page introducing the product
- Feature showcase and "How it Works" section
- Live demo section
- Responsive design across all devices

### Dashboard

- Intuitive tour management interface
- Create, edit, and delete tours with ease
- Define and manage 5+ steps per tour with unique IDs
- Step-by-step configuration with descriptions and targeting
- Generate unique embed scripts for each tour
- Analytics dashboard tracking completion rates and user interactions
- Step analytics (started, completed, skipped)
- User-friendly navigation and interface

## Tech Stack

### Frontend

- **Next.js** - React framework for External Pages and Dashboard
- **Shadcn** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### Backend & Services

- **Supabase** - Authentication and database
- **Next.js API Routes** - Backend API

### Animations & Effects

- **Framer Motion** - (Recommended for animations)

### Development Tools

- **TypeScript** - Static type checking
- **Tailwind CSS** - Utility-first styling

## Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager
- Supabase account (for authentication and database)
- Git for version control

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/blessing986/onboarding-tour-platform.git
cd onboarding-tour-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLIC_KEY=your_supabase_public_key
```

Get these values from your Supabase project:

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Navigate to Settings → API
3. Copy the Project URL and Public Key

### 4. Database Setup

The database schema is automatically managed through Supabase migrations. Ensure all migrations have been applied:

```bash
npm run db:migrate
```

### 5. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 6. Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
onboarding-tour-platform/
├── app/                      # Next.js app directory
│   ├── layout.tsx            # Root layout
│   ├── (auth)/               # Auth page
│   ├── (external-pages)/     # External pages
│   └── dashboard/            # Dashboard component
├── api/                      # API routes
├── components/               # Reusable React components
│   ├── dashboard/            # Dashboard components
│   └── ui/                   # Shadcn ui components
├── context/                  # React context providers
│   └── AuthContext.tsx       # Authentication context
├── supabase.ts/              # Supabase client
├── types/                    # TypeScript type definitions
├── public/                   # Static assets
└── docs/                     # Documentation files
```

## Architecture

### Component Distribution

1. **External Pages Component**

   - Landing page with hero section and feature showcase
   - Documentation page with code examples
   - About page
   - Responsive navigation and footer
   - Authentication flow (Sign in/Sign up)

2. **Dashboard Component**
   - Tour management CRUD interface
   - Step configuration interface
   - Script generation for embeds
   - Analytics visualization

## Authentication

The platform uses **Supabase Authentication** with email/password flow:

- Users can sign up and create an account
- Authentication state persists across sessions
- Protected routes for dashboard access

## Database Schema

### Core Tables

- **tours** - Tour configurations and metadata
- **analytics** - User interaction tracking
- **embed_codes** - Generated embed scripts per tour

```

## Deployment

The project is deployed on **Vercel**:

1. Push your code to GitHub
2. Connect the repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

## API Documentation

### Authentication Endpoints

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Tour Management Endpoints

- `GET /api/tours` - Get all tours for logged-in user
- `POST /api/tours` - Create new tour
- `PUT /api/tours/:id` - Update tour
- `DELETE /api/tours/:id` - Delete tour
- `GET /api/tours/:id/steps` - Get tour steps
- `POST /api/tours/:id/steps` - Add tour step

### Analytics Endpoints

- `GET /api/analytics/:tourId` - Get tour analytics
- `POST /api/analytics/track` - Track user interaction
```
