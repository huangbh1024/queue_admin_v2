import { NTag } from 'naive-ui';
import { PropType } from 'vue';

export const DictValueTag = defineComponent({
  props: {
    value: { type: String, required: true },
    dict: {
      type: Array as PropType<
        {
          id: number;
          dictCode: string;
          dictValue: string;
          type?: 'default' | 'error' | 'primary' | 'info' | 'success' | 'warning';
        }[]
      >,
      default: () => [],
    },
  },
  setup(props) {
    const dictValue = computed(() => props.dict.find(item => item.dictCode === props.value)?.dictValue || '未知状态');
    const dictType = computed(() => props.dict.find(item => item.dictCode === props.value)?.type || 'default');
    return () => <NTag type={dictType.value}>{dictValue.value}</NTag>;
  },
});
