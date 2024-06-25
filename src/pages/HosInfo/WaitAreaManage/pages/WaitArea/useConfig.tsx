import { addWaitAreaInfo, updateWaitQueueInfo, deleteWaitQueueInfo } from '@/apis/hosInfo/waitArea.api';
import { queryWaitAreaRuleTemplateList } from '@/apis/hosInfo/waitAreaTemplate.api';
import { querySoiIntercomReceptionList } from '@/apis/intercom/intercomTriageStation.api';
import { DictValueTag } from '@/components/DictValueTag';
import { FormOption } from '@/components/ProForm/interface';
import { Column, ProTableIns } from '@/components/ProTable/interface';
import { useFormModal } from '@/composables/useFormModal';
import { useDictStore } from '@/stores/modules/dict.store';
import { IWaitArea, IWaitAreaTemplate } from '@/types/modules/hosInfo';
import { ISoiIntercomReception } from '@/types/modules/intercom';
import { FormRules, NButton, NSpace, useDialog, useMessage } from 'naive-ui';
import { pinyin } from 'pinyin-pro';

export const useConfig = () => {
  const { showModal, modalTitle, onAdd, onEdit, formIns } = useFormModal<Partial<IWaitArea>>();
  const { dictAll } = storeToRefs(useDictStore());
  const tableIns = ref<ProTableIns<IWaitArea> | null>(null);
  const dialog = useDialog();
  const message = useMessage();
  const onBatchDelete = (value: IWaitArea[]) => {
    if (!value.length) return message.warning('请先选中需要删除的数据');
    dialog.warning({
      content: '此操作将永久删除选中的数据，是否继续？',
      title: '提示',
      positiveText: '确认',
      negativeText: '取消',
      onPositiveClick: async () => {
        await deleteWaitQueueInfo({ idList: value.map(item => item.id).join(',') });
        message.success('删除成功');
        tableIns.value?.refresh();
      },
    });
  };
  const onDelete = (rowData: IWaitArea) => {
    dialog.warning({
      content: '此操作将永久删除该数据，是否继续？',
      title: '提示',
      positiveText: '确认',
      negativeText: '取消',
      onPositiveClick: async () => {
        await deleteWaitQueueInfo({ idList: rowData.id.toString() });
        message.success('删除成功');
        tableIns.value?.refresh();
      },
    });
  };
  const tableColumns: Column<IWaitArea>[] = [
    { type: 'selection' },
    { title: '序号', key: 'index', align: 'center', width: 80, render: (_, rowIndex) => <span>{rowIndex + 1}</span> },
    { title: '候诊区编号', key: 'waitAreaCode', align: 'center' },
    {
      title: '候诊区名称',
      key: 'waitAreaName',
      align: 'center',
      search: { el: 'input', props: { placeholder: '请输入候诊区名称', clearable: true } },
    },
    { title: '位置', key: 'waitAreaPosition', align: 'center' },
    { title: '备注', key: 'remark', align: 'center' },
    {
      title: '是否启用',
      key: 'isEnable',
      align: 'center',
      render: rowData => <DictValueTag value={rowData.isEnable} dict={dictAll.value['is_flag_dict']} />,
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      width: 180,
      render: rowData => (
        <NSpace justify='center'>
          <NButton onClick={() => onEdit(rowData)} type='primary'>
            编辑
          </NButton>
          <NButton type='error' onClick={() => onDelete(rowData)}>
            删除
          </NButton>
        </NSpace>
      ),
    },
  ];
  // 获取对讲分诊台
  const soiIntercomReceptionList = ref<ISoiIntercomReception[]>([]);
  const getSoiIntercomReceptionList = async () => {
    const { data } = await querySoiIntercomReceptionList({});
    soiIntercomReceptionList.value = data;
  };
  // 获取候诊区规则模板
  const waitAreaTemplateList = ref<IWaitAreaTemplate[]>([]);
  const getWaitAreaTemplateList = async () => {
    const { data } = await queryWaitAreaRuleTemplateList({});
    waitAreaTemplateList.value = data;
  };
  const formOptions = computed<FormOption<IWaitArea>[]>(() => [
    {
      span: 12,
      label: '候诊区编号',
      path: 'waitAreaCode',
      type: 'input',
      props: { placeholder: '保存后自动生成', disabled: true },
    },
    {
      span: 12,
      label: '候诊区名称',
      path: 'waitAreaName',
      type: 'input',
      props: {
        placeholder: '请输入候诊区名称',
        clearable: true,
        onInput: value => {
          const py = pinyin(value, { pattern: 'first', toneType: 'none' }).replace(/\s*/g, '').toUpperCase();
          const formData = formIns.value?.getFormData();
          formIns.value?.setFormData({ ...formData, pinyin: py });
        },
      },
    },
    {
      span: 12,
      label: '拼音码',
      path: 'pinyin',
      type: 'input',
      props: { placeholder: '自动生成，中文大写首字母', disabled: true },
    },
    {
      span: 12,
      label: '位置',
      path: 'waitAreaPosition',
      type: 'input',
      props: { placeholder: '请输入候诊区位置', clearable: true },
    },
    {
      span: 12,
      label: '诊区规则模板',
      path: 'waitRuleTemplateId',
      type: 'select',
      props: {
        placeholder: '请选择诊区规则模板',
        options: waitAreaTemplateList.value,
        labelField: 'ruleTemplateName',
        valueField: 'id',
      },
    },
    {
      span: 12,
      label: '关联对讲分诊台',
      path: 'intercomReceptionId',
      type: 'select',
      props: {
        placeholder: '请选择关联分诊台',
        clearable: true,
        options: soiIntercomReceptionList.value,
        labelField: 'intercomReceptionName',
        valueField: 'id',
      },
    },
    {
      span: 24,
      label: '备注',
      path: 'remark',
      type: 'input',
      props: { type: 'textarea', placeholder: '请输入备注' },
    },
    {
      span: 24,
      label: '是否启用',
      path: 'isEnable',
      type: 'switch',
      props: { checkedValue: '1', uncheckedValue: '0' },
    },
  ]);
  const formRules: FormRules = {
    waitAreaName: [{ required: true, message: '请输入候诊区名称', trigger: 'blur' }],
    pinyin: [{ required: true, message: '自动生成，请先输入候诊区名称', trigger: 'change' }],
    waitRuleTemplateId: [{ required: true, message: '请选择候诊区规则模板', trigger: 'change', type: 'number' }],
  };
  const onConfirm = () => {
    formIns.value?.validate(async error => {
      if (error) return;
      const formData = formIns.value?.getFormData() ?? {};
      const api = formData.id ? updateWaitQueueInfo : addWaitAreaInfo;
      await api(formData);
      message.success('保存成功');
      showModal.value = false;
      tableIns.value?.refresh();
    });
  };

  return {
    tableColumns,
    showModal,
    onAdd,
    modalTitle,
    formOptions,
    formIns,
    onBatchDelete,
    tableIns,
    formRules,
    onConfirm,
    getSoiIntercomReceptionList,
    getWaitAreaTemplateList,
  };
};
