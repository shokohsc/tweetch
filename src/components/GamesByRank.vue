<template>
  <h1 class="title has-text-light has-text-centered">Top Games</h1>

  <section >
    <div class="columns is-justify-content-center is-multiline">
      <List />
      <nav class="pagination" role="navigation" aria-label="pagination">
        <router-link :class="previousClass" :to="previous">
          Previous
        </router-link>
        <router-link :class="nextClass" :to="next">
          Next page
        </router-link>
      </nav>
    </div>
  </section>
</template>

<script setup>
import List from './Category/List.vue'

import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTwitchStore } from '../stores/twitch'

const { loading, error, cursor } = storeToRefs(useTwitchStore())
const { initAccessToken, getTopGames } = useTwitchStore()
const route = useRoute()

const previousClass = computed(() => {
  const routeCursor = route.query.before || route.query.after || undefined
  const isDisabled = (undefined === routeCursor || cursor.value === routeCursor) ? 'is-disabled': ''
  return `has-text-white pagination-previous ${isDisabled}`
})
const previous = computed(() => {
  return {
    name: 'TopGames',
    query: { before: cursor.value }
  }
})
const nextClass = computed(() => {
  const isDisabled = '' === cursor.value ? 'is-disabled': ''
  return `has-text-white pagination-next ${isDisabled}`
})
const next = computed(() => {
  return {
    name: 'TopGames',
    query: { after: cursor.value }
  }
})

watch(
  [() => route.query.before, () => route.query.after],
  async ([before, after]) => {
    await initAccessToken()
    await getTopGames({before, after})
  },
  { immediate: true}
)
</script>

<style scoped>
a.is-disabled {
   pointer-events: none;
   cursor: default;
}
</style>
