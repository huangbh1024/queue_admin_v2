import { RouteRecordRaw } from 'vue-router';
import { LoginPage } from '@/pages/Login';
import { DashboardPage } from '@/pages/Dashboard';

export const commonRoutes: RouteRecordRaw[] = [
  { name: 'Main', path: '/', redirect: '/login' },
  { name: 'Login', path: '/login', component: () => Promise.resolve(LoginPage), meta: { title: '登录' } },
  { name: 'Dashboard', path: '/dashboard', component: () => Promise.resolve(DashboardPage), meta: { title: '控制台' } },
];
