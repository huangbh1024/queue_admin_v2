export const useAppStore = defineStore('app', () => {
  const collapsed = ref(false); // 侧边栏折叠
  const toggleCollapsed = () => {
    collapsed.value = !collapsed.value;
  }; // 切换侧边栏折叠

  return { collapsed, toggleCollapsed };
});
