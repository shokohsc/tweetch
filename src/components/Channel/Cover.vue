<template>
  <div class="column is-narrow">
    <div class="box has-background-black">
      <router-link :to="cover.streamRoute">
        <div class="block">
          <figure class="image cover">
            <img :src="thumbnail" :title="cover.title" alt="" loading="lazy" />
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

<style scoped lang="less">
p.cover {
  max-width: 19.25rem;;
  margin: 0 auto;
}
figure.cover {
  width: 19.25rem;;
  height: 19.25rem;;
  margin: 0 auto;
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