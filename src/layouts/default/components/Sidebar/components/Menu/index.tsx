import { NMenu } from 'naive-ui';
import { RouteRecordRaw, RouterLink, useRoute } from 'vue-router';
import { renderIcon } from '@/components/Icon/utils';
import { useMenuStore } from '@/stores/modules/menu.store';
import type { MenuMixedOption } from 'naive-ui/es/menu/src/interface';
import { isUndefined } from 'lodash-es';
import { resolvePath } from '@/utils/menuUtils';

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
    // 是否展示子菜单
    const showChildren = (item: RouteRecordRaw) =>
      item.children?.length && (isUndefined(item.meta?.hasChildren) || item.meta?.hasChildren);

    // 处理树形菜单
    const mapTreeStructure = (item: RouteRecordRaw): MenuMixedOption => {
      return {
        label: () => {
          if (showChildren(item)) {
            return item.meta?.title ?? '';
          }
          return (
            <RouterLink to={resolvePath(roleMenuList.value, item.path)}>
              {{ default: () => item.meta?.title ?? '' }}
            </RouterLink>
          );
        },
        key: resolvePath(roleMenuList.value, item.path),
        collapseTitle: item.meta?.title ?? '',
        icon: item.meta?.icon ? renderIcon(item.meta.icon) : undefined,
        children: showChildren(item) ? item.children!.map(mapTreeStructure) : undefined,
      };
    };

    const menuList = computed(() => filteredRoutes.value.map(mapTreeStructure));
    const route = useRoute();
    const activeMenu = ref(route.path);
    const expandedKeys = ref<string[]>([]);
    const onUpdateActiveMenu = (key: string) => {
      activeMenu.value = key;
      // 切割
      expandedKeys.value = key
        .split('/')
        .filter(item => item)
        .slice(0, -1)
        .map(item => {
          const _path = resolvePath(roleMenuList.value, item);
          return _path.startsWith('/') ? _path : '/' + _path;
        });
    };
    const onUpdateExpandedKeys = (keys: string[]) => {
      expandedKeys.value = keys;
    };
    watch(() => route.path, onUpdateActiveMenu, { immediate: true });

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
          value={activeMenu.value}
          onUpdateValue={onUpdateActiveMenu}
          collapsed={collapsed.value}
          collapsedWidth={collapsedWidth.value}
          options={menuList.value}
          mode={mode.value}
          expandedKeys={expandedKeys.value}
          onUpdateExpandedKeys={onUpdateExpandedKeys}
        />
      </div>
    );
  },
});
