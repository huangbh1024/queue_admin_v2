import { queryWaitAreaRuleTemplateListByPage } from '@/apis/hosInfo/waitAreaTemplate.api';
import { PageWrapper } from '@/components/PageWrapper';
import { ProForm } from '@/components/ProForm';
import { ProTable } from '@/components/ProTable';
import { NButton, NCard, NModal, NSpace } from 'naive-ui';
import { useConfig } from './useConfig';

export const WaitAreaTemplatePage = defineComponent(() => {
  const { columns, onAdd, showModal, modalTitle, formOptions, formIns, tableIns, onConfirm } = useConfig();
  return () => (
    <PageWrapper>
      <ProTable
        ref={tableIns}
        searchShow={{ batchDelete: false, add: { label: '添加规则模板' } }}
        columns={columns}
        requestApi={queryWaitAreaRuleTemplateListByPage}
        onAdd={onAdd}
      />
      <NModal v-model:show={showModal.value}>
        <NCard title={modalTitle.value} class='w-auto' closable onClose={() => (showModal.value = false)}>
          {{
            footer: () => (
              <NSpace justify='end'>
                <NButton onClick={() => (showModal.value = false)}>取消</NButton>
                <NButton type='primary' onClick={onConfirm}>
                  确认
                </NButton>
              </NSpace>
            ),
            default: () => <ProForm formOptions={formOptions.value} ref={formIns} />,
          }}
        </NCard>
      </NModal>
    </PageWrapper>
  );
});
