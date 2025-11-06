# ConceptSlotSwapper - Deployment Guide

## Environment Variables Configuration

### Frontend Environment Variables

The frontend uses Vite, so all environment variables must be prefixed with `VITE_`.

**Local Development** (`.env`):
```env
VITE_API_URL=http://localhost:4000/api
```

**Production** (Vercel):
```env
VITE_API_URL=https://your-backend-url.com/api
```

### Backend Environment Variables

**Local Development** (`.env`):
```env
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-secret-key-change-this-in-production"
PORT=4000
FRONTEND_URL=http://localhost:5174
```

**Production**:
```env
DATABASE_URL="your-production-postgresql-connection-string"
JWT_SECRET="strong-random-secret-for-production"
PORT=4000
FRONTEND_URL=https://your-frontend-url.vercel.app
```

---

## Deploying to Vercel

### Frontend Deployment

1. **Push your code to GitHub**

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `frontend` directory as the root

3. **Configure Build Settings**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Add Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.com/api`

5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Your frontend will be live at `https://your-app.vercel.app`

### Backend Deployment Options

#### Option 1: Deploy to Render

1. **Create a new Web Service** on [render.com](https://render.com)

2. **Connect your GitHub repository**

3. **Configure**:
   - Root Directory: `backend`
   - Build Command: `npm install && npm run prisma:generate`
   - Start Command: `npm start`

4. **Add Environment Variables**:
   ```
   DATABASE_URL=your-production-database-url
   JWT_SECRET=your-strong-secret
   PORT=4000
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

5. **Deploy** and copy the backend URL

6. **Update Frontend Environment Variable**:
   - Go back to Vercel
   - Update `VITE_API_URL` with your Render backend URL
   - Redeploy frontend

#### Option 2: Deploy to Railway

1. **Create a new project** on [railway.app](https://railway.app)

2. **Deploy from GitHub**

3. **Add Environment Variables**:
   ```
   DATABASE_URL=your-production-database-url
   JWT_SECRET=your-strong-secret
   PORT=4000
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

4. **Configure**:
   - Root Directory: `backend`
   - Build Command: `npm install && npm run prisma:generate && npm run prisma:migrate`
   - Start Command: `npm start`

5. **Deploy** and get your backend URL

#### Option 3: Deploy to Heroku

1. **Install Heroku CLI** and login

2. **Create a new Heroku app**:
   ```bash
   heroku create your-app-name
   ```

3. **Add PostgreSQL**:
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

4. **Set Environment Variables**:
   ```bash
   heroku config:set JWT_SECRET="your-strong-secret"
   heroku config:set FRONTEND_URL="https://your-frontend.vercel.app"
   ```

5. **Create a `Procfile`** in backend directory:
   ```
   web: npm start
   ```

6. **Deploy**:
   ```bash
   git subtree push --prefix backend heroku main
   ```

---

## Database Setup for Production

### Option 1: Use Prisma Accelerate (Current Setup)

Your current setup uses Prisma Accelerate. To use in production:

1. Keep your existing `DATABASE_URL` with Prisma Accelerate
2. No additional setup needed
3. Prisma Accelerate handles connection pooling

### Option 2: Use Direct PostgreSQL

1. **Get a PostgreSQL database**:
   - [Supabase](https://supabase.com) (Free tier available)
   - [Neon](https://neon.tech) (Free tier available)
   - [Railway](https://railway.app) (PostgreSQL addon)
   - [Render](https://render.com) (PostgreSQL addon)

2. **Update DATABASE_URL**:
   ```
   DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
   ```

3. **Run migrations**:
   ```bash
   npm run prisma:migrate
   ```

---

## Post-Deployment Checklist

### Frontend
- [ ] Environment variable `VITE_API_URL` is set correctly
- [ ] `vercel.json` is in place for client-side routing
- [ ] Build completes successfully
- [ ] Can access all routes without 404 errors

### Backend
- [ ] All environment variables are set
- [ ] Database connection is working
- [ ] Prisma migrations have run
- [ ] CORS is configured with correct frontend URL
- [ ] API endpoints are accessible

### Testing
- [ ] Sign up works
- [ ] Login works
- [ ] Can create events
- [ ] Can mark events as swappable
- [ ] Marketplace shows other users' events
- [ ] Can request swaps
- [ ] Can accept/reject swaps
- [ ] Events update correctly after swaps

---

## Troubleshooting

### CORS Errors

**Problem**: "Access to XMLHttpRequest has been blocked by CORS policy"

**Solution**:
1. Check `FRONTEND_URL` in backend environment variables
2. Ensure it matches your actual frontend URL (no trailing slash)
3. Redeploy backend after changing environment variables

### API Connection Errors

**Problem**: Frontend can't connect to backend

**Solution**:
1. Check `VITE_API_URL` in frontend environment variables
2. Ensure backend is deployed and running
3. Test backend API directly with curl or Postman
4. Check backend logs for errors

### Database Connection Errors

**Problem**: "Can't reach database server"

**Solution**:
1. Verify `DATABASE_URL` is correct
2. Check if database is running
3. Ensure SSL mode is set if required
4. Check database firewall rules

### Build Errors

**Frontend Build Fails**:
- Check for TypeScript/ESLint errors
- Ensure all dependencies are in `package.json`
- Try building locally first: `npm run build`

**Backend Build Fails**:
- Run `npm run prisma:generate` locally
- Check Prisma schema for errors
- Ensure all dependencies are installed

---

## Environment Variables Summary

### Frontend (.env)
```env
VITE_API_URL=http://localhost:4000/api  # Local
VITE_API_URL=https://your-backend.com/api  # Production
```

### Backend (.env)
```env
DATABASE_URL="your-database-connection-string"
JWT_SECRET="your-secret-key"
PORT=4000
FRONTEND_URL=http://localhost:5174  # Local
FRONTEND_URL=https://your-app.vercel.app  # Production
```

---

## Security Best Practices

1. **Never commit `.env` files** to Git (already in `.gitignore`)
2. **Use strong JWT secrets** in production (at least 32 characters)
3. **Enable HTTPS** for both frontend and backend
4. **Use environment-specific secrets** (different for dev/prod)
5. **Rotate secrets regularly** in production
6. **Use database connection pooling** for better performance
7. **Enable rate limiting** on API endpoints (future enhancement)

---

## Monitoring and Maintenance

### Recommended Tools

- **Frontend Monitoring**: Vercel Analytics (built-in)
- **Backend Monitoring**: 
  - Render: Built-in metrics
  - Railway: Built-in metrics
  - Heroku: Heroku Metrics
- **Error Tracking**: Sentry (optional)
- **Uptime Monitoring**: UptimeRobot (free)

### Regular Maintenance

- Monitor database size and performance
- Check error logs regularly
- Update dependencies monthly
- Backup database regularly
- Review and rotate secrets quarterly

---

## Quick Deploy Commands

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

### Backend (Render/Railway)
- Push to GitHub
- Platform auto-deploys on push

### Manual Backend Deploy
```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm start
```

---

**Need Help?** Check the main README.md or create an issue on GitHub.
