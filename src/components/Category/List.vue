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

  const { categories } = storeToRefs(useTwitchStore())

  const covers = computed(() => {
    const results = []
    categories.value.map(channel => {
      results.push(channel)
    })
    return results
  })
</script>
