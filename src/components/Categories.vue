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
const { initAccessToken, getCategories } = useTwitchStore()
const route = useRoute()

const formattedTitle = computed(() => {
  return `Categories`
})
const previousRoute = computed(() => {
  return {
    name: 'Categories',
    query: { before: cursor.value, query: route.query.query }
  }
})
const nextRoute = computed(() => {
  return {
    name: 'Categories',
    query: { after: cursor.value, query: route.query.query }
  }
})

watch(
  [() => route.query.query, () => route.query.after],
  async ([query, after]) => {
    await initAccessToken()
    await getCategories({query, after, type_only: true})
    document.title = `Tweetch - ${formattedTitle.value}`
  },
  { immediate: true}
)
</script>
