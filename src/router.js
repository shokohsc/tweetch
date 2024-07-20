import { createRouter, createWebHistory } from 'vue-router'

import { storeToRefs } from 'pinia'
import { useTwitchStore } from './stores/twitch'
import Home from './components/Home.vue';
import Category from './components/Category.vue';
import Categories from './components/Categories.vue';
import TopGames from './components/TopGames.vue';
import FollowedGames from './components/FollowedGames.vue';
import FollowedChannels from './components/FollowedChannels.vue';
import FollowedStreams from './components/FollowedStreams.vue';
import Channels from './components/Channels.vue';
import Videos from './components/Videos.vue';
import Stream from './components/Stream.vue';
import Video from './components/Video.vue';
import About from './components/About.vue';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'About',
    path: '/about',
    component: About
  },
  {
    name: 'Category',
    path: '/category/:category',
    component: Category
  },
  {
    name: 'Channels',
    path: '/channels',
    component: Channels
  },
  {
    name: 'Categories',
    path: '/categories',
    component: Categories
  },
  {
    name: 'TopGames',
    path: '/top/games',
    component: TopGames
  },
  {
    name: 'FollowedGames',
    path: '/followed/games',
    component: FollowedGames
  },
  {
    name: 'FollowedStreams',
    path: '/followed/streams',
    component: FollowedStreams
  },
  {
    name: 'FollowedChannels',
    path: '/followed/channels',
    component: FollowedChannels
  },
  {
    name: 'Stream',
    path: '/stream/:stream',
    component: Stream
  },
  {
    name: 'Video',
    path: '/video/:video',
    component: Video
  },
  {
    name: 'Videos',
    path: '/videos',
    component: Videos
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  const { authenticated } = storeToRefs(useTwitchStore())

  if (
    (to.name === 'FollowedGames' || to.name === 'FollowedStreams') &&
    false === authenticated.value
  ) {
    return { name: 'Home' }
  }

  return true
})

router.afterEach((to, from, failure) => {
  window.scrollTo(0, 0)
})

export default router
