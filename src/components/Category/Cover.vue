<template>
  <div class="column is-narrow">
    <div class="box has-background-black">
      <router-link :to="cover.categoryRoute">
        <div class="block">
          <figure class="image cover">
            <img :src="thumbnail" :title="cover.category" alt="" loading="lazy" />
          </figure>
        </div>
      </router-link>
      <p class="cover has-text-white has-text-centered">
        {{ cover.category }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  cover: Object
})

const thumbnail = computed(() => {
  return `https://static-cdn.jtvnw.net/ttv-boxart/${props.cover.categoryId}-285x380.jpg`
})
</script>

<style scoped lang="less">
p.cover {
  max-width: 11.375rem;
  margin: 0 auto;
}
figure.cover {
  width: 11.375rem;
  height: 14.938rem;
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