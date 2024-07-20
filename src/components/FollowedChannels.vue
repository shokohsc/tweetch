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

const { loading, cursor, error, userId } = storeToRefs(useTwitchStore())
const { initAccessToken, getFollowedChannels } = useTwitchStore()
const route = useRoute()

const formattedTitle = computed(() => loading.value ? `Loading...` : `Followed Channels`)
const paginate = computed(() => getFollowedChannels)
const params = computed(() => {
  return {
    user_id: userId.value,
    query: route.query.query,
    after: cursor.value
  }
})

watch(
  [() => route.query.before, () => route.query.after],
  async ([before, after]) => {
    await initAccessToken()
    await getFollowedChannels({user_id: userId.value, before, after})
    document.title = `Tweetch - ${formattedTitle.value}`
  },
  { immediate: true }
)
</script>
