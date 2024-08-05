<template>
  <div id="app">
    <header>
         <nav>
        <h2>chat.io</h2>
        <router-link to="/">Chat</router-link> |
        <router-link to="/profile">Profile</router-link>
      </nav>
    </header>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  position: relative;
  padding: 30px;
}

h2 {
  position: absolute;
  top: 30px; /* Adjust if needed */
  left: 30px; /* Adjust if needed */
  margin: 0;
}

nav {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

nav a {
  font-weight: bold;
  font-size: 22px;
  color: #000000;
  font-family: 'Roboto Mono', monospace;
  text-decoration: none;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #3125b1;
  font-size: 25px;
  font-weight: 600;
  font-family: 'Roboto Mono', monospace;
}
</style>
