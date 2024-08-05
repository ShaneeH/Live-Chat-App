<template>


  <div class="container grid-lg">
    <h3 class="text-center my-2">Welcome to GoChat {{formData.name}}</h3>
    <!-- Stepper Navigation -->
    <ul class="step">
      <li class="step-item" :class="{ active: step === 1, completed: step > 1 }">
        <a href="#" @click.prevent="setStep(1)">Step 1</a>
      </li>
      <li class="step-item" :class="{ active: step === 2, completed: step > 2 }">
        <a href="#" @click.prevent="setStep(2)">Step 2</a>
      </li>
      <li class="step-item" :class="{ active: step === 3, completed: step > 3 }">
        <a href="#" @click.prevent="setStep(3)">Step 3</a>
      </li>
    </ul>

    <!-- Username Input -->
    <form v-if="step === 1" @submit.prevent="nextStep" class="form-horizontal mx-auto my-2">
      <div class="form-group">
        <label for="name" class="form-label">Username:</label>
        <input
          type="text"
          id="name"
          v-model="formData.name"
          class="form-input"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Next</button>
    </form>

    <!-- Age Input -->
    <form v-if="step === 2" @submit.prevent="nextStep" class="form-horizontal mx-auto my-2">
      <div class="form-group">
        <label for="age" class="form-label">Age:</label>
        <input
          type="number"
          id="age"
          v-model="formData.age"
          class="form-input"
           style="max-width: 400px"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Next</button>
    </form>

    <!-- Avatar Selection -->
    <form v-if="step === 3" @submit.prevent="saveData" class="form-horizontal mx-auto my-2">
      <div class="form-group">
        <label class="form-label">Choose Avatar:</label>
        <div class="form-radio">
          <div
            v-for="(avatar, index) in avatars"
            :key="index"
            class="form-radio form-inline"
          >
            <label>
              <input
                type="radio"
                name="avatar"
                :value="avatar.src"
                v-model="formData.avatar"
                :id="'avatar-' + index"
              />
              <i class="form-icon"></i>
              <figure class="avatar avatar-lg">
                <img :src="avatar.src" alt="Avatar" />
              </figure>
            </label>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Begin</button>
    </form>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { localStorageStore } from "@/store/localstorage.js";
import { generateUniqueId } from "@/store/id_gen.js";

const step = ref(1);
const formData = ref({
  name: "",
  age: null,
  avatar: ""
});
const emit = defineEmits(["msg"]);

const avatars = ref([
  { src: 'https://picturepan2.github.io/spectre/img/avatar-2.png' },
  { src: 'https://picturepan2.github.io/spectre/img/avatar-3.png' },
  { src: 'https://picturepan2.github.io/spectre/img/avatar-4.png' },
  { src: 'https://picturepan2.github.io/spectre/img/avatar-5.png' },
  { src: 'https://picturepan2.github.io/spectre/img/avatar-1.png' }
]);

function setStep(newStep) {
  step.value = newStep;
}

function nextStep() {
  if (step.value === 1 && formData.value.name) {
    step.value++;
  } else if (step.value === 2 && formData.value.age) {
    step.value++;
  }
}

function saveData() {
  const id = generateUniqueId();
  localStorageStore.setName(formData.value.name);
  localStorageStore.setAge(formData.value.age);
  localStorageStore.setID(id);
  localStorageStore.setDateJoined();
  localStorageStore.setAvatar(formData.value.avatar);
  emit("msg", "true");
}
</script>
