import { ProFormIns } from '@/components/ProForm/interface';

export const useFormModal = <T extends Record<string, any> = object>() => {
  const showModal = ref(false);
  const modalTitle = ref<'新增' | '编辑'>('新增');
  const formIns = ref<ProFormIns<Partial<T>> | null>(null);
  const onAdd = () => {
    showModal.value = true;
    modalTitle.value = '新增';
  };
  const onEdit = (rowData: T) => {
    showModal.value = true;
    modalTitle.value = '编辑';
    nextTick(() => {
      formIns.value?.setFormData(Object.assign({}, rowData));
    });
  };
  return { showModal, modalTitle, onAdd, onEdit, formIns };
};
