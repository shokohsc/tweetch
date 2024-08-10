<template>
  <div class="column is-narrow flash-animation">
    <div class="box has-background-black">
      <router-link class="is-hidden-touch" :to="cover.videoRoute">
        <figure class="image">
          <img :src="thumbnail" :title="cover.title" loading="lazy" />
        </figure>
      </router-link>
      <a class="is-hidden-desktop" :href="deepLink">
        <figure class="image">
          <img :src="thumbnail" :title="cover.title" loading="lazy" />
        </figure>
      </a>
      <p class="cover has-text-white has-text-centered">
        <router-link class="is-hidden-touch" :to="cover.streamRoute">
          {{ cover.login }}
        </router-link>
        <a class="is-hidden-desktop" :href="streamDeepLink">
          {{ cover.login }}
        </a>
      </p>
      <p class="cover has-text-white has-text-centered">{{ cover.duration }} on the {{ formattedDate }}</p>
      <p class="cover has-text-white has-text-centered">{{ cover.views }} views / {{ cover.language }}</p>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { computed } from 'vue'

const props = defineProps({
  cover: Object
})

const deepLink = computed(() => `twitch://open?video=${props.cover.id}`)
const streamDeepLink = computed(() => `twitch://open?stream=${props.cover.login}`)
const thumbnail = computed(() => props.cover.thumbnail.replace('%{width}', '320').replace('%{height}', '180'))
const formattedDate = computed(() => dayjs(props.cover.createdAt).format('MMM DD, YYYY'))
</script>

<style scoped lang="less">
p.cover {
  margin: 0 auto;
  width: fit-content;
}
figure {
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