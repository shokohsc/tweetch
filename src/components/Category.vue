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

import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTwitchStore } from '../stores/twitch'

const { loading, cursor, error } = storeToRefs(useTwitchStore())
const { initAccessToken, getStreams } = useTwitchStore()
const route = useRoute()

const formattedTitle = computed(() => loading.value ? `Loading...` : `Streams`)
const paginate = computed(() => getStreams)
const params = computed(() => {
  return {
    game_id: route.params.category,
    after: cursor.value,
    type: 'live'
  }
})

watch(
  [() => route.query.before, () => route.query.after, () => route.params.category],
  async ([before, after, category]) => {
    await initAccessToken()
    await getStreams({before, after, game_id: category, type: 'live'})
    document.title = `Tweetch - ${formattedTitle.value}`
  },
  { immediate: true }
)
</script>
