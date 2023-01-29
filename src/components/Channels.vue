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
import List from './Channel/List.vue'
import Pagination from './Pagination.vue'

import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTwitchStore } from '../stores/twitch'

const { cursor, error } = storeToRefs(useTwitchStore())
const { initAccessToken, getChannels } = useTwitchStore()
const route = useRoute()

const formattedTitle = computed(() => {
  return `Channels`
})
const previousRoute = computed(() => {
  return {
    name: 'Channels',
    query: { before: cursor.value, query: route.query.query }
  }
})
const nextRoute = computed(() => {
  return {
    name: 'Channels',
    query: { after: cursor.value, query: route.query.query }
  }
})

watch(
  [() => route.query.query, () => route.query.after],
  async ([query, after]) => {
    await initAccessToken()
    await getChannels({query, after, live_only: true})
    document.title = `Tweetch - ${formattedTitle.value}`
  },
  { immediate: true}
)
</script>
