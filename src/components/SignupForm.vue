<template>
    <head>
    <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css" />
    <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-exp.min.css" />
    <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css" />
  </head>

  <div>

    <!-- Form to collect user data -->
    <form v-if="showForm == true" @submit.prevent="saveData">
      <h3>Welcome to GoChat!</h3>
      <div>
        <label for="name">Username:</label>
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

<form v-if="showForm == true" @submit.prevent="saveData">
<div class="container grid-lg">
    <div class="columns">
      <div class="column col-6 col-mx-auto">
        <form class="form-horizontal">

          <div class="form-group">
            <div class="col-3 col-sm-12">
              <label class="form-label" for="input-name">Username</label>
            </div>
            <div class="col-9 col-sm-12">
              <input class="form-input" type="text" id="name" v-model="formData.name" placeholder="Name" required />
            </div>
          </div>

          <div class="form-group">
            <div class="col-3 col-sm-12">
              <label class="form-label" for="input-email">Age</label>
            </div>
            <div class="col-9 col-sm-12">
    
              <input class="form-input" type="number" id="age" v-model="formData.age" required />
            </div>
          </div>

          <div class="form-group">
            <div class="col-3 col-sm-12"></div>
            <div class="col-9 col-sm-12">
              <button type="submit" class="btn btn-primary">Begin Chatting</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  
</form>

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
  console.log("btn clicked");
  const id = generateUniqueId();
  console.log(id);
  localStorageStore.setName(formData.value.name);
  localStorageStore.setAge(formData.value.age);
  localStorageStore.setID(id);
  localStorageStore.setDateJoined();
  emit('msg', 'true');

}



</script>