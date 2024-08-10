<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import 'virtual:fonts.css'
</script>

<style>
html {
  background-color: #23232e;
  height: 100%
}
body {
  font-family: "Code New Roman";
}
body::-webkit-scrollbar {
  display: none;
}

@keyframes flash {
  0% { background-color: initial; }
  50% { background-color: #0a0a0a; } /* Change this to the color you want for the flash */
  100% { background-color: initial; }
}
.flash-animation {
  animation: flash 1s;
}
</style>
