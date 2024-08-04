<template>
  <nav>
    <router-link to="/">Chat</router-link> |
    <router-link to="/profile">Profile</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  font-size: 22px;;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #c05b30;
  font-size: 25px;
  font-weight: 600;
}
</style>
