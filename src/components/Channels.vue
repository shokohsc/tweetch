<template>
  <section class="section">
    <h1 class="title has-text-light has-text-centered">{{ formattedTitle }}</h1>
    <section>
      <List />
      <Pagination :paginate="paginate" :params="params"/>
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

const { loading, cursor, error } = storeToRefs(useTwitchStore())
const { initAccessToken, getChannels } = useTwitchStore()
const route = useRoute()

const formattedTitle = computed(() => loading.value ? `Loading...` : `Channels`)
const paginate = computed(() => getChannels)
const params = computed(() => {
  return {
    query: route.query.query,
    after: cursor.value,
    live_only: false
  }
})

watch(
  [() => route.query.query, () => route.query.after],
  async ([query, after]) => {
    await initAccessToken()
    await getChannels({query, after, live_only: false})
    document.title = `Tweetch - ${formattedTitle.value}`
  },
  { immediate: true }
)
</script>
