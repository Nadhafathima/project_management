# Project Manager - Workspace Setup

## Project Overview

This is a full-stack project management web application built with Next.js, React, TypeScript, and Tailwind CSS. The application includes authentication, project management, task tracking, and role-based access control.

## Setup Checklist

- [x] Clarify Project Requirements
  - Built a full-stack project management app
  - Tech stack: Next.js, React, TypeScript, Tailwind CSS, SQLite, Prisma

- [x] Scaffold the Project
  - Created Next.js project with TypeScript and Tailwind CSS
  - Set up project directory structure

- [x] Customize the Project
  - Created Prisma database schema with User, Project, ProjectMember, and Task models
  - Implemented authentication utilities (hashing, JWT)
  - Created API routes for auth, projects, tasks, and dashboard
  - Built React components for auth pages (login, signup)
  - Created dashboard page with statistics and task management
  - Implemented project detail page with task management
  - Created landing page with redirect logic

- [x] Install Required Extensions
  - No specific extensions required beyond VS Code defaults

- [x] Compile the Project
  - Dependencies installed via `npm install`
  - Database needs to be initialized with Prisma

- [x] Create and Run Task
  - Run `npm run dev` to start development server
  - Server will run on http://localhost:3000

- [x] Launch the Project
  - Ready to start development server

- [x] Ensure Documentation is Complete
  - README.md updated with project information
  - This file contains workspace setup details

## Key Files Created

### Backend
- `/src/lib/auth.ts` - Authentication utilities (JWT, bcrypt)
- `/src/lib/prisma.ts` - Prisma client setup
- `/src/app/api/auth/signup/route.ts` - User registration endpoint
- `/src/app/api/auth/login/route.ts` - User login endpoint
- `/src/app/api/projects/route.ts` - Projects CRUD endpoints
- `/src/app/api/projects/tasks/route.ts` - Project tasks endpoints
- `/src/app/api/tasks/[taskId]/route.ts` - Individual task operations
- `/src/app/api/dashboard/route.ts` - Dashboard statistics endpoint
- `/prisma/schema.prisma` - Database schema

### Frontend
- `/src/components/AuthContext.tsx` - Authentication context provider
- `/src/app/page.tsx` - Landing page
- `/src/app/auth/login/page.tsx` - Login page
- `/src/app/auth/signup/page.tsx` - Signup page
- `/src/app/dashboard/page.tsx` - Dashboard page
- `/src/app/projects/new/page.tsx` - Create project page
- `/src/app/projects/[projectId]/page.tsx` - Project detail page
- `/src/app/layout.tsx` - Root layout with AuthProvider

### Configuration
- `/src/types/index.ts` - TypeScript type definitions
- `/.env.local` - Environment variables
- `/prisma/schema.prisma` - Database schema

## Next Steps

To run the application:

1. Install dependencies (if not already done):
```bash
npm install
```

2. Initialize database:
```bash
npx prisma migrate dev --name init
```

3. Start development server:
```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

## Features Implemented

- User authentication (signup/login)
- Project creation and management
- Task creation, assignment, and status tracking
- Dashboard with task statistics
- Team member management
- Role-based access control (Admin, Lead, Member)
- Task priority and status management
- Overdue task tracking

## Database Models

- **User**: email, password, name, role
- **Project**: name, description, status
- **ProjectMember**: project, user, role
- **Task**: title, description, status, priority, assignee, project

## API Endpoints

- POST `/api/auth/signup` - Register new user
- POST `/api/auth/login` - Login user
- GET/POST `/api/projects` - List and create projects
- GET/POST `/api/projects/[projectId]/tasks` - Manage project tasks
- PUT/DELETE `/api/tasks/[taskId]` - Update/delete tasks
- GET `/api/dashboard` - Get dashboard data

## Troubleshooting

- If dependencies fail to install, try clearing npm cache: `npm cache clean --force`
- If database issues occur, delete `dev.db` and rerun migrations
- Ensure Node.js version is 20+ (upgraded from 16.17.0 to 24.15.0)

## Production Build

```bash
npm run build
npm start
```

The app will be optimized and ready for deployment.

