<template>
  <span @click="scrollTop" class="icon has-text-white">
    <i class="fas fa-arrow-up"></i>
  </span>
</template>

<script setup>
import { onMounted, onUnmounted, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTwitchStore } from '../stores/twitch'

const props = defineProps({
  paginate: Function,
  params: Object
})

const { loading, cursor } = storeToRefs(useTwitchStore())
const { initAccessToken } = useTwitchStore()
const route = useRoute()

const scrollTop = () => {
  window.scrollTo(0, 0)
}
const handleScroll = async () => {
  if ((window.scrollY >= (document.body.offsetHeight - window.outerHeight)) && !loading.value && '' !== cursor.value) {
    await initAccessToken()
    await props.paginate(props.params, false)
  }
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
})
</script>

<style scoped>
  span.icon {
    position: fixed;
    right: 50px;
    bottom: 50px;
    z-index: 100;
  }
</style>
