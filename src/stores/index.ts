import type { App } from 'vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export const setupStore = (app: App<Element>) => {
  const store = createPinia();
  store.use(piniaPluginPersistedstate);
  app.use(store);
};
