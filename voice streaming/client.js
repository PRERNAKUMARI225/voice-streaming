import io from 'socket.io-client';

const socket = io('http://192.168.29.149:3001');

// Listener for receiving join-room event from the server
socket.on('join-room', async (roomId) => {
  const confirmJoin = confirm(`Do you want to join room ${roomId}?`);
  if (confirmJoin) {
    // Implement logic to start voice or video call
    // For example:
    startVoiceCall(roomId); // or startVideoCall(roomId) based on your implementation
  }
});

// Function to start a voice call
const startVoiceCall = (roomId) => {
  // Implement voice call logic here
};

// Function to start a video call
const startVideoCall = (roomId) => {
  // Implement video call logic here
};

// Other socket.io and call handling logic...
