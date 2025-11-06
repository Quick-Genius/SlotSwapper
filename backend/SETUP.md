# Backend Setup Guide

## Prerequisites

1. **Node.js** (v16 or higher)
2. **PostgreSQL** database running locally or remotely

## Setup Steps

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Database

Edit the `.env` file with your PostgreSQL connection details:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/conceptslotswapper?schema=public"
JWT_SECRET="your-secret-key-change-this-in-production"
PORT=4000
```

Replace:
- `username` - your PostgreSQL username
- `password` - your PostgreSQL password
- `localhost:5432` - your PostgreSQL host and port
- `conceptslotswapper` - your database name

### 3. Create Database

Create the database in PostgreSQL:

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

This generates the Prisma Client based on your schema.

### 5. Run Database Migrations

```bash
npm run prisma:migrate
```

This will:
- Create the database tables
- Apply the schema to your database
- Prompt you to name the migration (e.g., "init")

### 6. Start the Development Server

```bash
npm run dev
```

The backend will start on `http://localhost:4000`

## Available Scripts

- `npm run dev` - Start development server with auto-reload (nodemon)
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

## Troubleshooting

### Prisma Client Not Found

If you get an error about `@prisma/client` not being found:

```bash
npm run prisma:generate
```

### Database Connection Error

1. Check your `.env` file has the correct DATABASE_URL
2. Ensure PostgreSQL is running
3. Verify the database exists
4. Check username/password are correct

### Port Already in Use

If port 4000 is already in use, change it in `.env`:

```env
PORT=4001
```

### Migration Errors

If migrations fail, you can reset the database:

```bash
npx prisma migrate reset --schema=./src/prisma/schema.prisma
```

**Warning**: This will delete all data!

## Database Schema

The application uses the following models:

- **User**: User accounts with authentication
- **Event**: Calendar events/time slots
- **SwapRequest**: Swap requests between users

See `src/prisma/schema.prisma` for the complete schema.

## API Endpoints

### Authentication
- `POST /api/signup` - Create new user
- `POST /api/login` - Login user

### Events (Protected)
- `GET /api/events` - Get user's events
- `POST /api/events` - Create event
- `PATCH /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Swaps (Protected)
- `GET /api/swaps/swappable-slots` - Get available slots
- `POST /api/swaps/request` - Request a swap
- `POST /api/swaps/response/:requestId` - Accept/reject swap
- `GET /api/swaps/requests` - Get all requests

## Development Tips

### View Database with Prisma Studio

```bash
npm run prisma:studio
```

Opens a web interface at `http://localhost:5555` to view and edit data.

### Check Logs

Nodemon will show all console logs and errors in the terminal.

### Test API Endpoints

Use tools like:
- Postman
- Insomnia
- Thunder Client (VS Code extension)
- curl

Example curl request:

```bash
# Sign up
curl -X POST http://localhost:4000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:4000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Production Deployment

1. Set strong JWT_SECRET in production
2. Use environment variables for sensitive data
3. Enable HTTPS
4. Use a production-grade PostgreSQL instance
5. Set NODE_ENV=production
6. Consider using PM2 or similar for process management

## Need Help?

- Check the Prisma documentation: https://www.prisma.io/docs
- Express documentation: https://expressjs.com
- PostgreSQL documentation: https://www.postgresql.org/docs
