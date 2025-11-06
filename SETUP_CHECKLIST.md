# ConceptSlotSwapper - Setup Checklist

Follow this checklist to get the application running.

## ✅ Prerequisites

- [ ] Node.js v16+ installed
- [ ] PostgreSQL installed and running
- [ ] npm or yarn installed
- [ ] Git (optional, for cloning)

## ✅ Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
- [ ] Edit `backend/.env` file
- [ ] Set your PostgreSQL DATABASE_URL
- [ ] Set a secure JWT_SECRET
- [ ] Verify PORT is 4000 (or change if needed)

Example `.env`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/conceptslotswapper"
JWT_SECRET="your-super-secret-key-change-in-production"
PORT=4000
```

### 3. Create Database
```bash
# Using psql
psql -U postgres
CREATE DATABASE conceptslotswapper;
\q
```

Or use a GUI tool like pgAdmin, DBeaver, or Postico.

### 4. Generate Prisma Client
```bash
npm run prisma:generate
```

Expected output: "Generated Prisma Client"

### 5. Run Migrations
```bash
npm run prisma:migrate
```

- [ ] Enter migration name (e.g., "init")
- [ ] Verify tables created successfully

### 6. Start Backend
```bash
npm run dev
```

- [ ] Backend starts without errors
- [ ] See "Backend listening on 4000" message
- [ ] No Prisma Client errors

## ✅ Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Verify API Configuration
- [ ] Check `frontend/src/api/axios.js`
- [ ] Ensure baseURL is `http://localhost:4000/api`

### 3. Start Frontend
```bash
npm run dev
```

- [ ] Frontend starts without errors
- [ ] See local URL (usually http://localhost:5173)
- [ ] No compilation errors

## ✅ Test the Application

### 1. Access Frontend
- [ ] Open browser to http://localhost:5173
- [ ] See the login/signup page

### 2. Create First User
- [ ] Click "Sign Up"
- [ ] Enter name, email, password
- [ ] Successfully redirected to Dashboard

### 3. Create an Event
- [ ] Fill in event form (title, start time, end time)
- [ ] Click "Create Event"
- [ ] Event appears in the list

### 4. Make Event Swappable
- [ ] Click "Make Swappable" on the event
- [ ] Status changes to "SWAPPABLE"

### 5. Test with Second User
- [ ] Open incognito/private window
- [ ] Sign up as a different user
- [ ] Create and mark an event as swappable
- [ ] Go to Marketplace
- [ ] See first user's swappable event

### 6. Request a Swap
- [ ] Click "Request Swap" on first user's event
- [ ] Select your swappable event to offer
- [ ] Submit the request

### 7. Accept the Swap
- [ ] Switch back to first user
- [ ] Go to "Requests" page
- [ ] See incoming request
- [ ] Click "Accept"
- [ ] Verify calendars updated

## ✅ Verify Everything Works

- [ ] Both users see swapped events in Dashboard
- [ ] Events show correct owner
- [ ] Status changed back to BUSY
- [ ] Swap request shows ACCEPTED status
- [ ] No console errors in browser
- [ ] No errors in backend terminal

## 🎉 Success!

If all checkboxes are checked, your ConceptSlotSwapper is fully functional!

## 🔧 Troubleshooting

### Backend won't start
1. Check PostgreSQL is running
2. Verify DATABASE_URL in .env
3. Run `npm run prisma:generate`
4. Check for port conflicts

### Frontend can't connect to backend
1. Verify backend is running on port 4000
2. Check browser console for CORS errors
3. Verify API URL in `frontend/src/api/axios.js`

### Prisma errors
1. Run `npm run prisma:generate`
2. Check DATABASE_URL format
3. Ensure database exists
4. Try `npx prisma migrate reset` (WARNING: deletes data)

### Authentication issues
1. Clear browser localStorage
2. Check JWT_SECRET is set in .env
3. Verify token is being sent in requests (check Network tab)

## 📚 Additional Resources

- Backend Setup: `backend/SETUP.md`
- Frontend Docs: `frontend/FRONTEND_README.md`
- Feature List: `frontend/FEATURES.md`
- Quick Start: `QUICKSTART.md`
- Main README: `README.md`

## 🚀 Next Steps

- Explore all features
- Test edge cases
- Customize styling
- Add more users
- Deploy to production

---

Need help? Check the documentation files or review the code comments.
