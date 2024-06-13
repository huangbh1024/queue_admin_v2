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

export const resolvePath = (roleMenuList: Menu[], routePath: string): string => {
  const parentPaths = findParentPaths(roleMenuList, routePath);
  parentPaths.push(routePath);
  return parentPaths.join('/');
};

// 寻找父级菜单路径
export const findParentPaths = (roleMenuList: Menu[], targetPath: string): string[] => {
  // 根据 menuUrl 找到对应的菜单项
  const menus = roleMenuList.filter(item => item.menuUrl === targetPath);
  if (menus.length === 0) return [];

  // 初始化结果集合
  const result: Menu[] = [];

  // 定义递归函数
  const findParents = (parentId: number) => {
    // 找到父级菜单
    const parentMenu = roleMenuList.find(item => item.id === parentId);
    if (parentMenu) {
      result.push(parentMenu);
      if (parentMenu.parentId !== 0) {
        findParents(parentMenu.parentId);
      }
    }
  };

  // 对每个找到的菜单项开始递归查找
  menus.forEach(menu => {
    findParents(menu.parentId);
  });

  // 去重
  const uniqueResult = Array.from(new Set(result.map(item => item.id))).map(id =>
    result.find(item => item.id === id),
  ) as Menu[];
  return uniqueResult.sort((a, b) => a.menuLever - b.menuLever).map(item => item.menuUrl);
};

export const getNonParentMenus = (menuList: Menu[]) => {
  const parentIds = new Set<number>();

  // Collect all parentIds
  for (const menuItem of menuList) {
    if (menuItem.parentId) {
      parentIds.add(menuItem.parentId);
    }
  }

  // Filter out items that are parents
  const nonParentMenus = menuList.filter(menuItem => !parentIds.has(menuItem.id));

  return nonParentMenus;
};
