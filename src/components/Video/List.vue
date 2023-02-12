<template>
    <div class="columns is-justify-content-center is-multiline">
      <Cover :cover="cover" v-for="(cover, index) in videos" :key="index" />
    </div>
</template>

<script setup>
  import Cover from './Cover.vue'

  import { storeToRefs } from 'pinia'
  import { useTwitchStore } from '../../stores/twitch'

  const { videos } = storeToRefs(useTwitchStore())
</script>
