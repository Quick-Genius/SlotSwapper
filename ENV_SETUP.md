# Environment Variables Setup

## Quick Setup Guide

### Frontend Setup

1. **Create `.env` file** in `frontend/` directory:
```env
VITE_API_URL=http://localhost:4000/api
```

2. **For production** (Vercel), set:
```env
VITE_API_URL=https://your-backend-url.com/api
```

### Backend Setup

1. **Update `.env` file** in `backend/` directory:
```env
DATABASE_URL="your-database-url"
JWT_SECRET="your-secret-key"
PORT=4000
FRONTEND_URL=http://localhost:5174
```

2. **For production**, update:
```env
FRONTEND_URL=https://your-frontend.vercel.app
```

## What Changed

### Frontend (`frontend/src/api/axios.js`)
- Now reads API URL from `VITE_API_URL` environment variable
- Falls back to `http://localhost:4000/api` if not set
- Uses Vite's `import.meta.env` for environment variables

### Backend (`backend/src/index.js`)
- CORS now configured with `FRONTEND_URL` environment variable
- Allows requests only from specified frontend URL
- More secure for production deployments

## Testing Locally

1. **Start Backend**:
```bash
cd backend
npm run dev
```

2. **Start Frontend**:
```bash
cd frontend
npm run dev
```

3. **Verify**:
- Frontend should connect to backend at `http://localhost:4000/api`
- CORS should allow requests from `http://localhost:5174`

## Production Deployment

See `DEPLOYMENT_GUIDE.md` for complete deployment instructions.

### Quick Checklist:
- [ ] Set `VITE_API_URL` in Vercel environment variables
- [ ] Set `FRONTEND_URL` in backend hosting environment variables
- [ ] Both URLs should use HTTPS in production
- [ ] No trailing slashes in URLs
- [ ] Redeploy after changing environment variables

## Troubleshooting

**CORS Error?**
- Check `FRONTEND_URL` matches your actual frontend URL
- Restart backend after changing environment variables

**API Not Found?**
- Check `VITE_API_URL` is set correctly
- Verify backend is running and accessible
- Check browser console for the actual URL being called

**Environment Variable Not Working?**
- Frontend: Must prefix with `VITE_`
- Frontend: Restart dev server after changing `.env`
- Backend: Restart server after changing `.env`
