<template>

    <head>
        <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-exp.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css" />
    </head>
    {{ timeString }}


    <!-- Channel Selector -->
    <div class="form-group">
        <select class="form-select" style="max-width: 300px; width: 100%;" v-model="selectedOption">
            <option value="" disabled>Pick a Channel</option>
            <option v-for="option in options" :key="option" :value="option">
                {{ option }}
            </option>
        </select>
        <button class="btn" @click="logSelectedOption">Connect</button>
    </div>
    <br />

    <!-- Chat Room -->
    <div class="container">
        <div class="columns">
            <div class="column col-12 col-md-6 offset-md-3">
                <div class="panel">
                    <!-- Panel Header -->
                    <div class="panel-header">
                        <div class="panel-title h6">Welcome to {{ selectedOption }}</div>
                        <p>People online: {{ activeUsers }}</p>
                    </div>

                    <!-- Messages Display Area -->
                    <div class="panel-body chat-scrollable">
                        <div v-for="msg in msgs" :key="msg.id">
                            <!-- IF MESSAGE IS FROM CURRENT USER -->
                            <div class="tile current-user" v-if="msg.id === id">
                                <div class="tile-content current-user">
                                    <p class="tile-title text-bold current-user">
                                        {{ msg.name }} @ {{ msg.time }}
                                    </p>
                                    <p class="tile-subtitle">{{ msg.msg }}</p>
                                </div>
                            </div>
                            <!-- END OF CURRENT USER MESSAGE -->

                            <!-- MESSAGES RECEIVED FROM OTHER USERS -->
                            <div class="tile other-user" v-if="msg.id !== id">
                                <div class="tile-icon">
                                    <figure class="avatar avatar-lg"><img src="https://picturepan2.github.io/spectre/img/avatar-3.png" alt="Avatar">
                                    </figure>
                                </div>
                                <div class="tile-content other-user">
                                    <p class="tile-title text-bold other-user">
                                        {{ msg.name }} @@ {{ msg.time }}
                                    </p>
                                    <p class="tile-subtitle">{{ msg.msg }}</p>
                                </div>
                            </div>
                            <!-- END OF MESSAGES RECEIVED FROM OTHER USERS -->
                        </div>
                    </div>
                    <!-- End of Messages Display Area -->

                    <!-- Panel Footer (Text Input Area) -->
                    <div class="panel-footer">
                        <div class="input-group">
                            <input class="form-input" v-model="txt" type="text" placeholder="Type Message Here :"
                                style="font-weight: 400; font-family: 'Roboto Mono', monospace;"
                                @keydown.enter="sendMessageWrapper" @input="typing" />
                            <button class="btn btn-primary input-group-btn" @click="sendMessageWrapper">
                                Send
                            </button>
                        </div>
                        <div style="color: #ff6f6f; font-weight: 400; font-family: 'Roboto Mono', monospace;">
                            {{ showError }}
                        </div>
                    </div>
                    <!-- End of Panel Footer -->
                </div>
            </div>
        </div>
    </div>
    <br /><br />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { localStorageStore } from '@/store/localstorage.js';
import { sendMessage, socketConnect, getSocket, getMsgs, test } from '@/store/socket_functions.js';

const SERVER_URL = 'http://localhost:3000';
const socket = getSocket(); // Get the socket reference
const msgs = getMsgs(); // Get the msgs reference
const txt = ref(''); // Initialize as a ref with an empty string
const showError = ref('');
const activeUsers = ref('');

const name = localStorageStore.getName() || '';
const id = localStorageStore.getID();
const age = 45; // Example age, you can adjust as needed

const timeString = ref('');
const updateTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeString.value = `${hours}:${minutes}`;
};

onMounted(() => {
    updateTime();
    setInterval(updateTime, 30000 / 4);

    // Check if socket is not already connected before establishing a new connection
    if (!socket.value || !socket.value.connected) {
        socketConnect(SERVER_URL, (msg) => {
            console.log('Message received:', msg);
            msgs.value.push(msg);
        },
            (data) => {
                console.log('active users', data);
                test();
                activeUsers.value = data;
            });
    }
});

onUnmounted(() => {
    // Cleanup socket connection on component unmount if needed
    if (socket.value) {
        socket.value.off(); // Remove all listeners
        socket.value.disconnect(); // Optionally disconnect
    }
});

const options = ['Channel 1', 'Channel 2', 'Channel 3'];
const selectedOption = ref('');

const logSelectedOption = () => {
    console.log(selectedOption.value);
};

const typing = () => {
    if (socket.value) {
        socket.value.emit('channel1_typing', localStorageStore.name);
    }
};

// Wrapper to prevent potential duplicate sends
const sendMessageWrapper = () => {
    if (txt.value.trim() !== '') {
        sendMessage(id, name, age, txt, showError); // Function from the socket_functions.js file
        txt.value = ''; // Clear the text input after sending
    } else {
        showError.value = 'Please enter a message!';
    }
    console.log("SENT MESSAGE");
};
</script>


<style scoped>
@import './../assets/chatbox_style.css';
</style>
