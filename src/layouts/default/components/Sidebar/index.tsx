import { NScrollbar } from 'naive-ui';
import { SidebarMenu, SidebarHeader } from './components';
import { useAppStore } from '@/stores/modules/app.store';

export const LayoutSidebar = defineComponent({
  setup() {
    const { collapsed } = storeToRefs(useAppStore());
    const sidebarHeaderRef = ref<InstanceType<typeof SidebarHeader> | null>(null);
    // 计算侧边栏菜单高度
    const sidebarMenuHeight = computed(() => {
      const sidebarHeaderHeight = sidebarHeaderRef.value?.$el?.clientHeight ?? 0;
      return `calc(100vh - ${sidebarHeaderHeight}px)`;
    });

    return () => (
      <aside class='flex flex-col'>
        <div class='grow flex flex-col'>
          <SidebarHeader collapsed={collapsed.value} ref={sidebarHeaderRef} />
          <NScrollbar style={{ maxHeight: sidebarMenuHeight.value }}>
            <SidebarMenu collapsed={collapsed.value} />
          </NScrollbar>
        </div>
      </aside>
    );
  },
});
