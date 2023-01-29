import axios from 'axios'
import getEnv from '../utils/env'
import { defineStore, acceptHMRUpdate } from 'pinia'

const useTwitchStore = defineStore('twitch', {
  state: () => ({
    authenticated: false,
    userId: '',
    accessToken: '',
    expiryTime: 0,
    streams: [],
    loading: false,
    error: null,
    cursor: '',
    categories: [],
    channels: [],
    users: []
  }),
  persist: {
    storage: sessionStorage,
    debug: true
  },
  actions: {
    async login(token) {
      this.accessToken = token
      this.authenticated = true
      await this.getUsers()
      this.userId = this.users[0].id
    },
    async logout(e) {
      e.preventDefault()
      this.userId = ''
      this.accessToken = ''
      this.authenticated = false
      this.users = []
      await this.initAccessToken()
    },
    async initAccessToken(){
      if ('' === this.accessToken) {
        try {
          const response = await axios.post('https://id.twitch.tv/oauth2/token', {
            client_id: getEnv('TWITCH_CLIENT_ID'),
            client_secret: getEnv('TWITCH_CLIENT_SECRET'),
            grant_type: 'client_credentials'
          })
          if (200 === response.status){
            this.accessToken = response.data.access_token
            this.expiryTime = response.data.expires_in
          }
        } catch (e) {
          console.error(e);
        }
      }
    },
    async getStreams(params = {}) {
      this.streams = []
      this.loading = true
      const query = new URLSearchParams(params)
      try {
        const response = await axios.get('https://api.twitch.tv/helix/streams', {
          params: params,
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Client-Id': getEnv('TWITCH_CLIENT_ID')
          }
        })
        this.cursor = response.data.pagination.cursor || ''
        response.data.data.forEach((stream, i) => {
          this.streams.push({
            streamRoute: { name: 'Stream', params: { stream: stream.user_login } },
            categoryRoute: { name: 'Category', params: { category: stream.game_id } },
            title: stream.title,
            viewers: stream.viewer_count,
            user: stream.user_name,
            category: stream.game_name,
            categoryId: stream.game_id,
            login: stream.user_login,
            language: stream.language,
            thumbnail: stream.thumbnail_url
          })
        });
        this.loading = false
      } catch (e) {
        this.error = e
        console.error(e);
        this.loading = false
      }
    },
    async getCategories(params = {}) {
      this.categories = []
      this.loading = true
      const query = new URLSearchParams(params)
      try {
        const response = await axios.get('https://api.twitch.tv/helix/search/categories', {
          params: params,
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Client-Id': getEnv('TWITCH_CLIENT_ID')
          }
        })
        this.cursor = response.data.pagination.cursor || ''
        response.data.data.forEach((category, i) => {
          this.categories.push({
            categoryRoute: { name: 'Category', params: { category: category.id } },
            categoryId: category.id,
            category: category.name,
            thumbnail: category.box_art_url
          })
        });
        this.loading = false
      } catch (e) {
        this.error = e
        console.error(e);
        this.loading = false
      }
    },
    async getChannels(params = {}) {
      this.channels = []
      this.loading = true
      const query = new URLSearchParams(params)
      try {
        const response = await axios.get('https://api.twitch.tv/helix/search/channels', {
          params: params,
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Client-Id': getEnv('TWITCH_CLIENT_ID')
          }
        })
        this.cursor = response.data.pagination.cursor || ''
        response.data.data.forEach((channel, i) => {
          this.channels.push({
            streamRoute: { name: 'Stream', params: { stream: channel.broadcaster_login } },
            categoryRoute: { name: 'Category', params: { category: channel.game_id } },
            login : channel.broadcaster_login,
            gameId : channel.game_id,
            game : channel.game_name,
            id : channel.id,
            thumbnail : channel.thumbnail_url,
            title : channel.title
          })
        });
        this.loading = false
      } catch (e) {
        this.error = e
        console.error(e);
        this.loading = false
      }
    },
    async getTopGames(params = {}) {
      this.categories = []
      this.loading = true
      const query = new URLSearchParams(params)
      try {
        const response = await axios.get('https://api.twitch.tv/helix/games/top', {
          params: params,
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Client-Id': getEnv('TWITCH_CLIENT_ID')
          }
        })
        this.cursor = response.data.pagination.cursor || ''
        response.data.data.forEach((game, i) => {
          this.categories.push({
            categoryRoute: { name: 'Category', params: { category: game.id } },
            categoryId: game.id,
            category: game.name,
            thumbnail: game.box_art_url
          })
        });
        this.loading = false
      } catch (e) {
        this.error = e
        console.error(e);
        this.loading = false
      }
    },
    async getUsers(params = {}) {
      this.users = []
      this.loading = true
      const query = new URLSearchParams(params)
      try {
        const response = await axios.get('https://api.twitch.tv/helix/users', {
          params: params,
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Client-Id': getEnv('TWITCH_CLIENT_ID')
          }
        })
        response.data.data.forEach((user, i) => {
          this.users.push({
            id: user.id,
            login: user.login,
            displayName: user.display_name,
            broadcasterType: user.broadcaster_type,
            description: user.description,
            profileImage: user.profile_image_url,
            offlineImage: user.offline_image_url,
            email: user.email
          })
        });
        this.loading = false
      } catch (e) {
        this.error = e
        console.error(e);
        this.loading = false
      }
    },
    async getFollowedStreams(params = {}) {
      this.streams = []
      this.loading = true
      const query = new URLSearchParams(params)
      try {
        const response = await axios.get('https://api.twitch.tv/helix/streams/followed', {
          params: params,
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Client-Id': getEnv('TWITCH_CLIENT_ID')
          }
        })
        this.cursor = response.data.pagination.cursor || ''
        response.data.data.forEach((stream, i) => {
          this.streams.push({
            streamRoute: { name: 'Stream', params: { stream: stream.user_login } },
            categoryRoute: { name: 'Category', params: { category: stream.game_id } },
            title: stream.title,
            viewers: stream.viewer_count,
            user: stream.user_name,
            category: stream.game_name,
            categoryId: stream.game_id,
            login: stream.user_login,
            language: stream.language,
            thumbnail: stream.thumbnail_url
          })
        });
        this.loading = false
      } catch (e) {
        this.error = e
        console.error(e);
        this.loading = false
      }
    },
    async getFollowedGames(params = {}) {
      this.categories = []
      this.loading = true
      const query = new URLSearchParams(params)
      try {
        const response = await axios.get('https://api.twitch.tv/helix/users/'+this.userId+'/follows/games', {
          params: params,
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Client-Id': getEnv('TWITCH_CLIENT_ID')
          }
        })
        console.log(response);
        this.cursor = response.data.pagination.cursor || ''
        response.data.data.forEach((category, i) => {
          this.categories.push({
            categoryRoute: { name: 'Category', params: { category: category.id } },
            categoryId: category.id,
            category: category.name,
            thumbnail: category.box_art_url
          })
        });
        this.loading = false
      } catch (e) {
        this.error = e
        console.error(e);
        this.loading = false
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTwitchStore, import.meta.hot))
}

export { useTwitchStore }
