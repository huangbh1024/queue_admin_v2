import { NMenu } from 'naive-ui';
import { RouteRecordRaw, RouterLink, useRoute } from 'vue-router';
import { renderIcon } from '@/components/Icon/utils';
import { useMenuStore } from '@/stores/modules/menu.store';
import type { MenuMixedOption } from 'naive-ui/es/menu/src/interface';
import { isUndefined } from 'lodash-es';

export interface SidebarMenuProps {
  collapsed?: boolean;
  mode: 'vertical' | 'horizontal';
}

export const SidebarMenu = defineComponent({
  props: {
    collapsed: { type: Boolean, default: false },
    mode: { type: String as PropType<SidebarMenuProps['mode']>, default: 'vertical' },
  },
  setup(props) {
    const { collapsed, mode } = toRefs(props);
    const { filteredRoutes, roleMenuList } = storeToRefs(useMenuStore());
    const collapsedWidth = computed(() => (collapsed.value ? 64 : 300));
    const getRoutePath = (path: string, level: number) => {
      return (
        roleMenuList.value.find(item => item.menuUrl === path && item.menuLever === level)?.fullMenuUrl ?? '/dashboard'
      );
    };
    // 是否展示子菜单
    const showChildren = (item: RouteRecordRaw) =>
      item.children?.length && (isUndefined(item.meta?.hasChildren) || item.meta?.hasChildren);
    // 处理树形菜单
    const mapTreeStructure = (item: RouteRecordRaw, level: number): MenuMixedOption => {
      return {
        label: () => {
          if (showChildren(item)) {
            return item.meta?.title ?? '';
          }
          return (
            <RouterLink to={getRoutePath(item.path, level)}>{{ default: () => item.meta?.title ?? '' }}</RouterLink>
          );
        },
        key: getRoutePath(item.path, level),
        collapseTitle: item.meta?.title ?? '',
        icon: item.meta?.icon ? renderIcon(item.meta.icon) : undefined,
        children: showChildren(item) ? item.children!.map(item => mapTreeStructure(item, level + 1)) : undefined,
      };
    };
    const menuList = computed(() => filteredRoutes.value.map(item => mapTreeStructure(item, 1)));
    const route = useRoute();
    const activeMenu = ref(route.path);
    const defaultExpandedKeys = computed(() => {
      const roleMenu = roleMenuList.value.find(item => item.fullMenuUrl === route.fullPath);
      return roleMenu?.parentMenus ?? [];
    });
    watch(defaultExpandedKeys, val => {
      onUpdateExpandedKeys(expandedKeys.value.concat(val));
    });
    const expandedKeys = ref<string[]>(defaultExpandedKeys.value);
    const onUpdateExpandedKeys = (keys: string[]) => {
      expandedKeys.value = [...new Set([...keys])];
    };

    watchEffect(() => (activeMenu.value = route.path));

    return () => (
      <div
        class={[
          'transition-width',
          'h-full',
          'shrink-0',
          'flex-col',
          'overflow-hidden',
          'duration-75',
          collapsed.value ? 'w-16' : 'w-75',
        ]}
      >
        <NMenu
          v-model:value={activeMenu.value}
          collapsed={collapsed.value}
          collapsedWidth={collapsedWidth.value}
          options={menuList.value}
          mode={mode.value}
          expandedKeys={expandedKeys.value}
          onUpdateExpandedKeys={onUpdateExpandedKeys}
          defaultExpandedKeys={defaultExpandedKeys.value}
        />
      </div>
    );
  },
});
