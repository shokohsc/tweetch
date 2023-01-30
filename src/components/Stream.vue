<template>
  <div v-if="!loading" class="container fluid pt-6">
    <h1 class="title has-text-centered has-text-white">{{ stream.title }}</h1>
    <h2 class="subtitle has-text-centered has-text-white">{{ stream.user }}<small> plays <router-link :to="stream.categoryRoute">{{ stream.category }}</router-link> for {{ stream.viewers }} viewers / {{ stream.lang }}</small></h2>
      <div class="box has-text-centered is-black">
        <iframe
          height="720px"
          width="1280px"
          allowfullscreen="true"
          :src="source">
        </iframe>
      </div>
      <div v-if="authenticated" class="box has-text-centered is-black">
        <iframe
          height="720px"
          width="1280px"
          :src="chat">
        </iframe>
      </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTwitchStore } from '../stores/twitch'

const { loading, error, streams, authenticated } = storeToRefs(useTwitchStore())
const { initAccessToken, getStreams } = useTwitchStore()
const route = useRoute()

const stream = computed(() => {
  return {
    title: streams.value[0].title || '',
    user: streams.value[0].login || '',
    lang: streams.value[0].language || '',
    category: streams.value[0].category || '',
    categoryRoute: streams.value[0].categoryRoute || '',
    viewers: streams.value[0].viewers || 0
  }
})
const source = computed(() => {
  return '//player.twitch.tv/?channel='+(streams.value[0].login || '')+`&parent=${window.location.host}`
})
const chat = computed(() => {
  return '//www.twitch.tv/embed/'+(streams.value[0].login || '')+`/chat?parent=${window.location.host}`
})

watch(
  () => route.params.stream,
  async () => {
    await initAccessToken()
    await getStreams({user_login: route.params.stream, type: 'live'})
  },
  { immediate: true }
)
</script>

<style scoped>
.box {
  width: 1320px;
  height: 760px;
  background-color: #0a0a0a !important;
}
</style>
