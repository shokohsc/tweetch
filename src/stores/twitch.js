import axios from 'axios'
import getEnv from '../utils/env'
import { defineStore, acceptHMRUpdate } from 'pinia'
import uniqBy from 'lodash/uniqBy'

const useTwitchStore = defineStore('twitch', {
  state: () => ({
    authenticated: false,
    userId: '',
    accessToken: '',
    expiryTime: 0,
    loading: false,
    error: false,
    cursor: '',

    _streams: [],
    _videos: [],
    _categories: [],
    _channels: [],
    _users: []
  }),
  persist: {
    storage: sessionStorage,
    debug: true
  },
  getters: {
    streams: (state) => uniqBy(state._streams, stream => stream.login).sort((a, b) => {
      if (a.viewers > b.viewers)
        return -1
      if (a.viewers < b.viewers)
        return 1
      return 0
    }),
    videos: (state) => uniqBy(state._videos, video => video.createdAt),
    categories: (state) => uniqBy(state._categories, category => category.category),
    channels: (state) => uniqBy(state._channels, channel => channel.login),
    users: (state) => state._users,
  },
  actions: {
    async login(token) {
      this.accessToken = token
      this.authenticated = true
      await this.getUsers()
      this.userId = this._users[0].id
    },
    async logout(e) {
      e.preventDefault()
      this.userId = ''
      this.accessToken = ''
      this.authenticated = false
      this._users = []
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
          console.error(e)
        }
      }
    },
    async getStreams(params = {}, reset = true) {
      if (reset)
        this._streams = []
      this.loading = true
      this.error = false
      const query = new URLSearchParams(params)
      try {
        const response = await axios.get('https://api.twitch.tv/helix/streams', {
          params,
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Client-Id': getEnv('TWITCH_CLIENT_ID')
          }
        })
        this.cursor = response.data.pagination.cursor || ''
        response.data.data.forEach((stream, i) => {
          this._streams.push({
            streamRoute: { name: 'Stream', params: { stream: stream.user_id } },
            videosRoute: { name: 'Videos', query: { user_id: stream.user_id } },
            categoryRoute: { name: 'Category', params: { category: stream.game_id } },
            languageRoute: { name: 'Language', params: { lang: stream.language } },
            title: stream.title,
            viewers: stream.viewer_count,
            user: stream.user_name,
            category: stream.game_name,
            categoryId: stream.game_id,
            login: stream.user_login,
            loginId: stream.user_id,
            language: stream.language,
            thumbnail: stream.thumbnail_url
          })
        })
        this.loading = false
      } catch (e) {
        this.error = e.message || 'Error happened'
        console.error(e)
        this.loading = false
      }
    },
    async getVideos(params = {}, reset = true) {
      if (reset)
        this._videos = []
      this.loading = true
      this.error = false
      const query = new URLSearchParams(params)
      try {
        const response = await axios.get('https://api.twitch.tv/helix/videos', {
          params,
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Client-Id': getEnv('TWITCH_CLIENT_ID'),
            'Accept-Language': ""
          }
        })
        this.cursor = response.data.pagination.cursor || ''
        response.data.data.forEach((video, i) => {
          this._videos.push({
            streamRoute: { name: 'Stream', params: { stream: video.user_id } },
            videoRoute: { name: 'Video', params: { video: video.id } },
            languageRoute: { name: 'Language', params: { lang: video.language } },
            id: video.id,
            title: video.title,
            views: video.view_count,
            createdAt: video.created_at,
            type: video.type,
            duration: video.duration,
            user: video.user_name,
            login: video.user_login,
            loginId: video.user_id,
            language: video.language,
            thumbnail: video.thumbnail_url
          })
        })
        this.loading = false
      } catch (e) {
        this.error = e.message || 'Error happened'
        console.error(e)
        this.loading = false
      }
    },
    async getCategories(params = {}, reset = true) {
      if (reset)
        this._categories = []
      this.loading = true
      this.error = false
      const query = new URLSearchParams(params)
      try {
        const response = await axios.get('https://api.twitch.tv/helix/search/categories', {
          params,
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Client-Id': getEnv('TWITCH_CLIENT_ID')
          }
        })
        this.cursor = response.data.pagination.cursor || ''
        response.data.data.forEach((category, i) => {
          this._categories.push({
            categoryRoute: { name: 'Category', params: { category: category.id } },
            videosRoute: { name: 'Videos', query: { game_id: category.id } },
            categoryId: category.id,
            category: category.name,
            thumbnail: category.box_art_url
          })
        })
        this.loading = false
      } catch (e) {
        this.error = e.message || 'Error happened'
        console.error(e)
        this.loading = false
      }
    },
    async getChannels(params = {}, reset = true) {
      if (reset)
        this._channels = []
      this.loading = true
      this.error = false
      const query = new URLSearchParams(params)
      try {
        const response = await axios.get('https://api.twitch.tv/helix/search/channels', {
          params,
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Client-Id': getEnv('TWITCH_CLIENT_ID')
          }
        })
        this.cursor = response.data.pagination.cursor || ''
        response.data.data.forEach((channel, i) => {
          this._channels.push({
            streamRoute: { name: 'Stream', params: { stream: channel.id } },
            categoryRoute: { name: 'Category', params: { category: channel.game_id } },
            videosRoute: { name: 'Videos', query: { user_id: channel.id } },
            login : channel.broadcaster_login,
            gameId : channel.game_id,
            game : channel.game_name,
            is_live: channel.is_live,
            id : channel.id,
            thumbnail : channel.thumbnail_url,
            title : channel.title
          })
        })
        this.loading = false
      } catch (e) {
        this.error = e.message || 'Error happened'
        console.error(e)
        this.loading = false
      }
    },
    async getTopGames(params = {}, reset = true) {
      if (reset)
        this._categories = []
      this.loading = true
      this.error = false
      const query = new URLSearchParams(params)
      try {
        const response = await axios.get('https://api.twitch.tv/helix/games/top', {
          params,
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Client-Id': getEnv('TWITCH_CLIENT_ID')
          }
        })
        this.cursor = response.data.pagination.cursor || ''
        response.data.data.forEach((game, i) => {
          this._categories.push({
            categoryRoute: { name: 'Category', params: { category: game.id } },
            videosRoute: { name: 'Videos', query: { game_id: game.id } },
            categoryId: game.id,
            category: game.name,
            thumbnail: game.box_art_url
          })
        })
        this.loading = false
      } catch (e) {
        this.error = e.message || 'Error happened'
        console.error(e)
        this.loading = false
      }
    },
    async getUsers(params = {}, reset = true) {
      if (reset)
        this._users = []
      this.loading = true
      this.error = false
      const query = new URLSearchParams(params)
      try {
        const response = await axios.get('https://api.twitch.tv/helix/users', {
          params,
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Client-Id': getEnv('TWITCH_CLIENT_ID')
          }
        })
        response.data.data.forEach((user, i) => {
          this._users.push({
            id: user.id,
            login: user.login,
            displayName: user.display_name,
            broadcasterType: user.broadcaster_type,
            description: user.description,
            profileImage: user.profile_image_url,
            offlineImage: user.offline_image_url,
            email: user.email
          })
        })
        this.loading = false
      } catch (e) {
        this.error = e.message || 'Error happened'
        console.error(e)
        this.loading = false
      }
    },
    async getFollowedStreams(params = {}, reset = true) {
      if (reset)
        this._streams = []
      this.loading = true
      this.error = false
      const query = new URLSearchParams(params)
      try {
        const response = await axios.get('https://api.twitch.tv/helix/streams/followed', {
          params,
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Client-Id': getEnv('TWITCH_CLIENT_ID')
          }
        })
        this.cursor = response.data.pagination.cursor || ''
        response.data.data.forEach((stream, i) => {
          this._streams.push({
            streamRoute: { name: 'Stream', params: { stream: stream.user_id } },
            categoryRoute: { name: 'Category', params: { category: stream.game_id } },
            videosRoute: { name: 'Videos', query: { user_id: stream.user_id } },
            languageRoute: { name: 'Language', params: { lang: stream.language } },
            title: stream.title,
            viewers: stream.viewer_count,
            user: stream.user_name,
            category: stream.game_name,
            categoryId: stream.game_id,
            login: stream.user_login,
            language: stream.language,
            thumbnail: stream.thumbnail_url
          })
        })
        this.loading = false
      } catch (e) {
        this.error = e.message || 'Error happened'
        console.error(e)
        this.loading = false
      }
    },
    async getFollowedChannels(params = {}, reset = true) {
      if (reset)
        this._channels = []
      this.loading = true
      this.error = false
      const query = new URLSearchParams(params)
      try {
        const response = await axios.get('https://api.twitch.tv/helix/channels/followed', {
          params,
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Client-Id': getEnv('TWITCH_CLIENT_ID')
          }
        })
        this.cursor = response.data.pagination.cursor || ''
        response.data.data.forEach((channel, i) => {
          this._channels.push({
            streamRoute: { name: 'Stream', params: { stream: channel.broadcaster_id } },
            videosRoute: { name: 'Videos', query: { user_id: channel.broadcaster_id } },
            login : channel.broadcaster_login,
            id : channel.broadcaster_id,
            title : channel.broadcaster_name
          })
        })
        this.loading = false
      } catch (e) {
        this.error = e.message || 'Error happened'
        console.error(e)
        this.loading = false
      }
    },
    async getFollowedGames(params = {}, reset = true) {
      if (reset)
        this._categories = []
      this.loading = true
      this.error = false
      const query = new URLSearchParams(params)
      try {
        const response = await axios.get('https://api.twitch.tv/helix/users/'+this.userId+'/follows/games', {
          params,
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Client-Id': getEnv('TWITCH_CLIENT_ID')
          }
        })
        this.cursor = response.data.pagination.cursor || ''
        response.data.data.forEach((category, i) => {
          this._categories.push({
            categoryRoute: { name: 'Category', params: { category: category.id } },
            videosRoute: { name: 'Videos', query: { game_id: category.id } },
            categoryId: category.id,
            category: category.name,
            thumbnail: category.box_art_url
          })
        })
        this.loading = false
      } catch (e) {
        this.error = e.message || 'Error happened'
        console.error(e)
        this.loading = false
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTwitchStore, import.meta.hot))
}

export { useTwitchStore }
