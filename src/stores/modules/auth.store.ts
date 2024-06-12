import API from '@/apis';
import { UserInfo } from '@/types';
import { Md5 } from 'ts-md5';

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref<UserInfo>({} as UserInfo);
  const token = computed(() => userInfo.value.token);
  const loginMethod = async (loginInfo: { userName: string; userPassword: string }) => {
    const { data } = await API.login({
      userName: loginInfo.userName,
      userPassword: Md5.hashStr(loginInfo.userPassword),
    });
    userInfo.value = data;
    sessionStorage.setItem('token', data.token); // 缓存token
  };

  return { loginMethod, token };
});
