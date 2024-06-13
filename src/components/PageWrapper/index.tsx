import { NScrollbar } from 'naive-ui';

export const PageWrapper = defineComponent({
  props: { useScrollbar: { type: Boolean, default: true } },
  setup(props, { slots }) {
    return () => (
      <div class='rounded-2xl w-full h-full min-h-full'>
        {props.useScrollbar ? (
          <NScrollbar contentClass='px-8px' class='rounded-2xl'>
            {slots.default?.()}
          </NScrollbar>
        ) : (
          slots.default?.()
        )}
      </div>
    );
  },
});
