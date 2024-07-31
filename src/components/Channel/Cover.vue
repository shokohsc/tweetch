<template>
  <div class="column is-narrow">
    <div class="box has-background-black">
      <router-link class="is-hidden-touch" :to="cover.streamRoute">
        <figure class="image cover">
          <img :src="thumbnail" :title="cover.title" alt="" loading="lazy" />
        </figure>
      </router-link>
      <a class="is-hidden-desktop" :href="deepLink">
        <figure class="image cover">
          <img :src="thumbnail" :title="cover.title" alt="" loading="lazy" />
        </figure>
      </a>
      <p class="cover has-text-white has-text-centered">
        {{ cover.login }}
      </p>
      <p v-if="isStreaming" class="cover has-text-white has-text-centered">
        <router-link :to="cover.categoryRoute">{{ cover.game }}</router-link>
      </p>
      <p class="cover has-text-white has-text-centered">
        <router-link :to="cover.videosRoute">Past broadcasts</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import defaultCover from '../../assets/images/default_channel_avatar.png'
import { computed } from 'vue'

const props = defineProps({
  cover: Object
})

const deepLink = computed(() => `twitch://open?stream=${props.cover.login}`)
const isStreaming = computed(() => props.cover.gameId && "" !== props.cover.gameId)
const thumbnail = computed(() => props.cover.thumbnail ? props.cover.thumbnail : defaultCover)
</script>

<style scoped lang="less">
p.cover {
  margin: 0 auto;
  width: fit-content;
}
figure.cover {
  margin: 0 auto;
  width: fit-content;
  height: auto;
  img {
    padding: 4px;
    background-color: #0a0a0a;
    border: 1px solid #0a0a0a;
    border-radius: 4px;
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    &:hover {
      background: #EB2025;
    }
  }
}
</style>