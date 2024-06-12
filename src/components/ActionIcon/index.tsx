import { NEl } from 'naive-ui';
import { ToolTipper } from './components/Tooltipper';
import { Icon } from '../Icon';

export interface ActionIconProps {
  tooltipText?: string;
  icon?: string;
}

export const ActionIcon = defineComponent({
  props: {
    tooltipText: { type: String, default: 'icon Button' },
    icon: { type: String, default: 'i-mdi-alert' },
  },
  setup(props) {
    return () => (
      <ToolTipper tooltipText={props.tooltipText}>
        <NEl
          tag='button'
          class='bg-[var(--action-color)] text-[var(--text-color-base)] w-8 h-8 text-base flex items-center justify-center rounded-lg p-2 hover:bg-[var(--hover-color)]'
        >
          <span class='sr-only'>{props.tooltipText}</span>
          <Icon icon={props.icon} size={16} />
        </NEl>
      </ToolTipper>
    );
  },
});
