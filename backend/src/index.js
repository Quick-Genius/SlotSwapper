require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const auth = require('./auth');

const prisma = new PrismaClient();
const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/api/signup', auth.signup(prisma));
app.post('/api/login', auth.login(prisma));

// protected routes
const requireAuth = auth.requireAuth(prisma);

app.use('/api/events', requireAuth, require('./routes/events')(prisma));
app.use('/api/swaps', requireAuth, require('./routes/swap')(prisma));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
