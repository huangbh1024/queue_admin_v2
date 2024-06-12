import { NSpace } from 'naive-ui';
import { CollapsedBtn, FullScreenBtn, SearchAnyWhere, UserInfoBtn } from './components';

export const LayoutHeader = defineComponent({
  setup() {
    return () => (
      <div class='flex h-16 items-center'>
        <div class='md:block px-4'>
          <CollapsedBtn />
        </div>
        <div class='flex-grow-1'></div>
        <div class='flex'>
          <NSpace>
            <SearchAnyWhere />
            <div class='flex items-center justify-center'>
              <NSpace>
                <FullScreenBtn />
              </NSpace>
            </div>
          </NSpace>
        </div>
        <div class='px-4'>
          <UserInfoBtn />
        </div>
      </div>
    );
  },
});
