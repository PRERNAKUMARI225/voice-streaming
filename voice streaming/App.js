import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import io from 'socket.io-client'; // Import Socket.IO client library

// Replace 'YOUR_SERVER_IP' with your server IP
const socket = io('http://192.168.29.149:3001');

const App = () => {
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    socket.on('join-room', (roomId) => {
      // Handle join room request here
      // For emulator, automatically accept and start voice or video call
      // For browser, prompt the user for confirmation
      const isEmulator = Platform.OS === 'android' && !Constants.isDevice;
      if (isEmulator) {
        startVoiceCall(); // or startVideoCall() based on your implementation
      } else {
        const confirmJoin = confirm(`Do you want to join room ${roomId}?`);
        if (confirmJoin) {
          startVoiceCall(); // or startVideoCall() based on your implementation
        }
      }
    });
  }, []);

  const joinRoom = () => {
    socket.emit('join-room', roomId);
  };

  // Function to start voice call
  const startVoiceCall = () => {
    // Implement voice call logic here
  };

  // Function to start video call
  const startVideoCall = () => {
    // Implement video call logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Realtime Monitor</Text>
      <Text style={styles.label}>Room ID:</Text>
      <TextInput
        style={styles.input}
        value={roomId}
        onChangeText={setRoomId}
      />
      <TouchableOpacity style={styles.button} onPress={joinRoom}>
        <Text style={styles.buttonText}>Join Room</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
