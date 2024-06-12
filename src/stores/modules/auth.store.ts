import API from '@/apis';
import { UserInfo } from '@/types';
import { Md5 } from 'ts-md5';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const userInfo = ref<UserInfo>();
    const token = computed(() => userInfo.value?.token ?? '');
    const loginMethod = async (loginInfo: { userName: string; userPassword: string }) => {
      const { data } = await API.login({
        userName: loginInfo.userName,
        userPassword: Md5.hashStr(loginInfo.userPassword),
      });
      userInfo.value = data;
    };

    const logoutMethod = () => {
      userInfo.value = undefined;
    };

    return { loginMethod, token, userInfo, logoutMethod };
  },
  { persist: { storage: sessionStorage, paths: ['userInfo'] } },
);
