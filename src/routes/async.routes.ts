// 权限路由，受到权限的影响

import { RouteRecordRaw } from 'vue-router';
import { hosInfoRoute } from './modules/hosInfo.route';

export const asyncRoutes: RouteRecordRaw[] = [hosInfoRoute];
