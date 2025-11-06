# ConceptSlotSwapper - Frontend

A React-based frontend for the ConceptSlotSwapper peer-to-peer time-slot scheduling application.

## Features

### 1. Authentication
- **Sign Up**: Create a new account with name, email, and password
- **Login**: Authenticate with existing credentials
- JWT token-based authentication with automatic token management

### 2. Dashboard (My Calendar)
- View all your events in a clean, organized list
- Create new events with title, start time, and end time
- Mark events as "Swappable" to make them available for swapping
- Change swappable events back to "Busy"
- Delete events (disabled during pending swaps)
- Real-time status indicators (BUSY, SWAPPABLE, SWAP_PENDING)

### 3. Marketplace
- Browse all available swappable slots from other users
- View slot details including title, owner, and time range
- Request swaps by selecting one of your swappable slots to offer
- Interactive modal for selecting which of your slots to offer in exchange

### 4. Requests Management
- **Incoming Requests**: View and respond to swap requests from other users
  - See what they're offering and what they want from you
  - Accept or reject requests
  - Automatic calendar updates on acceptance
- **Outgoing Requests**: Track swap requests you've sent to others
  - Monitor pending, accepted, and rejected statuses
  - View complete swap details

## Tech Stack

- **React 19** - UI framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Vite** - Build tool and dev server
- **CSS3** - Styling with custom CSS modules

## Project Structure

```
frontend/src/
├── api/
│   └── axios.js              # Axios instance with auth interceptor
├── components/
│   ├── Layout.jsx            # Main layout with navigation
│   ├── Layout.css
│   ├── ProtectedRoute.jsx    # Route guard for authenticated pages
│   ├── SwapModal.jsx         # Modal for requesting swaps
│   └── SwapModal.css
├── context/
│   └── AuthContext.jsx       # Authentication context provider
├── pages/
│   ├── Login.jsx             # Login page
│   ├── SignUp.jsx            # Sign up page
│   ├── Dashboard.jsx         # User's calendar/events
│   ├── Dashboard.css
│   ├── Marketplace.jsx       # Browse swappable slots
│   ├── Marketplace.css
│   ├── Requests.jsx          # Manage swap requests
│   └── Requests.css
├── App.jsx                   # Main app component with routing
├── App.css                   # Global app styles
├── main.jsx                  # App entry point
└── index.css                 # Global CSS reset and base styles
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Backend server running on `http://localhost:4000`

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## API Integration

The frontend communicates with the backend API at `http://localhost:4000/api`. The base URL can be modified in `src/api/axios.js`.

### API Endpoints Used

**Authentication:**
- `POST /api/signup` - Create new user account
- `POST /api/login` - Authenticate user

**Events:**
- `GET /api/events` - Get user's events
- `POST /api/events` - Create new event
- `PATCH /api/events/:id` - Update event (status, title, times)
- `DELETE /api/events/:id` - Delete event

**Swaps:**
- `GET /api/swaps/swappable-slots` - Get all available swappable slots
- `POST /api/swaps/request` - Request a swap
- `POST /api/swaps/response/:requestId` - Accept/reject swap request
- `GET /api/swaps/requests` - Get incoming and outgoing requests

## Key Features Implementation

### Authentication Flow
- JWT tokens stored in localStorage
- Automatic token injection via Axios interceptor
- Protected routes redirect to login if not authenticated
- User context provides auth state throughout the app

### State Management
- React Context API for global auth state
- Local component state for page-specific data
- Automatic refetching after mutations to keep UI in sync

### User Experience
- Clean, modern UI with gradient accents
- Responsive design for mobile and desktop
- Loading states and error handling
- Confirmation dialogs for destructive actions
- Real-time status badges and indicators
- Empty states with helpful messages

### Swap Request Flow
1. User marks their event as "Swappable" on Dashboard
2. Other users see it in the Marketplace
3. They click "Request Swap" and select one of their swappable slots
4. Original user receives the request in "Incoming Requests"
5. They can Accept (calendars update automatically) or Reject
6. Both users see updated status in their respective views

## Styling

The app uses a custom CSS approach with:
- Purple gradient theme (#667eea to #764ba2)
- Consistent spacing and typography
- Card-based layouts
- Hover effects and transitions
- Status-based color coding (blue for busy, green for swappable, orange for pending)

## Development Notes

- All dates are formatted using `toLocaleString()` for user-friendly display
- The app handles timezone conversions automatically via JavaScript Date objects
- Error messages from the API are displayed to users
- The UI updates immediately after successful operations
- Protected routes ensure users can't access authenticated pages without logging in

## Future Enhancements

Potential improvements:
- Real-time notifications using WebSockets
- Calendar view (grid/timeline) instead of just list view
- Filtering and search in marketplace
- User profiles and ratings
- Recurring events support
- Email notifications
- Mobile app version
