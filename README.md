# Next.js Better Auth

A modern authentication starter template built with Next.js 15, Better Auth, and Drizzle ORM.

## Features

- 🔐 Authentication with Better Auth
- 📱 Email/Password login
- 👤 User profiles
- 🗄️ PostgreSQL with Drizzle ORM
- 🎨 Modern UI with Tailwind CSS and Radix UI
- ✨ TypeScript support

## Quick Start

1. **Clone and install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   ```bash
   cp env.example .env.local
   ```

   Fill in your database and API keys.

3. **Set up database**

   ```bash
   npm run db:generate
   npm run db:migrate
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see your app.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Apply database migrations
- `npm run db:studio` - Open Drizzle Studio

## Tech Stack

- **Framework:** Next.js 15
- **Authentication:** Better Auth
- **Database:** PostgreSQL + Drizzle ORM
- **Styling:** Tailwind CSS, Shadcn
