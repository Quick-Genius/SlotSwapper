const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

function signup(prisma) {
  return async (req,res) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) return res.status(400).json({error:'missing fields'});
    const hashed = await bcrypt.hash(password, 10);
    try {
      const user = await prisma.user.create({data: { name, email, password: hashed }});
      const token = jwt.sign({ userId: user.id }, JWT_SECRET);
      res.json({ token, user: { id: user.id, email: user.email, name: user.name }});
    } catch(e){
      res.status(400).json({ error: 'email already in use' });
    }
  }
}

function login(prisma) {
  return async (req,res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({where:{email}});
    if (!user) return res.status(401).json({error:'invalid credentials'});
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({error:'invalid credentials'});
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name }});
  }
}

function requireAuth(prisma) {
  return async (req,res,next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({error:'missing auth'});
    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      const user = await prisma.user.findUnique({where:{id: payload.userId}});
      if (!user) return res.status(401).json({error:'invalid token'});
      req.user = user;
      next();
    } catch(e) {
      return res.status(401).json({error:'invalid token'});
    }
  }
}

module.exports = { signup, login, requireAuth };
