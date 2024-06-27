import { PageWrapper } from '@/components/PageWrapper';
import { NButton, NSpace, NDrawer, NDrawerContent } from 'naive-ui';
import { queryWaitQueueInfo } from '@/apis/hosInfo/waitArea.api';
import { ProTable } from '@/components/ProTable';
import { ProForm } from '@/components/ProForm';
import { useConfig } from './useConfig';
export const WaitAreaPage = defineComponent({
  setup() {
    const {
      tableColumns,
      visible,
      title,
      onAdd,
      formOptions,
      formIns,
      onBatchDelete,
      tableIns,
      formRules,
      onConfirm,
      getSoiIntercomReceptionList,
      getWaitAreaTemplateList,
      onClose,
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
        <NDrawer placement='right' v-model:show={visible.value} width='auto'>
          <NDrawerContent title={title.value} closable nativeScrollbar={false}>
            {{
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
              default: () => <ProForm formOptions={formOptions.value} ref={formIns} rules={formRules} />,
            }}
          </NDrawerContent>
        </NDrawer>
      </PageWrapper>
    );
  },
});
