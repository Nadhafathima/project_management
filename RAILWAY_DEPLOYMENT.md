# Railway Deployment Guide

## Prerequisites
- GitHub repository with the project pushed
- Railway account (https://railway.app)

## Deployment Steps

### 1. Create a Railway Account
- Go to https://railway.app
- Sign up or log in with GitHub

### 2. Create a New Project
- Click "Create New Project" in Railway dashboard
- Select "Deploy from GitHub repo"

### 3. Connect GitHub Repository
- Authorize Railway to access your GitHub account
- Select your repository (edunet)
- Select the branch to deploy (main/master)

### 4. Configure Environment Variables
Railway will automatically detect this is a Next.js project. Add these environment variables in the Railway dashboard:

```
DATABASE_URL=file:./dev.db
NEXTAUTH_SECRET=your-secure-random-string-here
NEXTAUTH_URL=https://your-railway-domain.railway.app
NODE_ENV=production
```

**Important:** Generate a secure NEXTAUTH_SECRET:
- Use: `openssl rand -hex 32` or
- Generate online at https://generate-random.org

### 5. Database Configuration
- Railway will auto-detect SQLite from your Prisma schema
- The `dev.db` file will be stored in the deployment

### 6. Deploy
- Railway will automatically detect `package.json` and `next.config.ts`
- It will run `npm install` and `npm run build`
- The app will start with `npm start`

### 7. Custom Domain (Optional)
- In Railway dashboard, go to your project settings
- Add a custom domain or use Railway's generated domain

## After Deployment

### Important Notes:
1. **Database**: SQLite with file storage works, but for production consider:
   - Using Railway's PostgreSQL plugin instead
   - Or using Railway's PostgreSQL database service

2. **Persistent Storage**: The current SQLite setup stores the database file in the container, which is ephemeral. For production:
   - Add a volume to Railway for persistent database storage
   - Or switch to PostgreSQL

3. **Environment URL**: After deployment, update `.env.local` with the Railway domain:
   ```
   NEXTAUTH_URL=https://your-app.railway.app
   ```

## Switching to PostgreSQL (Recommended for Production)

If you want to use PostgreSQL instead of SQLite:

1. Add PostgreSQL plugin in Railway dashboard
2. Update `.env` with the provided `DATABASE_URL`
3. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. Run migration: `npx prisma migrate deploy`
5. Redeploy

## Troubleshooting

### Build Fails
- Check Railway logs for error messages
- Ensure all dependencies are in `package.json`
- Verify environment variables are set correctly

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check that the database path is writable
- For SQLite: ensure the `/tmp` directory is accessible

### 502 Bad Gateway
- Check application logs in Railway
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches the deployment domain

## Useful Railway Commands

Via Railway CLI:
```bash
npm install -g @railway/cli
railway login
railway link
railway deploy
```

## Documentation
- Railway Docs: https://docs.railway.app
- Next.js on Railway: https://docs.railway.app/guides/nextjs
- Prisma on Railway: https://docs.railway.app/guides/prisma
