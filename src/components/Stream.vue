<template>
  <div v-if="!loading" class="container fluid pt-6">
    <h1 class="title has-text-centered has-text-white">{{ stream.title }}</h1>
    <h2 class="subtitle has-text-centered has-text-white">
      {{ stream.user }}<small> streams <router-link v-if="stream.category" :to="stream.categoryRoute">{{ stream.category }}</router-link> for {{ stream.viewers }} viewers / {{ stream.lang }}</small>
    </h2>
    <div class="box">
      <div>
        <iframe
          allowfullscreen="true"
          :src="source">
        </iframe>
      </div>
    </div>
    <div v-if="authenticated" class="box has-text-centered is-black">
      <div>
        <iframe
          :src="chat">
        </iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTwitchStore } from '../stores/twitch'

const { loading, cursor, error, streams, authenticated } = storeToRefs(useTwitchStore())
const { initAccessToken, getStreams, getVideos } = useTwitchStore()
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
const source = computed(() => '//player.twitch.tv/?channel='+(streams.value[0].login || '')+`&parent=${window.location.host}`)
const chat = computed(() => '//www.twitch.tv/embed/'+(streams.value[0].login || '')+`/chat?parent=${window.location.host}`)

watch(
  () => route.params.stream,
  async () => {
    await initAccessToken()
    await getStreams({user_id: route.params.stream, type: 'live'})
    await getVideos({user_id: streams.value[0].loginId})
  },
  { immediate: true }
)
</script>

<style scoped lang="less">
div.container { 
  width: 100% !important;
  .box {
    background-color: #0a0a0a !important;
    width: 100%;
    div {
      padding-top: 56.25%;
      position: relative;
      overflow: hidden;
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
      }
    }
  }
}
</style>