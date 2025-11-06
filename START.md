# Start ConceptSlotSwapper

## First Time Setup

### 1. Backend Setup
```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
```

When prompted for migration name, enter: `init`

### 2. Frontend Setup
```bash
cd frontend
npm install
```

## Running the Application

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

Wait for: `Backend listening on 4000`

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Wait for: `Local: http://localhost:5173`

## Access the App

Open your browser to: **http://localhost:5173**

## Quick Test

1. Sign up with a new account
2. Create an event
3. Mark it as "Swappable"
4. Open incognito window
5. Sign up as another user
6. Create and mark an event as swappable
7. Go to Marketplace
8. Request a swap
9. Switch back to first user
10. Go to Requests and Accept

Both calendars should now show swapped events!

## Troubleshooting

**Backend won't start?**
- Check PostgreSQL is running
- Verify `.env` file exists with correct DATABASE_URL
- Run `npm run prisma:generate`

**Frontend can't connect?**
- Make sure backend is running on port 4000
- Check browser console for errors

**Need help?**
- See `SETUP_CHECKLIST.md` for detailed steps
- Check `README.md` for full documentation

---

That's it! You're ready to swap some time slots! 🔄
