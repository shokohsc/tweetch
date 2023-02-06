import "../node_modules/bulma/css/bulma.css"
import "@fortawesome/fontawesome-free/css/all.css"
import * as Sentry from "@sentry/vue"
import { BrowserTracing } from "@sentry/tracing"
import { ExtraErrorData as ExtraErrorDataIntegration } from "@sentry/integrations"
import { CaptureConsole as CaptureConsoleIntegration } from "@sentry/integrations"
// import { Debug as DebugIntegration } from "@sentry/integrations"
import getEnv from './utils/env'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router.js'

const pinia = createPinia()
const app = createApp(App)
pinia.use(() => ({ router: router }))
pinia.use(piniaPluginPersistedstate)

if (getEnv('USE_SENTRY') === 'true') {
  Sentry.init({
    app,
    dsn: getEnv('SENTRY_DSN'),
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracePropagationTargets: [window.location.host, /^\//],
      }),
      new Sentry.Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),
      new ExtraErrorDataIntegration({
        depth: 5,
      }),
      new CaptureConsoleIntegration({
        levels: ['warn', 'error']
      }),
      // new DebugIntegration({
      //   debugger: true,
      //   stringify: true
      // }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    sampleRate: 1.0,
    attachStacktrace: true,
    maxBreadcrumbs: 5,
    // debug: true,
    autoSessionTracking: true,
    attachProps: true,
    logErrors: true,
    trackComponents: true,
    hooks: ['activate', 'create', 'destroy', 'mount', 'update'],
  });
}

app.use(router)
app.use(pinia)
app.mount('#app')
