import { ExtendedMenu, constructFullMenuUrls, filterRoutes } from '@/utils/menuUtils';
import { commonRoutes } from '@/routes/common.routes';
import { asyncRoutes } from '@/routes/async.routes';
import { querySysRoleById } from '@/apis/menu.api';
export const useMenuStore = defineStore(
  'menu',
  () => {
    const roleMenuList = ref<ExtendedMenu[]>([]);
    const filteredRoutes = computed(() => commonRoutes.concat(filterRoutes(asyncRoutes, roleMenuList.value)));
    const queryMenu = async (id: number) => {
      const { data } = await querySysRoleById(id);
      const { menuList: originMenuList } = data;

      roleMenuList.value = constructFullMenuUrls(originMenuList);
    };
    return { queryMenu, filteredRoutes, roleMenuList };
  },
  {
    persist: { storage: sessionStorage, key: '__MENU_STORE__', paths: ['roleMenuList'] },
  },
);
