import { ToolTipper } from '@/components/ActionIcon/components/Tooltipper';
import { Icon } from '@/components/Icon';
import {
  FormInst,
  NAlert,
  NAvatar,
  NButton,
  NEl,
  NForm,
  NFormItem,
  NInput,
  NPopover,
  NSpace,
  useDialog,
  useMessage,
} from 'naive-ui';
import { useAuthStore } from '@/stores/modules/auth.store';
import { queryHospHospitalInfo, saveHospHospitalInfo } from '@/apis/hosInfo/hosInfo.api';
import { IHosInfo } from '@/types/modules/hosInfo';
import defaultHead from '@/assets/imgs/defaultHead.png';
import { usePublicStore } from '@/stores/modules/public.store';

export const UserInfoBtn = defineComponent({
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const { userInfo } = storeToRefs(authStore);
    const { uploadBaseURL } = storeToRefs(usePublicStore());

    const onLogout = () => {
      authStore.logoutMethod();
      router.push({ path: '/login' });
    };
    const dialog = useDialog();
    const message = useMessage();
    const onClickVersionInfo = () => {
      dialog.create({
        content: () => <NAlert type='info'>版本号: {import.meta.env.VITE_PROJECT_VERSION}</NAlert>,
        title: import.meta.env.VITE_PROJECT_NAME,
        showIcon: false,
      });
    };
    const hosInfo = ref<IHosInfo>({} as IHosInfo);
    const formInst = ref<FormInst | null>(null);
    const onClickAuthInfo = async () => {
      const { data } = await queryHospHospitalInfo();
      hosInfo.value = data;
      if (hosInfo.value) {
        dialog.create({
          title: '授权信息',
          content: () => (
            <NForm labelPlacement='left' ref={formInst}>
              <NFormItem label='组织代码' rule={{ message: '请输入组织代码', required: true, trigger: 'blur' }}>
                <NInput placeholder='请输入组织代码' v-model:value={hosInfo.value.orgCode} />
              </NFormItem>
              <NFormItem label='产品代码' rule={{ message: '请输入产品代码', required: true, trigger: 'blur' }}>
                <NInput placeholder='请输入产品代码' v-model:value={hosInfo.value.projectCode} />
              </NFormItem>
              <NFormItem label='序列号'>
                <NAlert type='info' class='w-full!'>
                  {hosInfo.value.dmidecodeUUID ? hosInfo.value.dmidecodeUUID : '暂未查询到序列号'}
                </NAlert>
              </NFormItem>
              <NFormItem label='有效期'>
                <NAlert type='info' class='w-full!'>
                  {hosInfo.value.hospitalExpiryDate ? hosInfo.value.hospitalExpiryDate : '暂未查询到有效期'}
                </NAlert>
              </NFormItem>
              <NFormItem label='注册码'>
                <NInput type='textarea' placeholder='请输入注册码' v-model:value={hosInfo.value.license} />
              </NFormItem>
            </NForm>
          ),
          positiveText: '保存',
          negativeText: '取消',
          onPositiveClick: () => {
            formInst.value?.validate(async error => {
              if (error) return;
              await saveHospHospitalInfo(hosInfo.value);
              message.success('保存成功');
              window.location.reload();
            });
          },
          showIcon: false,
        });
      }
    };
    return () => (
      <NPopover trigger='click' showArrow={false}>
        {{
          trigger: () => (
            <ToolTipper tooltipText='用户信息'>
              <NEl
                tag='div'
                class='rounded-3xl p-2 pr-2 justify-between h-12 w-24 bg-[var(--action-color)] hover:bg-[var(--hover-color)]'
              >
                <div class='flex flex-row'>
                  <div class='flex-1 flex items-center justify-center'>
                    <NAvatar
                      round
                      src={userInfo.value?.userPic ? uploadBaseURL.value + userInfo.value.userPic : defaultHead}
                      fallbackSrc={defaultHead}
                    />
                  </div>
                  <div class='flex-1 flex items-center justify-center'>
                    <Icon name='i-tabler:user' class='text-center text-[var(--text-color-base)] text-xl' size={24} />
                  </div>
                </div>
              </NEl>
            </ToolTipper>
          ),
          header: () => (
            <>
              <h4 class='mb-1'>
                <span class='font-bold'>你好, </span>
                <span>{userInfo.value?.userName ?? ''}</span>
              </h4>
              <p>角色列表: [{userInfo.value?.roleList.map(item => item.roleName).join(',') ?? ''}]</p>
            </>
          ),
          footer: () => (
            <NButton block quaternary onClick={onLogout}>
              退出登录
            </NButton>
          ),
          default: () => (
            <NSpace vertical>
              <NButton block quaternary onClick={() => router.push('/profile')}>
                个人中心
              </NButton>
              <NButton block quaternary>
                帮助中心
              </NButton>
              <NButton block quaternary onClick={onClickAuthInfo}>
                授权信息
              </NButton>
              <NButton block quaternary onClick={onClickVersionInfo}>
                版本信息
              </NButton>
            </NSpace>
          ),
        }}
      </NPopover>
    );
  },
});
