<template>
  <div class="column is-narrow">
    <div class="box has-background-black">
      <router-link class="is-hidden-touch" :to="cover.streamRoute">
        <div class="block">
          <figure class="image cover">
            <img :src="thumbnail" :title="cover.title" loading="lazy" class="cover" />
          </figure>
        </div>
      </router-link>
      <a class="is-hidden-desktop" :href="deepLink">
        <div class="block">
          <figure class="image cover">
            <img :src="thumbnail" :title="cover.title" loading="lazy" class="cover" />
          </figure>
        </div>
      </a>
      <p class="has-text-white has-text-centered">
        {{ cover.login }}
      </p>
      <p class="has-text-white has-text-centered" v-if="cover.category">
        <router-link :to="cover.categoryRoute">{{ cover.category }}</router-link>
      </p>
      <p class="has-text-white has-text-centered">{{ cover.viewers }} viewer(s) / {{ cover.language }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  cover: Object
})

const deepLink = computed(() => {
  return `twitch://open?stream=${props.cover.login}`
})
const thumbnail = computed(() => {
  return props.cover.thumbnail.replace('{width}', '320').replace('{height}', '180')
})
</script>

<style scoped>
img.cover {
  width: 328px;
  height: 188px;
  margin: 0 auto;
}

figure.cover img {
  padding: 4px;
  background-color: #0a0a0a;
  border: 1px solid #0a0a0a;
  border-radius: 4px;
  -webkit-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
figure.cover img:hover {
  background: #EB2025;
}
</style>
