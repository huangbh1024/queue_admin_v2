import type { App } from 'vue';

export const setupStore = (app: App<Element>) => {
  const store = createPinia();
  app.use(store);
};
