# ConceptSlotSwapper

A peer-to-peer time-slot scheduling application that allows users to swap calendar events with each other.

## 📋 Table of Contents

- [Overview](#overview)
- [Design Choices](#design-choices)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Local Setup Instructions](#local-setup-instructions)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Assumptions & Challenges](#assumptions--challenges)
- [Deployment](#deployment)

---

## 🎯 Overview

ConceptSlotSwapper is a full-stack web application that enables users to manage their calendar events and swap time slots with other users. The core concept is simple: users can mark their busy time slots as "swappable," and other users can request to exchange one of their own swappable slots for it.

### Example Use Case:
- **User A** has a "Team Meeting" on Tuesday 10-11 AM (marked as swappable)
- **User B** has a "Focus Block" on Wednesday 2-3 PM (marked as swappable)
- **User A** sees User B's slot in the marketplace and requests a swap
- **User B** receives the request and can accept or reject it
- If accepted, both users' calendars are automatically updated with the swapped events

---

## 🎨 Design Choices

### Architecture Decisions

1. **Monorepo Structure**: Separated frontend and backend into distinct directories for clear separation of concerns and independent deployment.

2. **JWT Authentication**: Chose JWT tokens for stateless authentication, making it easier to scale horizontally and deploy to serverless platforms.

3. **Prisma ORM**: Selected Prisma for type-safe database access, excellent developer experience, and automatic migration generation.

4. **React with Context API**: Used React Context for global state management instead of Redux to keep the application lightweight while still managing authentication state effectively.

5. **Atomic Swap Transactions**: Implemented database transactions to ensure data consistency during swaps, preventing race conditions and partial updates.

### UI/UX Decisions

1. **Confluence-Inspired Design**: Adopted a professional, enterprise-style interface with:
   - Sidebar navigation for easy access to features
   - Card-based layouts for better content organization
   - Status badges with color coding for quick visual feedback
   - Clean typography and consistent spacing

2. **Status-Based Workflow**: Clear visual indicators for event states:
   - **BUSY** (Gray): Regular events
   - **SWAPPABLE** (Green): Available for swapping
   - **SWAP_PENDING** (Orange): Currently in a swap request

3. **Responsive Design**: Mobile-first approach ensuring the app works on all screen sizes.

### Security Decisions

1. **Password Hashing**: Using bcrypt with 10 salt rounds for secure password storage.
2. **CORS Configuration**: Environment-based CORS to prevent unauthorized access.
3. **Protected Routes**: Client-side route protection with automatic redirects.
4. **Environment Variables**: Sensitive configuration stored in environment variables, never committed to Git.

---

## ✨ Features

### Core Features

- ✅ **User Authentication**: Sign up and login with JWT tokens
- ✅ **Event Management**: Create, view, update, and delete calendar events
- ✅ **Swappable Slots**: Mark events as available for swapping
- ✅ **Marketplace**: Browse all available swappable slots from other users
- ✅ **Swap Requests**: Request to swap your slot with another user's slot
- ✅ **Request Management**: Accept or reject incoming swap requests
- ✅ **Automatic Updates**: Calendars update automatically when swaps are accepted
- ✅ **Status Tracking**: Track swap request status (PENDING, ACCEPTED, REJECTED)

### Additional Features

- ✅ **Delete Pending Swaps**: Can delete events even during pending swaps (automatically cancels the swap)
- ✅ **Protected Routes**: Authentication-required pages with automatic redirects
- ✅ **Persistent Sessions**: Stay logged in across browser sessions
- ✅ **Real-time UI Updates**: Automatic data refresh after mutations
- ✅ **Error Handling**: User-friendly error messages
- ✅ **Coming Soon Pages**: Placeholder pages for future features

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM v7** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Vite** - Build tool and dev server
- **CSS3** - Custom styling (no frameworks)

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Web framework
- **Prisma 6** - ORM for PostgreSQL
- **PostgreSQL** - Relational database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Development Tools
- **nodemon** - Auto-restart for development
- **ESLint** - Code linting
- **Git** - Version control

---

## 📁 Project Structure

```
ConceptSlotSwapper/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── events.js          # Event CRUD endpoints
│   │   │   └── swap.js            # Swap logic endpoints
│   │   ├── prisma/
│   │   │   ├── schema.prisma      # Database schema
│   │   │   └── migrations/        # Database migrations
│   │   ├── auth.js                # JWT authentication logic
│   │   └── index.js               # Express server setup
│   ├── .env                       # Environment variables (not in Git)
│   ├── .env.example               # Example environment variables
│   └── package.json               # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js           # Axios instance with auth
│   │   ├── components/
│   │   │   ├── Layout.jsx         # Main layout with navigation
│   │   │   ├── ProtectedRoute.jsx # Route guard
│   │   │   └── SwapModal.jsx      # Swap request modal
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Authentication context
│   │   ├── pages/
│   │   │   ├── Login.jsx          # Login page
│   │   │   ├── SignUp.jsx         # Registration page
│   │   │   ├── Dashboard.jsx      # User's calendar
│   │   │   ├── Marketplace.jsx    # Browse swappable slots
│   │   │   ├── Requests.jsx       # Manage swap requests
│   │   │   └── ComingSoon.jsx     # Placeholder page
│   │   ├── App.jsx                # Main app with routing
│   │   └── main.jsx               # Entry point
│   ├── .env                       # Environment variables (not in Git)
│   ├── .env.example               # Example environment variables
│   ├── vercel.json                # Vercel configuration
│   └── package.json               # Frontend dependencies
│
├── README.md                      # This file
├── DEPLOYMENT_GUIDE.md            # Deployment instructions
└── QUICK_FIX.md                   # Common issues and fixes
```

---

## 🚀 Local Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd ConceptSlotSwapper
```

### Step 2: Backend Setup

#### 2.1 Install Dependencies

```bash
cd backend
npm install
```

#### 2.2 Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/conceptslotswapper?schema=public"
JWT_SECRET="your-super-secret-key-at-least-32-characters-long"
PORT=4000
FRONTEND_URL=http://localhost:5174
```

**Replace**:
- `username` - Your PostgreSQL username (default: `postgres`)
- `password` - Your PostgreSQL password
- `conceptslotswapper` - Database name (will be created in next step)

#### 2.3 Create Database

Using PostgreSQL command line:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE conceptslotswapper;

# Exit
\q
```

Or use a GUI tool like pgAdmin, DBeaver, or Postico.

#### 2.4 Generate Prisma Client

```bash
npm run prisma:generate
```

#### 2.5 Run Database Migrations

```bash
npm run prisma:migrate
```

When prompted, enter a migration name (e.g., "init").

#### 2.6 Start Backend Server

```bash
npm run dev
```

You should see:
```
Backend listening on 4000
```

**Backend is now running at**: `http://localhost:4000`

### Step 3: Frontend Setup

Open a new terminal window/tab.

#### 3.1 Install Dependencies

```bash
cd frontend
npm install
```

#### 3.2 Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
cp .env.example .env
```

The default configuration should work:

```env
VITE_API_URL=http://localhost:4000/api
```

#### 3.3 Start Frontend Server

```bash
npm run dev
```

You should see:
```
VITE ready in X ms
Local: http://localhost:5174/
```

**Frontend is now running at**: `http://localhost:5174`

### Step 4: Test the Application

1. Open your browser to `http://localhost:5174`
2. Click "Sign Up" and create an account
3. Create some events
4. Mark an event as "Swappable"
5. Open an incognito window and create another user
6. Test the swap functionality

---

## 📡 API Endpoints

### Base URL
```
http://localhost:4000/api
```

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

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
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

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Event Endpoints (Protected)

All event endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

#### Get User's Events
```http
GET /api/events
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "title": "Team Meeting",
    "startTime": "2025-11-10T10:00:00.000Z",
    "endTime": "2025-11-10T11:00:00.000Z",
    "status": "SWAPPABLE",
    "ownerId": 1,
    "createdAt": "2025-11-06T12:00:00.000Z",
    "updatedAt": "2025-11-06T12:00:00.000Z"
  }
]
```

#### Create Event
```http
POST /api/events
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Team Meeting",
  "startTime": "2025-11-10T10:00:00.000Z",
  "endTime": "2025-11-10T11:00:00.000Z"
}
```

**Response** (200 OK):
```json
{
  "id": 1,
  "title": "Team Meeting",
  "startTime": "2025-11-10T10:00:00.000Z",
  "endTime": "2025-11-10T11:00:00.000Z",
  "status": "BUSY",
  "ownerId": 1,
  "createdAt": "2025-11-06T12:00:00.000Z",
  "updatedAt": "2025-11-06T12:00:00.000Z"
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

**Response** (200 OK):
```json
{
  "id": 1,
  "title": "Team Meeting",
  "startTime": "2025-11-10T10:00:00.000Z",
  "endTime": "2025-11-10T11:00:00.000Z",
  "status": "SWAPPABLE",
  "ownerId": 1,
  "createdAt": "2025-11-06T12:00:00.000Z",
  "updatedAt": "2025-11-06T12:05:00.000Z"
}
```

#### Delete Event
```http
DELETE /api/events/:id
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "ok": true
}
```

---

### Swap Endpoints (Protected)

#### Get Swappable Slots
Returns all swappable slots from other users (excludes your own).

```http
GET /api/swaps/swappable-slots
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
[
  {
    "id": 2,
    "title": "Focus Block",
    "startTime": "2025-11-11T14:00:00.000Z",
    "endTime": "2025-11-11T15:00:00.000Z",
    "status": "SWAPPABLE",
    "ownerId": 2,
    "owner": {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com"
    }
  }
]
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

**Response** (200 OK):
```json
{
  "id": 1,
  "proposerId": 1,
  "responderId": 2,
  "myEventId": 1,
  "theirEventId": 2,
  "status": "PENDING",
  "createdAt": "2025-11-06T12:10:00.000Z",
  "updatedAt": "2025-11-06T12:10:00.000Z"
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

**Response** (200 OK):
```json
{
  "status": "ACCEPTED"
}
```

Or for rejection:
```json
{
  "accept": false
}
```

**Response** (200 OK):
```json
{
  "status": "REJECTED"
}
```

#### Get All Swap Requests
Returns both incoming and outgoing swap requests for the authenticated user.

```http
GET /api/swaps/requests
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "incoming": [
    {
      "id": 1,
      "proposerId": 2,
      "responderId": 1,
      "myEventId": 2,
      "theirEventId": 1,
      "status": "PENDING",
      "myEvent": {
        "id": 2,
        "title": "Focus Block",
        "startTime": "2025-11-11T14:00:00.000Z",
        "endTime": "2025-11-11T15:00:00.000Z"
      },
      "theirEvent": {
        "id": 1,
        "title": "Team Meeting",
        "startTime": "2025-11-10T10:00:00.000Z",
        "endTime": "2025-11-10T11:00:00.000Z"
      },
      "proposer": {
        "id": 2,
        "name": "Jane Smith"
      }
    }
  ],
  "outgoing": []
}
```

---

### API Endpoints Summary Table

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/signup` | No | Create new user account |
| POST | `/api/login` | No | Authenticate user |
| GET | `/api/events` | Yes | Get user's events |
| POST | `/api/events` | Yes | Create new event |
| PATCH | `/api/events/:id` | Yes | Update event |
| DELETE | `/api/events/:id` | Yes | Delete event |
| GET | `/api/swaps/swappable-slots` | Yes | Get all swappable slots |
| POST | `/api/swaps/request` | Yes | Request a swap |
| POST | `/api/swaps/response/:requestId` | Yes | Accept/reject swap |
| GET | `/api/swaps/requests` | Yes | Get all swap requests |

---

## 🗄️ Database Schema

### User Table
```prisma
model User {
  id        Int       @id @default(autoincrement())
  name      String
  email     String    @unique
  password  String    // hashed with bcrypt
  events    Event[]
  outgoing  SwapRequest[] @relation("outgoingRequests")
  incoming  SwapRequest[] @relation("incomingRequests")
  createdAt DateTime  @default(now())
}
```

### Event Table
```prisma
model Event {
  id        Int         @id @default(autoincrement())
  title     String
  startTime DateTime
  endTime   DateTime
  status    EventStatus @default(BUSY)
  ownerId   Int
  owner     User        @relation(fields: [ownerId], references: [id])
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
  mySwapRequests    SwapRequest[] @relation("myEventSwaps")
  theirSwapRequests SwapRequest[] @relation("theirEventSwaps")
}

enum EventStatus {
  BUSY
  SWAPPABLE
  SWAP_PENDING
}
```

### SwapRequest Table
```prisma
model SwapRequest {
  id           Int        @id @default(autoincrement())
  proposerId   Int
  responderId  Int
  myEventId    Int        // proposer's offered event
  theirEventId Int        // responder's event being requested
  status       SwapStatus @default(PENDING)
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  
  proposer     User  @relation("outgoingRequests", fields: [proposerId], references: [id])
  responder    User  @relation("incomingRequests", fields: [responderId], references: [id])
  myEvent      Event @relation("myEventSwaps", fields: [myEventId], references: [id])
  theirEvent   Event @relation("theirEventSwaps", fields: [theirEventId], references: [id])
}

enum SwapStatus {
  PENDING
  ACCEPTED
  REJECTED
}
```

---

## 🤔 Assumptions & Challenges

### Assumptions Made

1. **Single Time Zone**: Assumed all users operate in the same timezone. In a production app, we would need to handle timezone conversions.

2. **No Recurring Events**: Events are one-time only. Recurring events would require additional complexity.

3. **One-to-One Swaps**: Each swap involves exactly two events. Group swaps or multi-party swaps are not supported.

4. **Immediate Swap**: When a swap is accepted, it happens immediately. No scheduling or delayed swaps.

5. **No Event Conflicts**: The system doesn't check for time conflicts when swapping events.

6. **Email Verification**: Assumed email addresses are valid without verification. Production would need email verification.

7. **Password Requirements**: Basic password validation. Production would need stronger requirements (length, complexity, etc.).

8. **Event Ownership**: Once swapped, the new owner has full control. Original owner cannot reclaim.

9. **Swap History**: Swap requests are kept in the database but not displayed in a history view.

10. **Single Device**: No real-time synchronization across multiple devices. User needs to refresh to see updates.

### Challenges Faced

#### 1. Atomic Swap Transactions
**Challenge**: Ensuring both events swap ownership atomically without race conditions.

**Solution**: Used Prisma transactions (`$transaction`) to wrap all swap operations:
```javascript
await prisma.$transaction(async (tx) => {
  // Update both events
  // Update swap request status
  // All or nothing
});
```

#### 2. Prisma Schema Relations
**Challenge**: SwapRequest table needed to reference the same Event table twice (myEvent and theirEvent), causing ambiguous relations.

**Solution**: Added explicit relation names:
```prisma
myEvent      Event @relation("myEventSwaps", fields: [myEventId], references: [id])
theirEvent   Event @relation("theirEventSwaps", fields: [theirEventId], references: [id])
```

#### 3. Deleting Events with Pending Swaps
**Challenge**: Foreign key constraints prevented deleting events that were part of swap requests.

**Solution**: Implemented cascading logic:
- Find all swap requests involving the event
- Mark pending swaps as REJECTED
- Reset other user's event to SWAPPABLE
- Delete all swap request records
- Finally delete the event

#### 4. Environment Variables in Vite
**Challenge**: Vite requires `VITE_` prefix for environment variables, which is different from standard React apps.

**Solution**: Used `import.meta.env.VITE_API_URL` instead of `process.env.REACT_APP_API_URL`.

#### 5. CORS Configuration
**Challenge**: Needed different CORS settings for development and production.

**Solution**: Used environment variable for frontend URL:
```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5174'
};
```

#### 6. JWT Token Management
**Challenge**: Needed to include JWT token in all authenticated requests.

**Solution**: Created Axios interceptor:
```javascript
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

#### 7. Protected Routes
**Challenge**: Preventing unauthenticated users from accessing protected pages.

**Solution**: Created ProtectedRoute component that checks authentication and redirects to login if needed.

#### 8. State Management
**Challenge**: Keeping UI in sync after mutations (create, update, delete, swap).

**Solution**: Implemented refetch pattern - after any mutation, call the fetch function again to get fresh data.

#### 9. Deployment Configuration
**Challenge**: Different configuration needed for local development vs production deployment.

**Solution**: 
- Used environment variables for all configuration
- Created separate `.env.example` files
- Added comprehensive deployment guides

#### 10. Prisma Client Generation on Deployment
**Challenge**: Prisma Client needs to be generated on the deployment server, not just locally.

**Solution**: Added `postinstall` script to package.json:
```json
"postinstall": "prisma generate --schema=./src/prisma/schema.prisma"
```

---

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Import project to Vercel
3. Set environment variable:
   - `VITE_API_URL` = `https://your-backend-url.com/api`
4. Deploy

See `VERCEL_SETUP.md` for detailed instructions.

### Backend Deployment (Render/Railway/Heroku)

1. Deploy to your chosen platform
2. Set environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `FRONTEND_URL`
   - `PORT`
3. Platform will automatically run `postinstall` script to generate Prisma Client
4. Run migrations (if needed)

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

---

## 📝 Additional Documentation

- `DEPLOYMENT_GUIDE.md` - Complete deployment instructions
- `BACKEND_DEPLOYMENT_FIX.md` - Prisma Client deployment issues
- `VERCEL_SETUP.md` - Vercel-specific setup
- `VERCEL_ERROR_405.md` - Troubleshooting 405 errors
- `ENV_SETUP.md` - Environment variables guide
- `FEATURE_UPDATE.md` - Feature documentation
- `DELETE_SWAP_EVENTS_GUIDE.md` - Delete functionality guide

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Sign up with new account
- [ ] Log in with existing account
- [ ] Create an event
- [ ] Update event status to SWAPPABLE
- [ ] View event in marketplace (from another user)
- [ ] Request a swap
- [ ] Accept a swap
- [ ] Reject a swap
- [ ] Delete an event
- [ ] Delete an event with pending swap
- [ ] Log out
- [ ] Protected routes redirect to login

### Testing with Multiple Users

1. Create User A in normal browser
2. Create User B in incognito window
3. Both create swappable events
4. Test swap flow between them

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Prisma for excellent ORM and documentation
- React team for the amazing framework
- Vercel for easy frontend deployment
- Render/Railway for backend hosting

---

## 📞 Support

If you have any questions or run into issues:

1. Check the documentation files in the repository
2. Review the troubleshooting guides
3. Open an issue on GitHub
4. Contact the author

---

**Built with ❤️ using React, Express, PostgreSQL, and Prisma**
