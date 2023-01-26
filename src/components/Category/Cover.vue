<template>
  <div class="column is-narrow">
    <div class="box has-background-black">
      <router-link :to="cover.categoryRoute">
        <div class="block">
          <figure class="image cover">
            <img :src="thumbnail" :alt="cover.category" loading="lazy" class="cover" />
          </figure>
        </div>
      </router-link>
      <div class="block has-text-white has-text-centered">
        <div style="width: 172px; margin: 0 auto;">
          <p>
            <router-link :to="cover.categoryRoute">{{ cover.category }}</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  cover: Object
})

const thumbnail = computed(() => {
  return `https://static-cdn.jtvnw.net/ttv-boxart/${props.cover.categoryId}-285x380.jpg`
})
</script>

<style scoped>
img.cover {
  width: 182px;
  height: 239px;
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
