import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { commonRoutes } from './common.routes';
import { asyncRoutes } from './async.routes';
import { constantRoutes } from './constant.routes';

export const setupRouter = (app: App<Element>) => {
  const router = createRouter({
    routes: constantRoutes.concat(commonRoutes).concat(asyncRoutes),
    history: createWebHashHistory('/'),
    scrollBehavior: () => ({ left: 0, top: 0 }),
    strict: true,
  });
  app.use(router);
};
