<template>
  <div class="columns is-justify-content-center is-multiline">
    <div class="column is-narrow">
      <nav class="pagination" role="navigation" aria-label="pagination">
        <router-link :class="previousClass" :to="previousRoute">
          Previous
        </router-link>
        <router-link :class="nextClass" :to="nextRoute">
          Next page
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script setup>
import List from './Stream/List.vue'

import { computed, watch, /*onMounted, onUnmounted,*/ defineProps } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTwitchStore } from '../stores/twitch'

const props = defineProps({
  nextRoute: Object,
  previousRoute: Object
})

const { loading, cursor } = storeToRefs(useTwitchStore())
const route = useRoute()

const previousClass = computed(() => {
  const routeCursor = route.query.before || route.query.after || undefined
  const isDisabled = (undefined === routeCursor || cursor.value === routeCursor) ? 'is-disabled': ''
  return `has-text-white pagination-previous ${isDisabled}`
})
const nextClass = computed(() => {
  const isDisabled = '' === cursor.value ? 'is-disabled': ''
  return `has-text-white pagination-next ${isDisabled}`
})

// const handleScroll = async () => {
//   if ((window.scrollY >= (document.body.offsetHeight - window.outerHeight)) && !loading.value) {
//     await initAccessToken()
//     await props.paginate(props.params)
//   }
// }
// onMounted(() => {
//   window.addEventListener('scroll', handleScroll)
// })
// onUnmounted(() => {
//   window.removeEventListener('scroll', handleScroll);
// })
</script>

<style scoped>
a.is-disabled {
   pointer-events: none;
   cursor: default;
}
</style>
