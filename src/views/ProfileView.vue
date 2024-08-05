<template>

  <div class="card profile-card">
    <div class="card-image">
      <img src="https://via.placeholder.com/150" alt="Profile Image" class="img-responsive rounded">
    </div>
    <div class="card-header">
      <div class="card-title h5">Profile Section</div>
      <div class="card-subtitle text-gray">User Details</div>
    </div>
    <div class="card-body">
      <div class="profile-detail">
        <figure class="avatar avatar-lg">
          <img :src="selectedAvatar" alt="Avatar">
        </figure>
      </div>
      <div class="profile-detail">
        <strong>Username:</strong> {{ name }}
      </div>
      <div class="profile-detail">
        <strong>Age:</strong> {{ age }}
      </div>
      <div class="profile-detail">
        <strong>ID:</strong> {{ id }}
      </div>
      <div class="profile-detail">
        <strong>Date Joined:</strong> {{ joined }}
      </div>
    </div>
    <div class="card-footer">
      <button class="btn" @click="toggleEditProfile">Edit Profile</button>
      <button class="btn">View Activity</button>
      
    </div>
  </div>

  <!-- Edit Profile Section -->
  <div v-if="isEditing" class="card profile-card">
    <div class="card-header">
      <div class="card-title h5">Edit Profile</div>
    </div>
    <div class="card-body">
      <form @submit.prevent="updateProfile">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="editName" class="form-input" placeholder="Enter your name" required />
        </div>
        <div class="form-group">
          <label for="age">Age</label>
          <input type="number" id="age" v-model="editAge" class="form-input" placeholder="Enter your age" required />
        </div>

        
        <!-- Avatar Selection -->
        <div class="form-group">
          <label>Choose Avatar</label>
          <div class="form-radio">
            <div v-for="(avatar, index) in avatars" :key="index" class="form-radio form-inline">
              <label>
                <input
                  type="radio"
                  name="avatar"
                  :value="avatar.src"
                  v-model="selectedAvatar"
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

        <div class="card-footer">
          <button type="submit" class="btn">Save Changes</button>
          <button type="button" class="btn" @click="toggleEditProfile">Cancel</button>
          <button class="btn" @click="resetProfile">Delete Profile</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { localStorageStore } from '@/store/localstorage.js';
import { useRouter } from 'vue-router';

const router = useRouter();

const name = ref('');
const id = ref('');
const age = ref('');
const joined = ref('');
const selectedAvatar = ref('https://picturepan2.github.io/spectre/img/avatar-2.png'); // Default avatar

// For editing purposes
const editName = ref('');
const editAge = ref('');
const editJoined = ref('');
const isEditing = ref(false);

const avatars = ref([
  { src: 'https://picturepan2.github.io/spectre/img/avatar-2.png' },
  { src: 'https://picturepan2.github.io/spectre/img/avatar-3.png' },
  { src: 'https://picturepan2.github.io/spectre/img/avatar-4.png' },
  { src: 'https://picturepan2.github.io/spectre/img/avatar-5.png' },
  { src: 'https://picturepan2.github.io/spectre/img/avatar-1.png' }
]);

onMounted(() => {
  name.value = localStorageStore.getName();
  id.value = localStorageStore.getID();
  age.value = localStorageStore.getAge();
  joined.value = localStorageStore.getDateJoined();
  
  // Fill the edit fields with current values
  editName.value = name.value;
  editAge.value = age.value;
  editJoined.value = joined.value;
  
  // Set the selected avatar to the one saved in local storage (if exists)
  selectedAvatar.value = localStorageStore.getAvatar() || selectedAvatar.value;
});

function resetProfile() {
  console.log("Profile reset");
  localStorage.clear();
  router.push({ name: 'home' }).then(() => {
    location.reload();
  });
}

function toggleEditProfile() {
  isEditing.value = !isEditing.value;
}

function updateProfile() {
  // Update localStorage with new values
  localStorageStore.setName(editName.value);
  localStorageStore.setAge(editAge.value);
  localStorageStore.setDateJoined(editJoined.value);
  console.log(selectedAvatar.value);
  localStorageStore.setAvatar(selectedAvatar.value);

  // Update profile variables
  name.value = editName.value;
  age.value = editAge.value;
  joined.value = editJoined.value;

  // Turn off editing
  isEditing.value = false;
}
</script>

<style scoped>
@import './../assets/profile_style.css';
</style>