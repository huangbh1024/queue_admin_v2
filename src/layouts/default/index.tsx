// 默认layout

import { NEl } from 'naive-ui';
import { LayoutHeader } from './components/Header';
import { LayoutSidebar } from './components/Sidebar';
import { SearchDialog } from '@/components/SearchDialog';
import { LayoutContent } from './components/Content';

export const DefaultLayout = defineComponent({
  setup() {
    return () => (
      <NEl tag='div' class='flex flex-row flex-1 h-full w-full'>
        <div>
          <LayoutSidebar />
        </div>
        <div class='flex flex-col flex-1 h-full w-full'>
          <header>
            <LayoutHeader />
          </header>
          <div class='block flex-1 h-full overflow-x-hidden rounded-2xl pl-0 pr-5 pt-0 pb-6'>
            <div class='min-h-full h-full w-full rounded-2xl bg-gray-100 p-4 dark:bg-gray-9 p-4'>
              <LayoutContent />
            </div>
          </div>
          <footer></footer>
        </div>
        <SearchDialog />
      </NEl>
    );
  },
});
