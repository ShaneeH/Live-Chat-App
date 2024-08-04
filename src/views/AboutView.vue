<template>
  <div>
    <input type="text" v-model="message" @keyup.enter="sendMessage" />
    <button @click="sendMessage">Send</button>
  </div>

  <div v-for="(message, index) in messages" :key="index">
    {{ message }}
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';
let messages = ref(['hey', 'gay']);
const message = ref('');
const socket = ref(null);
const SERVER_URL = 'http://localhost:3000'; // Make sure this matches your backend server URL

onMounted(() => {
  try {
    socket.value = io(SERVER_URL);

    // Handle incoming messages
    socket.value.on('channel1', (msg) => {
      console.log('Message received:', msg);
      console.log(msg.name);
      messages.value.push(msg);

    });

  } catch (error) {
    console.error('Error connecting to socket:', error);
  }
});

const sendMessage = () => {
  if (message.value.trim() === '') return;

  socket.value.emit('channel1', message.value);
  message.value = '';
};
</script>
