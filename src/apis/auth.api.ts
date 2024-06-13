import { UserInfo } from '@/types';
import { request } from '@/utils/request';

export const login = (data: { userName: string; userPassword: string }) =>
  request<UserInfo>({ url: 'system/sysUser/login', method: 'post', data });
