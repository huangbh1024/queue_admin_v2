import { queryAllSysDictAndItem } from '@/apis/system/dict.api';
import { querySysRoleList } from '@/apis/system/role.api';
import { IDict, IRole } from '@/types/modules/system';
import { getBaseUrl } from '@/utils/request';

export const usePublicStore = defineStore(
  'public',
  () => {
    const dictAll = ref<Record<string, IDict[]>>({});
    const queryAllDict = async () => {
      const { data } = await queryAllSysDictAndItem();
      data.forEach(item => {
        dictAll.value[item.dictType] = item.dictItemList.filter(Boolean);
      });
    };
    const roleList = ref<IRole[]>([]);
    const queryRoleList = async () => {
      const { data } = await querySysRoleList({});
      roleList.value = data;
    };
    const uploadBaseURL = computed(() => getBaseUrl());
    return { queryAllDict, dictAll, queryRoleList, roleList, uploadBaseURL };
  },
  { persist: { storage: sessionStorage, key: '__PUBLIC_STORE__', paths: ['dictAll', 'roleList'] } },
);
