import API from '@/apis';
import { filterRoutes } from '@/utils/menuUtils';
import { commonRoutes } from '@/routes/modules/common.routes';
import { asyncRoutes } from '@/routes/modules/async.routes';
import { Menu } from '@/types';

export const useMenuStore = defineStore(
  'menu',
  () => {
    const roleMenuList = ref<Menu[]>([]);
    const filteredRoutes = computed(() => commonRoutes.concat(filterRoutes(asyncRoutes, roleMenuList.value)));
    const queryMenu = async (id: number) => {
      const { data } = await API.querySysRoleById(id);
      const { menuList: originMenuList } = data;
      roleMenuList.value = originMenuList;
    };
    return { queryMenu, filteredRoutes, roleMenuList };
  },
  {
    persist: { storage: sessionStorage, key: '__MENU_STORE__', paths: ['roleMenuList'] },
  },
);
