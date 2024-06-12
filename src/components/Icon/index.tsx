import { NIcon, NIconWrapper } from 'naive-ui';
import { isNil } from 'lodash-es';
import { loadIcon, type IconifyIcon, Icon as WIcon } from '@iconify/vue';
import { normalizeIconName } from './utils';

export interface IconProps {
  name?: string;
  icon?: string;
  size?: number;
  bgSize?: number;
  color?: string;
  bgColor?: string;
  borderRadius?: number;
  depth?: 1 | 2 | 3 | 4 | 5;
}
interface IconOptions extends IconProps {
  iconColor?: string;
}

export const Icon = defineComponent({
  props: {
    name: { type: String },
    icon: { type: String },
    size: { type: Number },
    bgSize: { type: Number },
    color: { type: String },
    bgColor: { type: String },
    borderRadius: { type: Number },
    depth: { type: Number as PropType<IconProps['depth']> },
  },
  setup(props, { slots }) {
    const shouldUseWrapper = computed(() => !!(props.bgColor || props.bgSize || props.borderRadius));
    const componentToRender = computed(() => (shouldUseWrapper.value ? NIconWrapper : NIcon));
    const options = computed(() => {
      const opt: IconOptions = {};
      if (shouldUseWrapper.value) {
        if (!isNil(props.bgSize)) {
          opt.size = props.bgSize;
        }
        if (!isNil(props.bgColor)) {
          opt.color = props.bgColor;
        }
        if (!isNil(props.borderRadius)) {
          opt.borderRadius = props.borderRadius;
        }
        if (!isNil(props.color)) {
          opt.iconColor = props.color;
        }
      } else {
        if (!isNil(props.color)) {
          opt.color = props.color;
        }
        if (!isNil(props.depth)) {
          opt.depth = props.depth;
        }
        if (!isNil(props.size)) {
          opt.size = props.size;
        }
      }
      return opt;
    });
    const loadIconByName = (name: string) =>
      loadIcon(name).catch(() => {
        // eslint-disable-next-line no-console
        console.error(`Failed to load icon ${name}`);
        return '';
      });
    const icon = ref<string | Required<IconifyIcon>>();
    const setIcon = (name?: string) => {
      if (!isNil(name)) {
        name = normalizeIconName(name);
        loadIconByName(name).then(res => (icon.value = res));
      }
    };
    watchEffect(() => {
      if (!isNil(props.icon)) {
        setIcon(props.icon);
      } else {
        setIcon(props.name);
      }
    });
    return () => {
      const Component = componentToRender.value;
      return (
        <Component {...options.value}>
          {slots.default ? slots.default() : <WIcon icon={icon.value ?? ''} width={props.size} height={props.size} />}
        </Component>
      );
    };
  },
});
