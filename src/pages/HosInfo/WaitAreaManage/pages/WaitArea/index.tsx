import { PageWrapper } from '@/components/PageWrapper';
import { NButton, NCard, NSpace, NModal } from 'naive-ui';
import { queryWaitQueueInfo } from '@/apis/hosInfo/waitArea.api';
import { ProTable } from '@/components/ProTable';
import { ProForm } from '@/components/ProForm';
import { useConfig } from './useConfig';
export const WaitAreaPage = defineComponent({
  setup() {
    const {
      tableColumns,
      showModal,
      modalTitle,
      onAdd,
      formOptions,
      formIns,
      onBatchDelete,
      tableIns,
      formRules,
      onConfirm,
      getSoiIntercomReceptionList,
      getWaitAreaTemplateList,
    } = useConfig();

    getSoiIntercomReceptionList();
    getWaitAreaTemplateList();

    return () => (
      <PageWrapper>
        <ProTable
          columns={tableColumns}
          requestApi={queryWaitQueueInfo}
          onAdd={onAdd}
          onBatchDelete={onBatchDelete}
          ref={tableIns}
        />
        <NModal v-model:show={showModal.value}>
          <NCard title={modalTitle.value} class='w-auto' closable onClose={() => (showModal.value = false)}>
            {{
              footer: () => (
                <>
                  <NSpace justify='end'>
                    <NButton onClick={() => (showModal.value = false)}>取消</NButton>
                    <NButton type='primary' onClick={onConfirm}>
                      确认
                    </NButton>
                  </NSpace>
                </>
              ),
              default: () => <ProForm formOptions={formOptions.value} ref={formIns} rules={formRules} />,
            }}
          </NCard>
        </NModal>
      </PageWrapper>
    );
  },
});
