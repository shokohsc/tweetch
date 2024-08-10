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
import List from './Stream/List.vue'
import Pagination from './Pagination.vue'

import { computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTwitchStore } from '../stores/twitch'

const { loading, cursor } = storeToRefs(useTwitchStore())
const { initAccessToken, getStreams } = useTwitchStore()
const route = useRoute()

const formattedTitle = computed(() => loading.value ? `Loading...` : `Home`)
const paginate = computed(() => getStreams)
const params = computed(() => {
  return {
    after: cursor.value,
    type: 'live'
  }
})

watch(
  [() => route.query.before, () => route.query.after],
  async ([before, after]) => {
    await initAccessToken()
    await getStreams({before, after, type: 'live'})
    document.title = `Tweetch - ${formattedTitle.value}`
  },
  { immediate: true }
)

onMounted(() => {
  document.addEventListener("refreshStreams", async (e) => {
    await getStreams({before: route.query.before, after: route.query.after, type: 'live'})
  })
})
onUnmounted(() => {
  document.removeEventListener("refreshStreams", () => {})
})
</script>
