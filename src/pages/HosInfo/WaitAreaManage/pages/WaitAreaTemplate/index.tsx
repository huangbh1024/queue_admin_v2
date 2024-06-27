import { queryWaitAreaRuleTemplateListByPage } from '@/apis/hosInfo/waitAreaTemplate.api';
import { PageWrapper } from '@/components/PageWrapper';
import { ProForm } from '@/components/ProForm';
import { ProTable } from '@/components/ProTable';
import { NButton, NDrawer, NDrawerContent, NSpace } from 'naive-ui';
import { useConfig } from './useConfig';

export const WaitAreaTemplatePage = defineComponent(() => {
  const { columns, onAdd, visible, title, formOptions, formIns, tableIns, onConfirm, onClose } = useConfig();
  return () => (
    <PageWrapper>
      <ProTable
        ref={tableIns}
        searchShow={{ batchDelete: false, add: { label: '添加规则模板' } }}
        columns={columns}
        requestApi={queryWaitAreaRuleTemplateListByPage}
        onAdd={onAdd}
      />
      <NDrawer placement='right' v-model:show={visible.value} width='auto'>
        <NDrawerContent title={title.value} closable nativeScrollbar={false}>
          {{
            footer: () => (
              <NSpace justify='end'>
                <NButton onClick={onClose}>取消</NButton>
                <NButton type='primary' onClick={onConfirm}>
                  确认
                </NButton>
              </NSpace>
            ),
            default: () => <ProForm formOptions={formOptions.value} ref={formIns} />,
          }}
        </NDrawerContent>
      </NDrawer>
    </PageWrapper>
  );
});
