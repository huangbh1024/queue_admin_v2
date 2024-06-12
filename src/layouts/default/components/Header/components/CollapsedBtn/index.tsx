import { ActionIcon } from '@/components/ActionIcon';
import { useAppStore } from '@/stores/modules/app.store';
export const CollapsedBtn = defineComponent({
  setup() {
    const { toggleCollapsed } = useAppStore();
    return () => <ActionIcon icon='i-tabler-menu-2' tooltipText='折叠菜单' onClick={toggleCollapsed} />;
  },
});
