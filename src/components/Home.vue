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
import List from './Stream/List.vue'
import Pagination from './Pagination.vue'

import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTwitchStore } from '../stores/twitch'

const { loading, cursor, error } = storeToRefs(useTwitchStore())
const { initAccessToken, getStreams } = useTwitchStore()
const route = useRoute()

const formattedTitle = computed(() => {
  return loading.value ? `Loading...` : `Home`
})
const previousRoute = computed(() => {
  return {
    name: 'Home',
    query: { before: cursor.value }
  }
})
const nextRoute = computed(() => {
  return {
    name: 'Home',
    query: { after: cursor.value }
  }
})

watch(
  [() => route.query.before, () => route.query.after],
  async ([before, after]) => {
    await initAccessToken()
    await getStreams({before, after, type: 'live'})
    document.title = `Tweetch - ${formattedTitle.value}`
  },
  { immediate: true}
)
</script>
