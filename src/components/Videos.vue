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
import List from './Video/List.vue'
import Pagination from './Pagination.vue'

import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTwitchStore } from '../stores/twitch'

const { loading, cursor } = storeToRefs(useTwitchStore())
const { initAccessToken, getVideos } = useTwitchStore()
const route = useRoute()

const formattedTitle = computed(() => loading.value ? `Loading...` : `Videos`)
const paginate = computed(() => getVideos)
const params = computed(() => {
  return {
    user_id: route.query.user_id,
    game_id: route.query.game_id,
    type: 'archive',
    after: cursor.value
  }
})

watch(
  [() => route.query.user_id, () => route.query.game_id, () => route.query.after],
  async ([user_id, game_id, after]) => {
    await initAccessToken()
    await getVideos({user_id, game_id, after, type: 'archive'})
    document.title = `Tweetch - ${formattedTitle.value}`
  },
  { immediate: true }
)
</script>
