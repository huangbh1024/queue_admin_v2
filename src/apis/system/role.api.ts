import { IRole } from '@/types/modules/system';
import { request } from '@/utils/request';

export const querySysRoleList = (
  data: Partial<{
    isEnable: string;
    onlineProjectType: string;
    pageNum: number;
    pageSize: number;
    roleCode: string;
    roleName: string;
  }>,
) => request<IRole[]>({ url: 'system/sysRole/querySysRoleList', method: 'post', data });
