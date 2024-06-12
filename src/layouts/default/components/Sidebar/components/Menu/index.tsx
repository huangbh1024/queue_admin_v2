import { NMenu } from 'naive-ui';
import { mockMenuList, dataToTree } from '@/utils/menuUtils';
import { RouterLink, useRoute } from 'vue-router';
import { renderIcon } from '@/components/Icon/utils';
import type { MenuMixedOption } from 'naive-ui/es/menu/src/interface';

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
    const collapsedWidth = computed(() => (collapsed.value ? 64 : 300));
    const menus = computed(() => dataToTree(mockMenuList));
    type Menu = typeof menus.value;
    // 处理树形菜单
    const mapTreeStructure = (item: Menu[0]): MenuMixedOption => {
      return {
        label: () => {
          if (item.children?.length) {
            return item.menuName;
          }
          return <RouterLink to={item.menuUrl}>{{ default: () => item.menuName }}</RouterLink>;
        },
        key: item.menuUrl,
        collapseTitle: item.menuName,
        icon: item.menuIcon ? renderIcon(item.menuIcon) : undefined,
        children: item.children?.length ? item.children.map(mapTreeStructure) : undefined,
      };
    };

    const menuList = computed(() => menus.value.map(mapTreeStructure));
    const route = useRoute();
    const activeMenu = ref(route.path);
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
        ></NMenu>
      </div>
    );
  },
});
