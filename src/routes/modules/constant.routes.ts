import { LoginPage } from '@/pages/Login';
import { RouteRecordRaw } from 'vue-router';

export const constantRoutes: RouteRecordRaw[] = [
  { name: 'Main', path: '/', redirect: '/login' },
  { name: 'Login', path: '/login', component: () => Promise.resolve(LoginPage), meta: { title: '登录' } },
];
