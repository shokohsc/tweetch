<template>
  <section class="section">
    <h1 class="title has-text-light has-text-centered">{{ formattedTitle }}</h1>
    <section>
      <List />
      <Pagination :nextRoute="nextRoute" :previousRoute="previousRoute"/>
    </section>
  </section>
</template>

<script setup>
import List from './Category/List.vue'
import Pagination from './Pagination.vue'

import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTwitchStore } from '../stores/twitch'

const { cursor, error } = storeToRefs(useTwitchStore())
const { initAccessToken, getFollowedGames } = useTwitchStore()
const route = useRoute()

const formattedTitle = computed(() => {
  return `Followed Games`
})
const previousRoute = computed(() => {
  return {
    name: 'FollowedGames',
    query: { before: cursor.value }
  }
})
const nextRoute = computed(() => {
  return {
    name: 'FollowedGames',
    query: { after: cursor.value }
  }
})

watch(
  [() => route.query.before, () => route.query.after],
  async ([before, after]) => {
    await initAccessToken()
    await getFollowedGames({before, after})
    document.title = `Tweetch - ${formattedTitle.value}`
  },
  { immediate: true}
)
</script>
