// 常显路由，不会受到权限的影响
import { RouteRecordRaw } from 'vue-router';
import { DashboardPage } from '@/pages/Dashboard';
import { DefaultLayout } from '@/layouts/default';
import { ProfilePage } from '@/pages/Profile';

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
        meta: { title: '主页' },
        component: () => Promise.resolve(DashboardPage),
      },
    ],
  },
  {
    name: 'Profile',
    path: '/profile',
    component: () => Promise.resolve(DefaultLayout),
    meta: { hidden: true },
    children: [
      { name: 'ProfileIndex', path: '', component: () => Promise.resolve(ProfilePage), meta: { title: '个人中心' } },
    ],
  },
];
