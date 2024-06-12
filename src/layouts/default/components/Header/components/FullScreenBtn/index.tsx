import { ActionIcon } from '@/components/ActionIcon';
import { useFullscreen } from '@vueuse/core';

export const FullScreenBtn = defineComponent({
  setup() {
    const { toggle } = useFullscreen();
    return () => <ActionIcon icon='i-tabler-maximize' tooltipText='切换全屏' onClick={toggle} />;
  },
});
