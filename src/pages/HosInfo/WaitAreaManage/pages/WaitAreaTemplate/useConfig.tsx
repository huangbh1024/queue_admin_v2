import {
  batchDeleteWaitAreaTemplateRuleInfo,
  queryWaitAreaRuleTemplateUsage,
  saveWaitAreaTemplateRuleInfo,
  updateWaitAreaTemplateRuleInfo,
} from '@/apis/hosInfo/waitAreaTemplate.api';
import { DictValueTag } from '@/components/DictValueTag';
import { FormOption } from '@/components/ProForm/interface';
import { Column, ProTableIns } from '@/components/ProTable/interface';
import { useFormDrawer } from '@/composables/useFormDrawer';
import { usePublicStore } from '@/stores/modules/public.store';
import { IWaitAreaTemplate } from '@/types/modules/hosInfo';
import { NSpace, NButton, useMessage, useDialog, NAlert, NTable } from 'naive-ui';

export const useConfig = () => {
  const { formIns, visible, title, onAdd, onEdit, onClose } = useFormDrawer<IWaitAreaTemplate>();
  const { dictAll } = storeToRefs(usePublicStore());
  const message = useMessage();
  const dialog = useDialog();
  const tableIns = ref<ProTableIns<IWaitAreaTemplate> | null>(null);
  const onDelete = async (rowData: IWaitAreaTemplate) => {
    const { data } = await queryWaitAreaRuleTemplateUsage({ id: rowData.id });
    if (!data.content.length) {
      dialog.warning({
        content: '此操作将永久删除该数据，是否继续？',
        title: '提示',
        positiveText: '确认',
        negativeText: '取消',
        onPositiveClick: async () => {
          await batchDeleteWaitAreaTemplateRuleInfo([rowData.id]);
          message.success('删除成功');
          tableIns.value?.refresh();
        },
      });
      return;
    }
    dialog.warning({
      content: () => (
        <>
          <NAlert type='warning' class='mb-12px'>
            <span class='text-red font-bold'>
              无法删除！以下内容已绑定此规则模板，请先根据页面路径进行解绑，解绑后可删除
            </span>
          </NAlert>
          <NTable>
            <thead>
              <tr>
                <th>序号</th>
                <th>页面路径</th>
                <th>属性</th>
                <th>内容</th>
              </tr>
            </thead>
            <tbody>
              {data.content.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{data.pageUrl}</td>
                  <td>{data.attribute}</td>
                  <td>{item.waitAreaName}</td>
                </tr>
              ))}
            </tbody>
          </NTable>
        </>
      ),
      title: '提示',
      showIcon: false,
      class: 'w-700px!',
    });
  };
  const columns: Column<IWaitAreaTemplate>[] = [
    { title: '序号', key: 'index', align: 'center', width: 80, render: (_, rowIndex) => <span>{rowIndex + 1}</span> },
    {
      title: '规则模板名称',
      key: 'ruleTemplateName',
      align: 'center',
      search: { el: 'input', props: { placeholder: '请输入规则模板名称', clearable: true } },
    },
    { title: '排序', key: 'sort', align: 'center' },
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
          <NButton type='primary' onClick={() => onEdit(rowData)}>
            编辑
          </NButton>
          {rowData.id !== 1 && (
            <NButton type='error' onClick={() => onDelete(rowData)}>
              删除
            </NButton>
          )}
        </NSpace>
      ),
    },
  ];
  const isEnableLockBatchSignIn = computed(() => {
    const formData = formIns.value?.getFormData() ?? {};
    return formData.isEnableLockBatchSignIn === '1';
  });
  const formOptions = computed<FormOption<IWaitAreaTemplate>[]>(() => [
    {
      span: 24,
      label: '规则模板名称',
      path: 'ruleTemplateName',
      type: 'input',
      props: { placeholder: '请输入规则模板名称' },
      rule: { required: true, message: '请输入规则模板名称', trigger: 'blur' },
    },
    {
      span: 24,
      label: '排序',
      path: 'sort',
      type: 'inputNumber',
      props: { placeholder: '请输入排序', class: 'w-full', min: 1 },
      rule: { required: true, message: '请输入排序', trigger: 'blur', type: 'number' },
    },
    {
      span: 12,
      label: '批量签到锁定',
      path: 'isEnableLockBatchSignIn',
      type: 'switch',
      props: { checkedValue: '1', uncheckedValue: '0' },
    },
    {
      span: 12,
      label: '锁定入队',
      path: 'lockJoinQueueLocation',
      type: 'select',
      props: {
        placeholder: '请选择锁定入队',
        options: dictAll.value['lock_join_queue_type'] as any,
        labelField: 'dictValue',
        valueField: 'dictCode',
      },
      privateShow: isEnableLockBatchSignIn.value,
    },
    {
      span: 12,
      label: '锁定患者显示',
      path: 'isEnableShowLockSick',
      type: 'switch',
      props: { checkedValue: '1', uncheckedValue: '0' },
      privateShow: isEnableLockBatchSignIn.value,
    },
    {
      span: 12,
      label: '复诊时保持锁定',
      path: 'isEnableRepeatHangUp',
      type: 'switch',
      props: { checkedValue: '1', uncheckedValue: '0' },
      privateShow: isEnableLockBatchSignIn.value,
    },
    {
      span: 24,
      label: '是否启用',
      path: 'isEnable',
      type: 'switch',
      props: { checkedValue: '1', uncheckedValue: '0' },
    },
  ]);

  const onConfirm = () => {
    formIns.value?.validate(async error => {
      if (error) return;
      const formData = formIns.value?.getFormData() ?? {};
      const api = formData.id ? updateWaitAreaTemplateRuleInfo : saveWaitAreaTemplateRuleInfo;
      await api(formData);
      message.success('保存成功');
      onClose();
      tableIns.value?.refresh();
    });
  };
  return { columns, onAdd, visible, title, formOptions, formIns, tableIns, onConfirm, onClose };
};
