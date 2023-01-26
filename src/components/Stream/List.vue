<template>
    <div class="columns is-justify-content-center is-multiline">
      <Cover :cover="cover" v-for="(cover, index) in covers" :key="index" />
    </div>
</template>

<script setup>
  import { computed } from 'vue'
  import Cover from './Cover.vue'

  import { storeToRefs } from 'pinia'
  import { useTwitchStore } from '../../stores/twitch'

  const { streams } = storeToRefs(useTwitchStore())

  const covers = computed(() => {
    const results = []
    streams.value.map(stream => {
      results.push(stream)
    })
    return results
  })
</script>
