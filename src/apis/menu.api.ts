import { Menu } from '@/types';
import { request } from '@/utils/request';

export const querySysRoleById = (id: number) =>
  request<{ id: number; menuIdList: number[]; menuList: Menu[] }>({
    url: 'system/sysRole/querySysRoleById',
    method: 'post',
    data: { id },
  });
