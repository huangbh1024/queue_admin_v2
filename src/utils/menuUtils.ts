import type { Menu } from '@/types';
import type { RouteRecordRaw } from 'vue-router';

export type DataTree<T> = T & { children?: DataTree<T>[] };
export const dataToTree = <T extends { id: number; parentId: number }>(data: T[]): DataTree<T>[] => {
  const dataTree: DataTree<T>[] = [];
  const dataMap = new Map<number, DataTree<T>>();
  data.forEach(item => {
    dataMap.set(item.id, { ...item });
  });
  data.forEach(item => {
    const parentItem = dataMap.get(item.parentId);
    if (parentItem) {
      parentItem.children = parentItem.children ?? [];
      parentItem.children.push(dataMap.get(item.id)!);
    } else {
      dataTree.push(dataMap.get(item.id)!);
    }
  });
  return dataTree;
};

export const filterRoutes = (asyncRoutes: RouteRecordRaw[], roleMenuList: Menu[]) => {
  const menuPathMap = new Map<string, string>();
  for (const menuItem of roleMenuList) {
    menuPathMap.set(menuItem.menuUrl, menuItem.menuName);
  }
  const updateRouteMeta = (route: RouteRecordRaw): boolean => {
    if (menuPathMap.has(route.path)) {
      route.meta!.title = menuPathMap.get(route.path)!;
      if (route.children && route.children.length > 0) {
        route.children = route.children.filter(updateRouteMeta);
      }
      return true;
    }
    return false;
  };

  return asyncRoutes.filter(updateRouteMeta);
};

export interface ExtendedMenu extends Menu {
  fullMenuUrl: string;
  parentMenus: string[];
}
export const constructFullMenuUrls = (menus: Menu[]): ExtendedMenu[] => {
  const menuMap: { [key: number]: Menu } = {};
  menus.forEach(menu => {
    menuMap[menu.id] = menu;
  });

  const getFullMenuUrlAndParents = (menu: Menu): { fullUrl: string; parents: string[] } => {
    if (menu.parentId === 0 || !menuMap[menu.parentId]) {
      return { fullUrl: menu.menuUrl, parents: [] };
    }
    const parentMenu = menuMap[menu.parentId];
    const parentResult = getFullMenuUrlAndParents(parentMenu);
    return {
      fullUrl: `${parentResult.fullUrl}/${menu.menuUrl}`,
      parents: [...parentResult.parents, parentResult.fullUrl],
    };
  };

  return menus.map(menu => {
    const { fullUrl, parents } = getFullMenuUrlAndParents(menu);
    return {
      ...menu,
      fullMenuUrl: fullUrl,
      parentMenus: parents,
    };
  });
};
