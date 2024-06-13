import { UserInfo } from '@/types';
import { Md5 } from 'ts-md5';
import { useMenuStore } from './menu.store';
import { login } from '@/apis/auth.api';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const userInfo = ref<UserInfo>();
    const token = computed(() => userInfo.value?.token ?? '');
    const loginMethod = async (loginInfo: { userName: string; userPassword: string }) => {
      const { queryMenu } = useMenuStore();
      const { data } = await login({
        userName: loginInfo.userName,
        userPassword: Md5.hashStr(loginInfo.userPassword),
      });
      sessionStorage.setItem('token', data.token); // 缓存token
      await queryMenu(data.id);
      userInfo.value = data;
    };

    const logoutMethod = () => {
      userInfo.value = undefined;
    };

    return { loginMethod, token, userInfo, logoutMethod };
  },
  { persist: { storage: sessionStorage, paths: ['userInfo'], key: '__AUTH_STORE__' } },
);
