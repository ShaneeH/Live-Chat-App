// src/store/socket_functions.js
import { io } from 'socket.io-client';
import { ref } from 'vue';

// Define socket and refs
const socket = ref(null);
const msgs = ref([]);

export const socketConnect = (SERVER_URL, onMessageReceived, onUserCountUpdate) => {
    try {
        socket.value = io(SERVER_URL);

        socket.value.on('channel1', (msg) => {
            console.log('Message received:', msg);
            if (onMessageReceived) onMessageReceived(msg);
        });

        socket.value.on('userCount', (data) => {
            console.log('active users', data);
            if (onUserCountUpdate) onUserCountUpdate(data);
        });
    } catch (error) {
        console.error('Error connecting to socket:', error);
    }
};

export const getSocket = () => socket;
export const getMsgs = () => msgs;

export const sendMessage = (id, name, age, user_input, showError) => {
    const socketInstance = socket.value;

    if (!user_input || typeof user_input.value !== 'string' || user_input.value.trim() === '') {
        showError.value = 'Please enter a message!';
        console.log('Please enter a message!');
        return;
    }

    const data = {
        id: id,
        name: name || 'Anonymous',
        age: age,
        msg: user_input.value,
    };

    try {
        if (socketInstance) {
            socketInstance.emit('channel1', data);
            console.log('Message sent:', data);
            user_input.value = '';  // Clear the input field after sending
            showError.value = '';   // Clear any previous error message
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
};
