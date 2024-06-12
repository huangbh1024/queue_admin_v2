import { ToolTipper } from '@/components/ActionIcon/components/Tooltipper';
import { Icon } from '@/components/Icon';
import { NAvatar, NButton, NEl, NPopover } from 'naive-ui';
import { useAuthStore } from '@/stores/modules/auth.store';

export const UserInfoBtn = defineComponent({
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const { userInfo } = storeToRefs(authStore);

    const onLogout = () => {
      authStore.logoutMethod();
      router.push({ path: '/login' });
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
                    <NAvatar round />
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
            <NButton block quaternary>
              个人资料
            </NButton>
          ),
        }}
      </NPopover>
    );
  },
});
