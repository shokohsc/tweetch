import "../node_modules/bulma/css/bulma.css"
import "@fortawesome/fontawesome-free/css/all.css"
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router.js'

const pinia = createPinia()
const app = createApp(App)
pinia.use(() => ({ router: router }))
pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(pinia)
app.mount('#app')
