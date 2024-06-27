import { UserInfo } from '@/types';
import { request } from '@/utils/request';

export const updateSysUserPwd = (data: { newUserPassword: string; oldUserPassword: string; userName: string }) =>
  request({
    url: 'system/sysUser/updateSysUserPwd',
    method: 'post',
    data,
  });

export const updateSysUser = (data: Partial<UserInfo>) =>
  request({
    url: 'system/sysUser/updateSysUser',
    method: 'post',
    data,
  });
