import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

if (import.meta.env.DEV) {
  const { initTWD } = await import('twd-js/bundled');
  const tests = import.meta.glob("./**/*.twd.test.ts")
  initTWD(tests);
  const { createBrowserClient } = await import('twd-relay/browser');
  const client = createBrowserClient();
  client.connect();
}

const app = createApp(App)

app.use(router)

app.mount('#app')
