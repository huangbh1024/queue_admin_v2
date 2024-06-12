import { createApp } from 'vue';
import { App } from './App';
import 'virtual:uno.css';
import '@unocss/reset/sanitize/sanitize.css';
import '@unocss/reset/sanitize/assets.css';
import './assets/styles/public.css';
import './assets/styles/naive-override.css';

import { setupRouter } from './routes';
import { setupStore } from './stores';

const initApp = () => {
  const app = createApp(App);
  setupStore(app); // store加载
  setupRouter(app); // router加载
  app.mount('#app');
};
initApp();
