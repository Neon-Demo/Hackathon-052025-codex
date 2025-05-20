# Greenhouse Management System (GMS)

A comprehensive digital inspection system for hazardous materials management, streamlining workflows from inspection to reporting.

## Features

- **Digital Forms**: Transform paper forms into digital workflows with customizable templates
- **Sample Management**: Track samples from collection through laboratory analysis
- **Comprehensive Reporting**: Generate professional reports with automated data compilation
- **Equipment Tracking**: Manage inspection equipment inventory and maintenance
- **AirTable Integration**: Seamless data synchronization
- **Mobile-First Design**: Responsive interface with offline capability

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Material UI
- **Authentication**: NextAuth.js with Google & Microsoft SSO
- **State Management**: React Hooks
- **Styling**: Tailwind CSS + Material UI components
- **API Communication**: Axios

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd 4-Implementation/web-nextjs
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` to add your OAuth credentials and other configurations.

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Credentials

For testing purposes, you can use the following demo accounts:

- **Admin**: admin@example.com / admin123
- **Inspector**: inspector@example.com / inspector123
- **Reviewer**: reviewer@example.com / reviewer123

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/                # API routes, including NextAuth
│   ├── dashboard/          # Dashboard pages
│   ├── login/              # Authentication pages
│   └── ...                 # Other pages
├── components/             # React components
│   ├── layout/             # Layout components
│   └── ui/                 # Reusable UI components
├── hooks/                  # Custom React hooks
├── providers/              # Context providers
├── services/               # API services
├── styles/                 # Global styles and Tailwind config
└── types/                  # TypeScript type definitions
```

## Development Guidelines

### Coding Standards

- Follow TypeScript best practices
- Use functional components with hooks
- Follow the file naming conventions:
  - React components: PascalCase (e.g., `Button.tsx`)
  - Hooks, services, utilities: camelCase (e.g., `useProjects.ts`)
  - Pages: kebab-case for routes

### Styling

The project uses Tailwind CSS for styling, following these principles:

- Use Tailwind utility classes for most styling
- For complex components, create reusable component classes in globals.css
- Follow the design guidelines and color palette defined in the project

### Authentication

Authentication is handled via NextAuth.js with:

- Google OAuth provider
- Microsoft OAuth provider
- Credentials provider (for demo accounts)

## Deployment

Build the application:

```bash
npm run build
# or
yarn build
```

Start the production server:

```bash
npm start
# or
yarn start
```

## License

[Specify your license]