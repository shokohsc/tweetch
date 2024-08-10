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

const { loading, cursor, userId } = storeToRefs(useTwitchStore())
const { initAccessToken, getFollowedStreams } = useTwitchStore()
const route = useRoute()

const formattedTitle = computed(() => loading.value ? `Loading...` : `Followed Streams`)
const paginate = computed(() => getFollowedStreams)
const params = computed(() => {
  return {
    user_id: userId.value,
    after: cursor.value,
    type: 'live'
  }
})

watch(
  [() => route.query.before, () => route.query.after],
  async ([before, after]) => {
    await initAccessToken()
    await getFollowedStreams({user_id: userId.value, before, after, type: 'live'})
    document.title = `Tweetch - ${formattedTitle.value}`
  },
  { immediate: true }
)

onMounted(() => {
  document.addEventListener("refreshFollowedStreams", async (e) => {
    await getFollowedStreams({user_id: userId.value, before: route.query.before, after: route.query.after, type: 'live'})
  })
})
onUnmounted(() => {
  document.removeEventListener("refreshFollowedStreams", () => {})
})
</script>
