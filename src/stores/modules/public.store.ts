import { queryAllSysDictAndItem } from '@/apis/system/dict.api';
import { querySysRoleList } from '@/apis/system/role.api';
import { IDict, IRole } from '@/types/modules/system';

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
    const uploadBaseURL = computed(() => {
      const protocol = window.location.protocol;
      const hostname = window.location.hostname;
      const domain = import.meta.env.PROD ? protocol + '//' + hostname : import.meta.env.VITE_REQUEST_BASEURL;
      return domain + ':9800/qcs/';
    });
    return { queryAllDict, dictAll, queryRoleList, roleList, uploadBaseURL };
  },
  { persist: { storage: sessionStorage, key: '__PUBLIC_STORE__', paths: ['dictAll', 'roleList'] } },
);
