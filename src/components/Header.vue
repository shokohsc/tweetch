<template>
  <nav class="navbar is-black is-fixed-top is-spaced" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">

      <router-link class="navbar-item" to="/">
        <button class="button">
          <span class="icon">
            <i class="fas fa-home"></i>
          </span>
        </button>
      </router-link>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbar" class="navbar-menu">

      <div class="navbar-start">
        <router-link class="navbar-item has-text-white" to="/">
          Tweetch
        </router-link>
        <router-link class="navbar-item has-text-white" to="/top/games">
          Top Games
        </router-link>
        <router-link class="navbar-item has-text-white" to="/about">
          About
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field">
            <div class="control">
              <div class="select">
                <select :entity="entity" @change="onEntityChange($event)">
                  <option value="Categories">Categories</option>
                  <option value="Channels">Channels</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="navbar-item">
          <div class="field">
            <div class="control">
              <input :query="query" @keyup.enter="validate($event)" @change="onQueryChange($event)" class="input has-text-black has-background-grey" type="text" placeholder="Search..." />
            </div>
          </div>
        </div>
        <div class="navbar-item">
          <div class="field">
            <div class="control">
              <button @click="validate($event)" class="button">
                <span class="icon">
                  <i class="fas fa-search"></i>
                </span>
              </button>
            </div>
          </div>
        </div>

        <router-link v-if="authenticated" class="is-hidden navbar-item has-text-white" to="/followed/games">
          My Games
        </router-link>
        <router-link v-if="authenticated" class="navbar-item has-text-white" to="/followed/streams">
          My Streams
        </router-link>
        <a v-if="!authenticated" class="navbar-item has-text-white" :href="twitchLogin">
          Login
        </a>
        <a v-if="authenticated" @click="logout($event)" class="navbar-item has-text-white">
          Logout
        </a>
      </div>

    </div>
  </nav>
</template>

<script setup>
import getEnv from '../utils/env'

import { watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useSearchStore } from '../stores/search'
import { useTwitchStore } from '../stores/twitch'

const { query, entity } = storeToRefs(useSearchStore())
const { onEntityChange, onQueryChange, validate } = useSearchStore()
const { authenticated } = storeToRefs(useTwitchStore())
const { login, logout } = useTwitchStore()
const router = useRouter()

const paramsObj = {
  client_id: getEnv('TWITCH_CLIENT_ID'),
  redirect_uri: `https://${window.location.host}/`,
  response_type: 'token',
  scope: 'user:read:follows user:read:subscriptions'
}
const searchParams = new URLSearchParams(paramsObj);
const twitchLogin = `https://id.twitch.tv/oauth2/authorize?${searchParams.toString()}`

watch(
  () => window.location.hash,
  async () => {
    const regex = RegExp('^#(?<token>access_token=.+)&(?<scope>scope=.+)&(?<type>token_type=.+)$', 'gi')
    if ('' === window.location.hash)
      return
    const { groups: { token } } = regex.exec(window.location.hash)
    if (undefined !== token) {
      await login(token.split('=')[1])
      router.replace({ path: '/' })
    }
  },
  { immediate: true}
)

onMounted(() => {
  document.addEventListener('DOMContentLoaded', () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target
        const $target = document.getElementById(target)
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active')
        $target.classList.toggle('is-active')
      })
    })
  })
})
</script>

<style scoped>
nav.navbar {
  background-color: #0a0a0a !important;
}
.navbar-item {
  background-color: #0a0a0a;
}
.navbar-menu {
  background-color: #0a0a0a;
}
a.navbar-item:focus-within {
  background-color: #0a0a0a !important;
}
</style>
