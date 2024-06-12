export const mockMenuList = [
  {
    menuIcon: 'i-mdi-monitor-dashboard',
    menuName: '仪表盘',
    menuType: '1',
    menuUrl: '/dashboard/index',
    parentId: 0,
    id: 1,
  },
];

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
