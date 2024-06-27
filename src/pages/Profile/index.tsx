import { PageWrapper } from '@/components/PageWrapper';
import { useAuthStore } from '@/stores/modules/auth.store';
import { NAvatar, NButton, NCard, NDrawer, NDrawerContent, NEl, NGi, NGrid, NSpace, NTag, NText } from 'naive-ui';
import defaultHead from '@/assets/imgs/defaultHead.png';
import { IHosInfo } from '@/types/modules/hosInfo';
import { queryHospHospitalInfo } from '@/apis/hosInfo/hosInfo.api';
import { ProForm } from '@/components/ProForm';
import { useConfig } from './useConfig';
import { usePublicStore } from '@/stores/modules/public.store';

export const ProfilePage = defineComponent(() => {
  const { userInfo } = storeToRefs(useAuthStore());
  const hosInfo = ref<IHosInfo>({} as IHosInfo);
  const queryHosInfo = async () => {
    const { data } = await queryHospHospitalInfo();
    hosInfo.value = data;
  };
  queryHosInfo();
  const { uploadBaseURL } = storeToRefs(usePublicStore());
  const { formOptions, visible, onEdit, title, onClose, formIns, onSave } = useConfig();

  return () => (
    <PageWrapper>
      <NGrid cols={6} xGap={12}>
        <NGi span={2}>
          <NCard
            title='用户信息'
            headerExtra={() => (
              <NButton
                color='rgba(48, 65, 86, 0.8)'
                size='small'
                onClick={() => onEdit(Object.assign({}, userInfo.value))}
              >
                修改
              </NButton>
            )}
            segmented={{ content: true }}
          >
            <NSpace vertical align='center'>
              <NAvatar
                round
                class='w-120px h-120px'
                src={userInfo.value?.userPic ? uploadBaseURL.value + userInfo.value.userPic : defaultHead}
                fallbackSrc={defaultHead}
              />
              <NText class='text-20px font-bold'>{userInfo.value?.userName}</NText>
              <NSpace vertical>
                <NText class='text-16px'>职工姓名: {userInfo.value?.userRealname}</NText>
                <NText class='text-16px'>职工工号: {userInfo.value?.userOutNo}</NText>
                <NText class='text-16px'>职工职称: {userInfo.value?.userProfessional}</NText>
                <NText class='text-16px'>
                  职工角色:{' '}
                  {userInfo.value?.roleList.map(item => (
                    <NTag type='success' key={item.id} class='mr-4px last:mr-0'>
                      {item.roleName}
                    </NTag>
                  ))}
                </NText>
              </NSpace>
            </NSpace>
            <NSpace vertical class='mt-12px'>
              <NText class='text-18px font-bold'>个人简介</NText>
              <NText>{userInfo.value?.remark ? userInfo.value.remark : '暂无'}</NText>
            </NSpace>
          </NCard>
        </NGi>
        <NGi span={4}>
          <NCard title='医院信息' segmented={{ content: true }}>
            <NSpace vertical align='center'>
              <NText class='font-bold text-24px'>
                {hosInfo.value.hospitalName ? hosInfo.value.hospitalName : '暂无医院名称'}
              </NText>
            </NSpace>
            <NEl v-html={hosInfo.value.hospitalNote ? hosInfo.value.hospitalNote : '<p>暂无医院介绍</p>'}></NEl>
          </NCard>
        </NGi>
      </NGrid>
      <NDrawer placement='right' v-model:show={visible.value} width='auto'>
        <NDrawerContent title={title.value} closable nativeScrollbar={false}>
          {{
            default: () => <ProForm ref={formIns} formOptions={formOptions} />,
            footer: () => (
              <NSpace>
                <NButton onClick={onClose}>取消</NButton>
                <NButton type='primary' onClick={onSave}>
                  保存
                </NButton>
              </NSpace>
            ),
          }}
        </NDrawerContent>
      </NDrawer>
    </PageWrapper>
  );
});
