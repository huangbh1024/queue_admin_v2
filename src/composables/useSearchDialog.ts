import { isWindows } from '@/utils/platformUtils';

const listener = ref();
export const useSearchDialog = () => {
  const commandIcon = ref(isWindows() ? 'CTRL' : '⌘');
  return {
    commandIcon,
    trigger: (cb: () => void): void => {
      listener.value = cb;
    },
    open: (): void => {
      listener.value && listener.value();
    },
  };
};
