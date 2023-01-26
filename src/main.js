import "../node_modules/bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router.js'

const pinia = createPinia()
const app = createApp(App)

pinia.use(() => ({ router: router }))

app.use(router)
app.use(pinia)
app.mount('#app')
