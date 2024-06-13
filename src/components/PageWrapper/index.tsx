import { NScrollbar } from 'naive-ui';
import styles from './index.module.scss';

export const PageWrapper = defineComponent({
  props: { useScrollbar: { type: Boolean, default: true } },
  setup(props, { slots }) {
    return () => (
      <div class={['rounded-2xl w-full h-full min-h-full', styles['page-wrapper']]}>
        {props.useScrollbar ? <NScrollbar class='rounded-2xl'>{slots.default?.()}</NScrollbar> : slots.default?.()}
      </div>
    );
  },
});
