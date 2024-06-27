import { ProFormIns } from '@/components/ProForm/interface';

export const useFormDrawer = <T extends Record<string, any> = object>() => {
  const visible = ref(false);
  const title = ref<'新增' | '编辑'>('新增');
  const formIns = ref<ProFormIns<Partial<T>> | null>(null);
  const onAdd = () => {
    visible.value = true;
    title.value = '新增';
  };
  const onEdit = (rowData: T) => {
    visible.value = true;
    title.value = '编辑';
    nextTick(() => {
      formIns.value?.setFormData(Object.assign({}, rowData));
    });
  };
  const onClose = () => {
    visible.value = false;
  };
  return { visible, title: readonly(title), onAdd, onEdit, formIns, onClose };
};
