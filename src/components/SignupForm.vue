<template>

  <div>

    <!-- Form to collect user data -->
    <form v-if="showForm == true" @submit.prevent="saveData">
      <h3>Welcome to GoChat!</h3>
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="formData.name" required />
      </div>
      <div>
        <label for="age">Age:</label>
        <input type="number" id="age" v-model="formData.age" required />
      </div>
      <button type="submit">Begin Chatting</button>
    </form>


  </div>

  <button @click="id">gen id</button>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import Chatbox from './Chatbox.vue';
import { localStorageStore } from '@/store/localstorage.js';
import { generateUniqueId } from '@/store/id_gen.js';

const id = () => {
  console.log("ll");
}

const showForm = ref(true);
const profile = ref({});
const emit = defineEmits(['msg']);

const formData = ref({
  name: '',
  age: null,
});
function saveData() {
  const id = generateUniqueId();
  console.log(id);
  localStorageStore.setName(formData.value.name);
  localStorageStore.setAge(formData.value.age);
  localStorageStore.setID(id);

  emit('msg', 'true');

}



</script>