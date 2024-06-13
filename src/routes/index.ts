import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { commonRoutes } from './modules/common.routes';
import { asyncRoutes } from './modules/async.routes';
import { constantRoutes } from './modules/constant.routes';

export const setupRouter = (app: App<Element>) => {
  const router = createRouter({
    routes: constantRoutes.concat(commonRoutes).concat(asyncRoutes),
    history: createWebHashHistory('/'),
    scrollBehavior: () => ({ left: 0, top: 0 }),
    strict: true,
  });
  app.use(router);
};
