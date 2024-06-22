<template>
  <div v-if="!loading" class="container fluid pt-6">
    <h1 class="title has-text-centered has-text-white">
      {{ video.title }}
    </h1>
    <h2 class="subtitle has-text-centered has-text-white">
      <router-link :to="video.streamRoute">{{ video.user }}</router-link><small> streamed on the {{ formattedDate }}</small>
      <br/>
      <small><router-link :to="video.videosRoute">past broadcasts</router-link></small>
    </h2>
    <div class="box">
      <div>
        <iframe
          allowfullscreen="true"
          :src="source">
        </iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'

import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTwitchStore } from '../stores/twitch'

const { loading, error, videos } = storeToRefs(useTwitchStore())
const { initAccessToken, getVideos } = useTwitchStore()
const route = useRoute()

const video = computed(() => {
  return {
    title: videos.value[0].title || '',
    user: videos.value[0].login || '',
    streamRoute: videos.value[0].streamRoute || '',
    videosRoute: { name: 'Videos', query: { user_id: videos.value[0].loginId } }
  }
})
const source = computed(() => '//player.twitch.tv/?video=v'+(videos.value[0].id || '')+`&parent=${window.location.host}`)
const formattedDate = computed(() => dayjs(videos.value[0].createdAt).format('MMM DD, YYYY'))

watch(
  () => route.params.video,
  async () => {
    await initAccessToken()
    await getVideos({id: route.params.video})
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