# ConceptSlotSwapper

A peer-to-peer time-slot scheduling application that allows users to swap calendar events with each other.

## Overview

ConceptSlotSwapper enables users to:
- Manage their calendar events
- Mark busy time slots as "swappable"
- Browse swappable slots from other users
- Request to swap their slots with others
- Accept or reject incoming swap requests
- Automatically update calendars when swaps are accepted

## Architecture

- **Frontend**: React 19 with React Router and Axios
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure

```
.
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── prisma/         # Database schema
│   │   ├── auth.js         # Authentication logic
│   │   └── index.js        # Server entry point
│   ├── .env                # Environment variables
│   ├── package.json
│   └── SETUP.md           # Backend setup guide
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── api/           # API client
│   │   ├── components/    # React components
│   │   ├── context/       # React context
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   ├── FRONTEND_README.md # Frontend documentation
│   └── FEATURES.md        # Feature documentation
│
├── QUICKSTART.md          # Quick start guide
└── README.md              # This file
```

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### 1. Backend Setup

```bash
cd backend
npm install

# Configure database in .env
# DATABASE_URL="postgresql://username:password@localhost:5432/conceptslotswapper"

# Generate Prisma Client and run migrations
npm run prisma:generate
npm run prisma:migrate

# Start backend server
npm run dev
```

Backend runs on `http://localhost:4000`

### 2. Frontend Setup

```bash
cd frontend
npm install

# Start frontend dev server
npm run dev
```

Frontend runs on `http://localhost:5173`

### 3. Use the Application

1. Open `http://localhost:5173` in your browser
2. Sign up for a new account
3. Create events and mark them as swappable
4. Browse the marketplace for other users' swappable slots
5. Request swaps and manage incoming requests

## Features

### Authentication
- User registration with name, email, and password
- Secure login with JWT tokens
- Protected routes and API endpoints

### Event Management
- Create calendar events with title and time range
- View all your events in one place
- Mark events as "Swappable" or "Busy"
- Delete events (disabled during pending swaps)
- Real-time status indicators

### Marketplace
- Browse all available swappable slots from other users
- View slot details (title, owner, time)
- Request swaps by offering one of your swappable slots
- Interactive modal for selecting your offer

### Swap Requests
- **Incoming**: View and respond to requests from others
- **Outgoing**: Track requests you've sent
- Accept or reject swaps
- Automatic calendar updates on acceptance
- Status tracking (PENDING, ACCEPTED, REJECTED)

## API Documentation

### Authentication Endpoints

#### Sign Up
```http
POST /api/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Protected Endpoints (Require Bearer Token)

#### Get User's Events
```http
GET /api/events
Authorization: Bearer <token>
```

#### Create Event
```http
POST /api/events
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Team Meeting",
  "startTime": "2025-11-10T10:00:00Z",
  "endTime": "2025-11-10T11:00:00Z"
}
```

#### Update Event
```http
PATCH /api/events/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "SWAPPABLE"
}
```

#### Delete Event
```http
DELETE /api/events/:id
Authorization: Bearer <token>
```

#### Get Swappable Slots
```http
GET /api/swaps/swappable-slots
Authorization: Bearer <token>
```

#### Request Swap
```http
POST /api/swaps/request
Authorization: Bearer <token>
Content-Type: application/json

{
  "mySlotId": 1,
  "theirSlotId": 2
}
```

#### Respond to Swap Request
```http
POST /api/swaps/response/:requestId
Authorization: Bearer <token>
Content-Type: application/json

{
  "accept": true
}
```

#### Get All Requests
```http
GET /api/swaps/requests
Authorization: Bearer <token>
```

## Database Schema

### User
- id (Int, Primary Key)
- name (String)
- email (String, Unique)
- password (String, Hashed)
- createdAt (DateTime)

### Event
- id (Int, Primary Key)
- title (String)
- startTime (DateTime)
- endTime (DateTime)
- status (Enum: BUSY, SWAPPABLE, SWAP_PENDING)
- ownerId (Int, Foreign Key)
- createdAt (DateTime)
- updatedAt (DateTime)

### SwapRequest
- id (Int, Primary Key)
- proposerId (Int, Foreign Key)
- responderId (Int, Foreign Key)
- myEventId (Int, Foreign Key)
- theirEventId (Int, Foreign Key)
- status (Enum: PENDING, ACCEPTED, REJECTED)
- createdAt (DateTime)
- updatedAt (DateTime)

## Development

### Backend Development

```bash
cd backend

# Start with auto-reload
npm run dev

# View database with Prisma Studio
npm run prisma:studio

# Create new migration
npm run prisma:migrate
```

### Frontend Development

```bash
cd frontend

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing the Swap Flow

1. Create two user accounts (User A and User B)
2. User A creates an event and marks it as swappable
3. User B creates an event and marks it as swappable
4. User B goes to marketplace and requests a swap with User A's slot
5. User A receives the request and can accept or reject
6. If accepted, both calendars update automatically

## Troubleshooting

### Backend Issues

**Prisma Client not found**
```bash
cd backend
npm run prisma:generate
```

**Database connection error**
- Check `.env` file has correct DATABASE_URL
- Ensure PostgreSQL is running
- Verify database exists

**Port already in use**
- Change PORT in `.env` file

### Frontend Issues

**API connection error**
- Ensure backend is running on port 4000
- Check `frontend/src/api/axios.js` for correct API URL

**Authentication issues**
- Clear localStorage and try logging in again
- Check browser console for errors

## Security Considerations

- Passwords are hashed with bcrypt
- JWT tokens for authentication
- Protected API routes
- CORS enabled for frontend
- Input validation on backend

## Production Deployment

### Backend
1. Set strong JWT_SECRET
2. Use production PostgreSQL instance
3. Enable HTTPS
4. Set NODE_ENV=production
5. Use process manager (PM2, Docker)

### Frontend
1. Build production bundle: `npm run build`
2. Serve static files with nginx or similar
3. Configure API URL for production
4. Enable HTTPS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC

## Support

For issues and questions:
- Check the documentation in `backend/SETUP.md` and `frontend/FRONTEND_README.md`
- Review `QUICKSTART.md` for common setup steps
- Check `frontend/FEATURES.md` for feature details

---

Built with ❤️ using React, Express, and PostgreSQL
# SlotSwapper
