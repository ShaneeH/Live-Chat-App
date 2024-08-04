<template>
  <div>
    <!-- Show SignupForm if displayChat is false -->
    <div v-if="!displayChat">
      <SignupForm @msg="getMSG" />
      <p>Message from child: {{ msg }}</p>
    </div>
</div>
    <!-- Optionally show ChatBox when displayChat is true -->
 <div>    
    <div v-if="displayChat">
      <ChatBox />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SignupForm from '@/components/SignupForm.vue';
import ChatBox from '@/components/Chatbox.vue';
import axios from 'axios';

// Reactive data
const displayChat = ref(false);
const msg = ref('');

// Method to handle the emitted message from SignupForm
function getMSG(payload) {
  msg.value = payload;
  displayChat.value = true;
  localStorage.setItem('displayChat', 'true'); // Save state to localStorage
}

// Initialize state from localStorage on component mount
onMounted(() => {
  const storedState = localStorage.getItem('displayChat');
  displayChat.value = storedState === 'true'; // Set state based on localStorage
});

const url = 'http://localhost:3000/hello'; // Added http://

axios.get(url)
  .then(response => {
    console.log(response.data); // Access the data from the response
  })
  .catch(error => {
    console.error(error);
  });

</script>
