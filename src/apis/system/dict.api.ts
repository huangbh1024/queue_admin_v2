import { IDict } from '@/types/modules/system';
import { request } from '@/utils/request';

export const queryAllSysDictAndItem = () =>
  request<{ dictItemList: IDict[]; dictTypeName: string; dictType: string }[]>({
    url: 'system/sysDict/queryAllSysDictAndItem',
    method: 'post',
  });
