import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

if (import.meta.env.DEV) {
  const { initTWD } = await import('twd-js/bundled');
  const tests = import.meta.glob("./**/*.twd.test.ts")
  initTWD(tests);
}

const app = createApp(App)

app.use(router)

app.mount('#app')
