const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/buzzapp';

const Message = require('./models/Message');

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.log('MongoDB Connection Error: ', err));

// Socket.io Connection
const onlineUsers = new Set();

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join', (userId) => {
    socket.userId = userId;
    onlineUsers.add(userId);
    io.emit('onlineUsers', Array.from(onlineUsers));
  });

  socket.on('sendMessage', async (data) => {
    try {
      // Save message to DB
      const message = await Message.create({
        sender: data.senderId,
        content: data.content,
      });

      // Populate sender details before emitting
      const populatedMessage = await message.populate('sender', 'name email');
      
      // Broadcast to everyone (including sender, or use socket.broadcast)
      io.emit('receiveMessage', populatedMessage);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  // Listen for clear chat event
  socket.on('clearChat', () => {
    io.emit('chatCleared');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    if (socket.userId) {
      onlineUsers.delete(socket.userId);
      io.emit('onlineUsers', Array.from(onlineUsers));
    }
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
