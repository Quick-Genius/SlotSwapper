require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const auth = require('./auth');

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/signup', auth.signup(prisma));
app.post('/api/login', auth.login(prisma));

// protected routes
const requireAuth = auth.requireAuth(prisma);

app.use('/api/events', requireAuth, require('./routes/events')(prisma));
app.use('/api/swaps', requireAuth, require('./routes/swap')(prisma));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
