import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { commonRoutes } from './modules/common.routes';

export const setupRouter = (app: App<Element>) => {
  const router = createRouter({
    routes: commonRoutes,
    history: createWebHashHistory('/'),
    scrollBehavior: () => ({ left: 0, top: 0 }),
    strict: true,
  });
  app.use(router);
};
