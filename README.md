This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Manager

A full-stack web application for managing projects, tasks, and teams with role-based access control.

### Features

- **Authentication**: Secure login and signup with JWT authentication
- **Project Management**: Create and manage multiple projects
- **Task Tracking**: Create, assign, and track tasks with status and priority
- **Dashboard**: View project statistics, recent tasks, and overdue items

### Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM

### Getting Started

First, install dependencies and setup the database:

```bash
npm install
npx prisma migrate dev --name init
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.
