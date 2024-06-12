import { RouteRecordRaw } from 'vue-router';
import { LoginPage } from '@/pages/Login';
import { DashboardPage } from '@/pages/Dashboard';
import { DefaultLayout } from '@/layouts/default';

export const commonRoutes: RouteRecordRaw[] = [
  { name: 'Main', path: '/', redirect: '/login' },
  { name: 'Login', path: '/login', component: () => Promise.resolve(LoginPage), meta: { title: '登录' } },
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: DefaultLayout,
    children: [{ path: 'index', component: () => Promise.resolve(DashboardPage), meta: { title: '仪表盘' } }],
  },
];
