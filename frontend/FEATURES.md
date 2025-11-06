# ConceptSlotSwapper Frontend - Feature Documentation

## Complete Feature List

### ✅ 1. User Authentication

#### Sign Up (`/signup`)
- Name, email, and password fields
- Client-side validation
- Error handling for duplicate emails
- Automatic login after successful signup
- JWT token storage in localStorage

#### Login (`/login`)
- Email and password authentication
- Error messages for invalid credentials
- Automatic redirect to dashboard on success
- Persistent sessions via localStorage

#### Protected Routes
- Automatic redirect to login for unauthenticated users
- Token-based authentication on all API requests
- Logout functionality with token cleanup

---

### ✅ 2. Dashboard - Calendar & Event Management

#### View Events
- List view of all user's events
- Color-coded status badges (BUSY, SWAPPABLE, SWAP_PENDING)
- Formatted date/time display
- Empty state for new users

#### Create Events
- Form with title, start time, and end time
- HTML5 datetime-local inputs
- Immediate UI update after creation
- Validation and error handling

#### Update Event Status
- "Make Swappable" button for BUSY events
- "Mark as Busy" button for SWAPPABLE events
- Disabled actions during SWAP_PENDING
- Real-time status updates

#### Delete Events
- Confirmation dialog before deletion
- Disabled during pending swaps
- Immediate removal from UI

---

### ✅ 3. Marketplace - Browse & Request Swaps

#### Browse Available Slots
- Grid layout of all swappable slots from other users
- Excludes user's own slots
- Shows slot owner name
- Displays title and time range
- Empty state when no slots available

#### Request Swap Flow
1. Click "Request Swap" on desired slot
2. Modal opens showing the selected slot
3. User selects one of their swappable slots to offer
4. Radio button selection for clarity
5. Submit request with confirmation

#### Swap Request Modal
- Visual display of "what you want"
- List of user's swappable slots to choose from
- Swap arrow indicator (⇅)
- Cancel and submit actions
- Validation to ensure slot selection

#### Smart Validation
- Prevents swapping if user has no swappable slots
- Helpful error messages
- Automatic data refresh after request

---

### ✅ 4. Requests Management

#### Incoming Requests
- List of all swap requests received from others
- Shows proposer's name
- Displays both slots involved in the swap
- Visual swap indicator (⇄)
- Accept/Reject buttons for pending requests
- Status badges (PENDING, ACCEPTED, REJECTED)

#### Outgoing Requests
- List of all swap requests sent to others
- Shows responder's name
- Displays both slots involved
- Status tracking
- "Waiting for response" indicator for pending

#### Accept Swap
- Confirmation via Accept button
- Atomic transaction on backend
- Automatic calendar update
- Both events swap owners
- Status changes to BUSY
- Success notification

#### Reject Swap
- Confirmation via Reject button
- Both slots return to SWAPPABLE
- Status updated to REJECTED
- Notification to user

---

## Technical Implementation Details

### State Management
- **AuthContext**: Global authentication state
- **Local State**: Component-specific data (events, requests, slots)
- **Automatic Refetching**: After mutations to keep UI in sync

### API Integration
- Axios instance with interceptor for auth tokens
- Centralized error handling
- Automatic token injection on all requests
- Base URL configuration

### Routing
- React Router DOM v7
- Protected route wrapper
- Nested routes with Layout
- Automatic redirects

### UI/UX Features
- Responsive design (mobile & desktop)
- Loading states
- Empty states with helpful messages
- Error messages
- Confirmation dialogs
- Hover effects and transitions
- Status-based color coding
- Accessible forms

### Data Flow
1. User action triggers API call
2. Response updates local state
3. UI re-renders with new data
4. Success/error feedback to user

---

## Component Architecture

### Pages
- **Login/SignUp**: Authentication forms
- **Dashboard**: Event CRUD operations
- **Marketplace**: Browse and request swaps
- **Requests**: Manage incoming/outgoing swaps

### Components
- **Layout**: Navigation and page structure
- **ProtectedRoute**: Authentication guard
- **SwapModal**: Swap request interface

### Context
- **AuthContext**: User authentication state and methods

### API
- **axios.js**: Configured HTTP client

---

## Styling Approach

### Design System
- **Primary Color**: #667eea (purple)
- **Gradient**: #667eea to #764ba2
- **Success**: #28a745 (green)
- **Danger**: #dc3545 (red)
- **Warning**: #f57c00 (orange)

### Layout Patterns
- Card-based design
- Grid layouts for lists
- Flexbox for alignment
- Consistent spacing (rem units)
- Box shadows for depth

### Interactive Elements
- Hover states on all clickable items
- Transition animations
- Focus states for accessibility
- Disabled states for unavailable actions

---

## User Workflows

### Complete Swap Workflow
1. **User A**: Creates event → Marks as swappable
2. **User B**: Sees event in marketplace → Requests swap with their slot
3. **User A**: Receives notification → Views in Requests → Accepts
4. **Both Users**: Calendars automatically updated with swapped events

### Event Management Workflow
1. Create event (starts as BUSY)
2. Make swappable (available in marketplace)
3. Receive swap request (becomes SWAP_PENDING)
4. Accept swap (ownership transfers, becomes BUSY)
5. Or reject swap (returns to SWAPPABLE)

---

## Error Handling

### Network Errors
- Caught and displayed to user
- Graceful degradation
- Retry mechanisms where appropriate

### Validation Errors
- Client-side validation before submission
- Server-side error messages displayed
- Field-level error indicators

### Edge Cases
- No swappable slots available
- Attempting to swap with self (prevented)
- Deleting events in pending swaps (disabled)
- Expired tokens (redirect to login)

---

## Performance Optimizations

- Minimal re-renders with proper state management
- Efficient data fetching (only when needed)
- Optimistic UI updates where safe
- Lazy loading of routes (potential enhancement)

---

## Accessibility Features

- Semantic HTML elements
- Keyboard navigation support
- Focus management
- ARIA labels where needed
- Color contrast compliance
- Form labels and validation

---

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- CSS Grid and Flexbox
- HTML5 form inputs
- LocalStorage API

---

## Security Considerations

- JWT tokens in localStorage
- Bearer token authentication
- Protected routes
- CORS handling
- Input sanitization (server-side)
- No sensitive data in URLs

---

This frontend implementation provides a complete, production-ready user interface for the ConceptSlotSwapper application with all required features and excellent user experience.
