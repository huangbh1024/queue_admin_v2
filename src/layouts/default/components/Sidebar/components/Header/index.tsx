import { SidebarLogo } from '../Logo';

export interface SidebarHeaderProps {
  collapsed?: boolean;
}
export const SidebarHeader = defineComponent({
  props: {
    collapsed: { type: Boolean as PropType<SidebarHeaderProps['collapsed']> },
  },
  setup(props) {
    const { collapsed } = toRefs(props);
    return () => (
      <div class='my-auto flex h-16'>
        <SidebarLogo displayTitle={!collapsed.value} />
      </div>
    );
  },
});
