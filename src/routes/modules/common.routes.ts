import { RouteRecordRaw } from 'vue-router';
import { LoginPage } from '@/pages/Login';

export const commonRoutes: RouteRecordRaw[] = [
  { name: 'Main', path: '/', redirect: '/login' },
  { name: 'Login', path: '/login', component: () => Promise.resolve(LoginPage), meta: { title: '登录' } },
];
