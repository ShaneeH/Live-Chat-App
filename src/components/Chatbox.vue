<template>
    <head>
        <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-exp.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css" />
    </head>
    
    <h3>Hi {{ name }} </h3>
    {{ timeString }}
    <br />

    <!--Channel Selector-->
    <div class="form-group">
        <select class="form-select" style="max-width: 300px; width: 100%;" v-model="selectedOption">
            <option value="" disabled selected>Pick a Channel</option>
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
                    <div class="panel-header">
                        <div class="panel-title h6">Welcome to {{ selectedOption }}</div>
                        <p>people online : {{ activeUsers }}</p>
                    </div>
                    <div class="panel-body chat-scrollable">
                        <div class="tile" v-for="msg in msgs" :key="msg.id">
                            <div class="tile-icon">
                                <figure class="avatar" v-bind:data-initial="msg.name"></figure>
                            </div>
                            <div class="tile-content">
                                <p class="tile-title text-bold">
                                    {{ msg.name }} @ {{ msg.time}}
                                </p>
                                <p class="tile-subtitle">{{ msg.msg }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer">
                        <div class="input-group">
                            <input class="form-input" v-model="txt" type="text" placeholder="Type Message Here :" @keydown.enter="sendMessageWrapper" @input="typing" />
                            <button class="btn btn-primary input-group-btn" @click="sendMessageWrapper">
                                Send
                            </button>
                            <br />
                        </div>
                        <div style="color: #ff6f6f; font-weight: 400; font-family: 'Roboto Mono', monospace;"> {{
                            showError }} </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br /><br />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { localStorageStore } from '@/store/localstorage.js';
import { sendMessage, socketConnect, getSocket, getMsgs } from '@/store/socket_functions.js'; // Correct import

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

    socketConnect(SERVER_URL, 
        (msg) => {
            console.log('Message received:', msg);
            msgs.value.push(msg);
        },
        (data) => {
            console.log('active users', data);
            activeUsers.value = data;
        }
    );
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

const sendMessageWrapper = () => {
    sendMessage(id, name, age, txt, showError);
};
</script>

<style scoped> @import './../assets/chatbox_style.css'; </style>
