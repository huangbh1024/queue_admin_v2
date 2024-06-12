import { NEl, NText } from 'naive-ui';
import styles from './index.module.css';
import { Icon } from '@/components/Icon';
import { useSearchDialog } from '@/composables/useSearchDialog';

export const SearchAnyWhere = defineComponent({
  setup() {
    const { commandIcon, open } = useSearchDialog();

    return () => (
      <NEl
        class={['flex', 'items-center', 'rounded-2xl', 'h-8', 'outline-none', 'border-none', styles['search-btn']]}
        onClick={open}
      >
        <Icon name='tabler:search' size={16} />
        <span>搜索</span>
        <NText code class={styles['search-command']}>
          <span class={{ [styles['win']]: commandIcon.value === 'CTRL' }}>{commandIcon.value}</span> K
        </NText>
      </NEl>
    );
  },
});
