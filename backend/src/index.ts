import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';
import applicationRoutes from './routes/applications.js';
import { authenticateToken } from './middleware/auth.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

app.use(cors());
app.use(express.json());

// Set up Socket.io global instance so routes can access it if needed
app.set('io', io);

// Basic health check
app.get('/health', (req, res) => res.send('OK'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// Socket.io for Real-time Notifications
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Authenticate socket connection
  socket.on('authenticate', (token: string) => {
    // In a real app, verify the JWT here.
    console.log(`Socket ${socket.id} authenticated with token`);
    // Example: socket.join(`user:${userId}`) to target notifications
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
