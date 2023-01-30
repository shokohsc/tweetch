<template>
  <button id="scrollTop" class="button is-hidden">
    <span @click="scrollTop" class="icon">
      <i class="fas fa-arrow-up"></i>
    </span>
  </button>
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
    const $target = document.getElementById('scrollTop')
    $target.classList.remove('is-hidden')
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
  button.button {
    position: fixed;
    opacity: 60%;
    right: 10%;
    bottom: 10%;
    z-index: 100;
  }
</style>
