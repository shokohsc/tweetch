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
</style>
