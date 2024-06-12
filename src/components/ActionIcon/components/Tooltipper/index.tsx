import { type PopoverPlacement, NTooltip } from 'naive-ui';

interface ToolTipperProps {
  tooltipText?: string;
  placement?: PopoverPlacement;
  contentClass?: string;
}

export const ToolTipper = defineComponent({
  props: {
    tooltipText: { type: String },
    placement: { type: String as PropType<ToolTipperProps['placement']>, default: 'bottom' },
    contentClass: { type: String },
  },
  setup(props, { slots }) {
    const { tooltipText, placement, contentClass } = toRefs(props);
    const shouldShowTooltip = computed(() => Boolean(tooltipText));

    return () =>
      shouldShowTooltip.value ? (
        <div>
          <NTooltip placement={placement.value} trigger='hover'>
            {{
              trigger: () => (
                <div class={['flex-center', 'h-full', 'rounded-lg', 'cursor-pointer', contentClass.value]}>
                  {slots.default?.()}
                </div>
              ),
              default: () => <>{props.tooltipText}</>,
            }}
          </NTooltip>
        </div>
      ) : (
        <div class={['flex-center', 'rounded-lg', 'cursor-pointer!', contentClass.value]}>{slots.default?.()}</div>
      );
  },
});
