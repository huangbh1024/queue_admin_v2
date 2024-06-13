// 常显路由，不会受到权限的影响
import { RouteRecordRaw } from 'vue-router';
import { DashboardPage } from '@/pages/Dashboard';
import { DefaultLayout } from '@/layouts/default';

export const commonRoutes: RouteRecordRaw[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: () => Promise.resolve(DefaultLayout),
    meta: { title: '主页', icon: 'i-mdi-monitor-dashboard', hasChildren: false },
    children: [
      {
        name: 'DashboardIndex',
        path: '',
        component: () => Promise.resolve(DashboardPage),
      },
    ],
  },
];
