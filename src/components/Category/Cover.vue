<template>
  <div class="column is-narrow flash-animation">
    <div class="box has-background-black">
      <router-link class="is-hidden-touch" :to="cover.categoryRoute">
        <figure class="image cover">
          <img :src="thumbnail" :title="cover.category" alt="" loading="lazy" />
        </figure>
      </router-link>
      <a class="is-hidden-desktop" :href="deepLink">
        <figure class="image cover">
          <img :src="thumbnail" :title="cover.category" alt="" loading="lazy" />
        </figure>
      </a>
      <p class="cover has-text-white has-text-centered">
        {{ cover.category }}
      </p>
      <p class="cover has-text-white has-text-centered">
        <router-link :to="cover.videosRoute">Past broadcasts</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  cover: Object
})

const deepLink = computed(() => `twitch://open?game=${props.cover.category}`)
const thumbnail = computed(() => `https://static-cdn.jtvnw.net/ttv-boxart/${props.cover.categoryId}-285x380.jpg`)
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