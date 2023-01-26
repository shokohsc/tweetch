import { defineStore, acceptHMRUpdate } from 'pinia'
import { useTwitchStore } from './twitch'

const useSearchStore = defineStore('search', {
  state: () => ({
    query: '',
    entity: 'Categories'
  }),
  actions: {
    async onEntityChange(e){
      this.entity = e.target.value
    },
    async onQueryChange(e){
      this.query = e.target.value
    },
    async validate(e){
      if (this.query.length > 2) {
        if ('Categories' === this.entity)
          this.router.push({ name: 'Categories', query: { query: this.query }})
        if ('Channels' === this.entity)
          this.router.push({ name: 'Channels', query: { query: this.query }})
      }
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
}

export { useSearchStore }
