import { NCard, NDivider, NEl, NModal, NScrollbar, NText } from 'naive-ui';
import styles from './index.module.css';
import { Icon } from '../Icon';
import { isWindows } from '@/utils/platformUtils';
import { useSearchDialog } from '@/composables/useSearchDialog';
import { VueHighlighter } from './utils';
import { useMenuStore } from '@/stores/modules/menu.store';
import { getNonParentMenus, resolvePath } from '@/utils/menuUtils';

export const SearchDialog = defineComponent({
  setup() {
    const menuStore = useMenuStore();
    const router = useRouter();
    const { roleMenuList } = storeToRefs(menuStore);

    // 对roleMenuList进行处理，获取不是别人parent的数据
    const noParentMenuList = computed(() => getNonParentMenus(roleMenuList.value));

    const isDialogVisible = ref(false);
    const SearchIcon = 'tabler:search';
    const CloseIcon = 'tabler:x';
    const ArrowEnterIcon = 'fluent:arrow-enter-left-24-regular';
    const ArrowSortIcon = 'fluent:arrow-sort-24-regular';

    const openDialog = (e?: MouseEvent) => {
      if (!isDialogVisible.value) {
        isDialogVisible.value = true;
        resetValues();
      }
      return e;
    };

    const closeDialog = () => {
      isDialogVisible.value = false;
      resetValues();
    };

    onMounted(() => {
      const keys = useMagicKeys({
        passive: false,
        onEventFired(e) {
          if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
          }
        },
      });
      const ActiveCMD = isWindows() ? keys['ctrl+k'] : keys['cmd+k'];
      const EnterCMD = keys['enter'];
      const DownCMD = keys['down'];
      const UpCMD = keys['up'];
      useSearchDialog().trigger(openDialog);
      whenever(ActiveCMD, () => {
        openDialog();
      });
      whenever(EnterCMD, () => {
        const route = filterMenuList.value[activeItem.value];
        if (route) {
          router.push({ path: resolvePath(roleMenuList.value, route.menuUrl) });
          closeDialog();
        }
      });
      whenever(UpCMD, () => {
        updateActiveItem('up');
      });
      whenever(DownCMD, () => {
        updateActiveItem('down');
      });
    });

    const activeItem = ref(-1);
    const updateActiveItem = (type?: 'up' | 'down', index?: number) => {
      if (index !== undefined) {
        activeItem.value = index;
        return;
      }
      const length = noParentMenuList.value.length;
      if (type === 'up') {
        if (activeItem.value <= 0) {
          activeItem.value = length - 1;
        } else {
          activeItem.value--;
        }
      }
      if (type === 'down') {
        if (activeItem.value >= length - 1) {
          activeItem.value = 0;
        } else {
          activeItem.value++;
        }
      }
    };
    const onClickItem = (index: number) => {
      updateActiveItem(undefined, index);
      const item = filterMenuList.value[index];
      if (item) {
        router.push({ path: resolvePath(roleMenuList.value, item.menuUrl) });
        closeDialog();
      }
    };

    const searchKey = ref('');
    const keywords = computed<string[]>(() => searchKey.value.split(' ').filter(k => k));

    const filterMenuList = computed(() => {
      if (keywords.value.length === 0) {
        return noParentMenuList.value;
      }
      return noParentMenuList.value.filter(item => {
        const titleMatch = keywords.value.some(k => item.menuName.includes(k));
        return titleMatch;
      });
    });

    const resetValues = () => {
      searchKey.value = '';
      activeItem.value = -1;
    };

    return () => (
      <NModal v-model:show={isDialogVisible.value} class={styles['search-dialog']}>
        <NCard
          class='w-[650px]'
          content-style='padding: 0;'
          bordered={false}
          size='huge'
          role='dialog'
          aria-modal='true'
        >
          <div class={[styles['search-dialog-action-bar'], 'rounded-2xl']}>
            <div class={[styles['search-input'], 'flex items-center gap-5 px-5 h-12']}>
              <Icon size={16} name={SearchIcon} />
              <input
                v-model={searchKey.value}
                class='grow bg-transparent outline-none border-none'
                placeholder='搜索'
              />
              <NText code style='white-space: nowrap'>
                ESC
              </NText>
              <Icon size={20} name={CloseIcon} class='cursor-pointer' onClick={closeDialog} />
            </div>
            <NDivider class='my-0!' />
            <NScrollbar style='height: 400px'>
              <div class={styles['content-wrap']}>
                <div class={styles['group']}>
                  <div class={styles['group-title']}>应用程序</div>
                  <NEl class={styles['group-list']}>
                    {filterMenuList.value.map((item, index) => (
                      <>
                        <div
                          class={[
                            styles['item'],
                            'flex items-center my-2',
                            activeItem.value === index && styles['active'],
                          ]}
                          onClick={() => onClickItem(index)}
                        >
                          <NEl class={styles['icon']}>
                            <Icon size={18} name='i-mdi-monitor-dashboard' />
                          </NEl>
                          <div class={[styles['title'], 'grow']}>
                            <VueHighlighter
                              highlightClassName='highlight'
                              autoEscape
                              textToHighlight={item.menuName}
                              searchWords={keywords.value}
                            />
                          </div>
                          <div class={styles['label']}>快捷方式</div>
                        </div>
                      </>
                    ))}
                  </NEl>
                </div>
              </div>
            </NScrollbar>
            <NDivider class='my-0!' />
            <NEl class='flex items-center justify-center space-x-4 py-2 text-xs'>
              <div class='flex items-center space-x-1'>
                <NEl class='w-4 h-4 bg-[var(--code-color)] rounded flex-center'>
                  <Icon name={ArrowEnterIcon} size={12} />
                </NEl>
                <span class='opacity-70'>选择</span>
              </div>
              <div class='flex items-center space-x-1'>
                <NEl class='w-4 h-4 bg-[var(--code-color)] rounded flex-center'>
                  <Icon name={ArrowSortIcon} size={12} />
                </NEl>
                <span class='opacity-70'>导航</span>
              </div>
            </NEl>
          </div>
        </NCard>
      </NModal>
    );
  },
});
