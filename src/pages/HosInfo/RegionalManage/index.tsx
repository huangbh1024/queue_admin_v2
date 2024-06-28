import { deleteHospAreaInfo, queryHospAreaInfoByLevelPage, saveHospAreaInfo } from '@/apis/hosInfo/regional.api';
import { PageWrapper } from '@/components/PageWrapper';
import { ProForm } from '@/components/ProForm';
import { FormOption } from '@/components/ProForm/interface';
import { ProTable } from '@/components/ProTable';
import { Column, ProTableIns } from '@/components/ProTable/interface';
import { useFormDrawer } from '@/composables/useFormDrawer';
import { IRegional } from '@/types/modules/hosInfo';
import { NButton, NDrawer, NDrawerContent, NSpace, useDialog, useMessage } from 'naive-ui';

export const RegionalManagePage = defineComponent(() => {
  const tableColumns: Column<IRegional>[] = [
    {
      title: '区域名称',
      key: 'areaName',
      search: { el: 'input', props: { placeholder: '请输入区域名称', clearable: true } },
    },
    { title: '区域代码', key: 'areaCode', align: 'center' },
    { title: '排序', key: 'sort', align: 'center' },
    { title: '备注', key: 'remark', align: 'center' },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      width: 280,
      render: rowData => (
        <NSpace justify='center'>
          {rowData.areaLevelType !== '4' && (
            <NButton
              type='primary'
              onClick={() => onAdd({ areaLevelType: Number(rowData.areaLevelType) + 1 + '', parentId: rowData.id })}
            >
              {addBtnTextMap[Number(rowData.areaLevelType)]}
            </NButton>
          )}
          <NButton type='primary' onClick={() => onEdit({ ...rowData, sort: Number(rowData.sort) })}>
            修改
          </NButton>
          <NButton type='error' onClick={() => onDelete(rowData)}>
            删除
          </NButton>
        </NSpace>
      ),
    },
  ];
  const areaNameLabelName = computed(() => {
    const labelNameMap = ['一级', '二级', '三级', '四级'];
    const formData = formIns.value?.getFormData();
    return (labelNameMap[Number(formData?.areaLevelType) - 1] ?? '一级') + '区域名称';
  });
  const formOptions = computed<FormOption<IRegional>[]>(() => [
    {
      label: areaNameLabelName.value,
      path: 'areaName',
      span: 24,
      type: 'input',
      props: { placeholder: `请输入${areaNameLabelName.value}`, clearable: true },
      rule: { required: true, message: `请输入${areaNameLabelName.value}`, trigger: 'blur' },
    },
    {
      label: '区域代码',
      path: 'areaCode',
      span: 24,
      type: 'input',
      props: { placeholder: '保存后自动生成', disabled: true },
    },
    {
      label: '排序',
      path: 'sort',
      span: 24,
      type: 'inputNumber',
      props: { placeholder: '请输入排序', min: 0, class: 'w-full' },
      rule: { required: true, message: '请输入排序', trigger: 'blur', type: 'number' },
    },
    {
      label: '备注',
      path: 'remark',
      span: 24,
      type: 'input',
      props: { placeholder: '请输入备注', type: 'textarea' },
    },
  ]);
  const { formIns, onAdd, onEdit, visible, title, onClose } = useFormDrawer<IRegional>();
  const addBtnTextMap = ['', '新增二级区域', '新增三级区域', '新增四级区域'];
  const message = useMessage();
  const onConfirm = () => {
    formIns.value?.validate(async error => {
      if (error) return;
      const formData = formIns.value?.getFormData() ?? {};
      await saveHospAreaInfo({ ...formData, isEnable: '1' });
      message.success('保存成功');
      tableIns.value?.refresh();
      onClose();
    });
  };
  const dialog = useDialog();
  const onDelete = (rowData: IRegional) => {
    dialog.warning({
      title: '提示',
      content: '此操作将永久删除该区域及其下属区域数据，是否继续?',
      negativeText: '取消',
      positiveText: '确定',
      onPositiveClick: async () => {
        await deleteHospAreaInfo({ id: rowData.id });
        message.success('删除成功');
        tableIns.value?.refresh();
      },
    });
  };
  const tableIns = ref<ProTableIns<IRegional> | null>(null);
  return () => (
    <PageWrapper>
      <ProTable
        ref={tableIns}
        onAdd={() => onAdd({ parentId: 0, areaLevelType: '1' })}
        requestApi={queryHospAreaInfoByLevelPage}
        columns={tableColumns}
        searchShow={{ add: { label: '新增一级区域' }, batchDelete: false }}
      />
      <NDrawer placement='right' v-model:show={visible.value} width='auto'>
        <NDrawerContent title={title.value} closable nativeScrollbar={false}>
          {{
            default: () => <ProForm formOptions={formOptions.value} ref={formIns} />,
            footer: () => (
              <>
                <NSpace justify='end'>
                  <NButton onClick={onClose}>取消</NButton>
                  <NButton type='primary' onClick={onConfirm}>
                    确认
                  </NButton>
                </NSpace>
              </>
            ),
          }}
        </NDrawerContent>
      </NDrawer>
    </PageWrapper>
  );
});
