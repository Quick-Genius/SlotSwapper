# ConceptSlotSwapper - Quick Start Guide

## Running the Application

### 1. Setup and Start the Backend

```bash
cd backend
npm install

# Configure your database in .env file
# DATABASE_URL="postgresql://username:password@localhost:5432/conceptslotswapper"

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start the backend
npm run dev
```

Backend will run on `http://localhost:4000`

**Note**: See `backend/SETUP.md` for detailed setup instructions.

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

### 3. Using the Application

#### First Time Setup

1. **Sign Up**: Navigate to `http://localhost:5173` and create an account
   - Enter your name, email, and password
   - You'll be automatically logged in and redirected to the Dashboard

2. **Create Events**: On the Dashboard
   - Fill in the event form with title, start time, and end time
   - Click "Create Event"
   - Your event will appear in the list with status "BUSY"

3. **Make Events Swappable**:
   - Click "Make Swappable" on any event you want to offer for swapping
   - The status will change to "SWAPPABLE"

#### Swapping Slots

1. **Browse Marketplace**:
   - Click "Marketplace" in the navigation
   - See all swappable slots from other users
   - Click "Request Swap" on any slot you want

2. **Select Your Offer**:
   - A modal will appear showing the slot you want
   - Select one of your swappable slots to offer in exchange
   - Click "Send Swap Request"

3. **Manage Requests**:
   - Click "Requests" in the navigation
   - **Incoming**: See requests from others and Accept/Reject them
   - **Outgoing**: Track your pending requests to others

4. **Accept a Swap**:
   - When you accept a swap, both calendars update automatically
   - The events swap owners and return to "BUSY" status
   - Both users now have each other's original time slots

## Testing the Swap Flow

To fully test the application, you'll need at least 2 user accounts:

### User A:
1. Sign up as User A
2. Create an event (e.g., "Team Meeting" on Tuesday 10-11 AM)
3. Mark it as "Swappable"
4. Log out

### User B:
1. Sign up as User B
2. Create an event (e.g., "Focus Block" on Wednesday 2-3 PM)
3. Mark it as "Swappable"
4. Go to Marketplace - you should see User A's "Team Meeting"
5. Click "Request Swap" and select your "Focus Block"
6. Send the request

### Back to User A:
1. Log in as User A
2. Go to Requests
3. See the incoming request from User B
4. Accept or Reject it
5. If accepted, check Dashboard - you now have User B's "Focus Block"

### Verify:
- User A's Dashboard shows "Focus Block" (originally User B's)
- User B's Dashboard shows "Team Meeting" (originally User A's)
- Both events are back to "BUSY" status
- The swap request shows "ACCEPTED" status

## Features Overview

### Dashboard
- Create, view, and manage your events
- Toggle between BUSY and SWAPPABLE status
- Delete events (disabled during pending swaps)
- Visual status indicators

### Marketplace
- Browse all available swappable slots
- See slot owner, title, and time details
- Request swaps with your own swappable slots
- Real-time updates after requests

### Requests
- **Incoming**: Respond to swap requests from others
- **Outgoing**: Monitor your pending requests
- See complete swap details before accepting
- Status tracking (PENDING, ACCEPTED, REJECTED)

## Troubleshooting

### Backend Connection Issues
- Ensure backend is running on port 4000
- Check `frontend/src/api/axios.js` for correct API URL

### Authentication Issues
- Clear localStorage and try logging in again
- Check browser console for error messages

### Swap Not Working
- Ensure both slots are SWAPPABLE before requesting
- Check that you're not trying to swap with yourself
- Verify both events exist and haven't been deleted

## API Endpoints Reference

All endpoints require Bearer token authentication (except signup/login):

```
POST   /api/signup                    - Create account
POST   /api/login                     - Login
GET    /api/events                    - Get user's events
POST   /api/events                    - Create event
PATCH  /api/events/:id                - Update event
DELETE /api/events/:id                - Delete event
GET    /api/swaps/swappable-slots     - Get available slots
POST   /api/swaps/request             - Request swap
POST   /api/swaps/response/:requestId - Accept/reject swap
GET    /api/swaps/requests            - Get all requests
```

## Development Tips

- Use browser DevTools to inspect API calls
- Check Network tab for request/response details
- Console logs show any errors
- React DevTools helps debug component state
- The app auto-refreshes data after mutations

Enjoy using ConceptSlotSwapper! 🔄
