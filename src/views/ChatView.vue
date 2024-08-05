<template>
  <div>
    <!-- Show SignupForm if displayChat is false -->
    <div v-if="!displayChat">
      <SignupForm @msg="getMSG" />
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



</script>
