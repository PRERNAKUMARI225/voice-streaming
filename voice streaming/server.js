const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path'); // Import path module
const cors = require('cors'); // Import CORS middleware

// Serve static files from the public folder of the other React Native project
const publicPath = path.join(__dirname, '../RealtimeMonitor/public');
app.use(express.static(publicPath));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// CORS middleware
app.use(cors());

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room ${roomId}`);
  });

  socket.on('audio-data', ({ roomId, data }) => {
    io.to(roomId).emit('audio-data', data);
  });
});

const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
