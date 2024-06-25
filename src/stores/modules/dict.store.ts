import { queryAllSysDictAndItem } from '@/apis/system/dict.api';
import { IDict } from '@/types/modules/system';

export const useDictStore = defineStore(
  'dict',
  () => {
    const dictAll = ref<Record<string, IDict[]>>({});
    const queryAllDict = async () => {
      const { data } = await queryAllSysDictAndItem();
      data.forEach(item => {
        dictAll.value[item.dictType] = item.dictItemList.filter(Boolean);
      });
    };
    return { queryAllDict, dictAll };
  },
  { persist: { storage: sessionStorage, key: '__DICT_STORE__', paths: ['dictAll'] } },
);
