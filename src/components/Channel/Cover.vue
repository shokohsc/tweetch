<template>
  <div class="column is-narrow">
    <div class="box has-background-black">
      <router-link :to="cover.streamRoute">
        <div class="block">
          <figure class="image cover">
            <img :src="thumbnail" :title="cover.title" loading="lazy" class="cover" />
          </figure>
        </div>
      </router-link>
      <p class="cover has-text-white has-text-centered">
        {{ cover.login }}
      </p>
      <p v-if="isStreaming" class="cover has-text-white has-text-centered">
        <router-link :to="cover.categoryRoute">{{ cover.game }}</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  cover: Object
})

const isStreaming = computed(() => {
  return "" !== props.cover.gameId
})

const thumbnail = computed(() => {
  return props.cover.thumbnail
})
</script>

<style scoped>
p.cover {
  width: 308px;
  margin: 0 auto;
}
img.cover {
  width: 308px;
  height: 308px;
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
