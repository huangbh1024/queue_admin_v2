<script lang="ts" setup generic="T extends Record<string, any> = object">
import {
  NCard,
  dataTableProps,
  NInput,
  NSelect,
  NDataTable,
  NForm,
  NFormItem,
  NSpace,
  NButton,
  DataTableProps,
  DataTableRowKey,
  ButtonProps,
} from 'naive-ui';
import { PropType } from 'vue';
import { Column } from './interface';
import { isUndefined } from 'lodash-es';

type MakeRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
type SearchShowObj = { label?: string; type?: ButtonProps['type']; event?: () => void };
type SearchShowItem = boolean | SearchShowObj;
interface IProps extends DataTableProps {
  columns?: Column<T>[];
  requestApi: (params: any) => any;
  searchShow?: { add?: SearchShowItem; search?: SearchShowItem; batchDelete?: SearchShowItem };
}

const props = defineProps({
  ...dataTableProps,
  columns: { type: Array as PropType<IProps['columns']>, default: () => [] },
  requestApi: { type: Function as PropType<IProps['requestApi']>, required: true },
  searchShow: {
    type: Object as PropType<IProps['searchShow']>,
    default: () => ({
      add: true,
      search: true,
      batchDelete: true,
    }),
  },
});
const emits = defineEmits<{
  add: [];
  batchDelete: [value: T[]];
}>();
const pagination = reactive({ page: 1, itemCount: 0, pageSize: 10 });
const loading = ref(false);
const data = ref([]) as Ref<T[]>;
const searchParams = reactive<Record<string, any>>({});
const queryData = async () => {
  loading.value = true;
  const {
    data: { records, total },
  } = await props.requestApi({ pageNum: pagination.page, pageSize: pagination.pageSize, ...searchParams });
  data.value = records;
  pagination.itemCount = total;
  loading.value = false;
};
const onSearch = () => {
  pagination.page = 1;
  queryData();
};
const onBatchDelete = () => {
  const rowKeysData = data.value.filter(item => rowKeys.value.includes(item.id));
  emits('batchDelete', rowKeysData);
};
onMounted(queryData);
const onUpdatePage = (page: number) => {
  if (!loading.value) {
    pagination.page = page;
    queryData();
  }
};
const searchColumnsFiltered = computed(
  () => (props.columns?.filter(item => item.search) ?? []) as MakeRequired<Column<T>, 'search'>[],
);

const getSearchKey = (item: (typeof searchColumnsFiltered.value)[number]) => {
  if (item.search.searchKey) return item.search.searchKey as string;
  return ('key' in item ? item.key ?? '' : '') as string;
};
const rowKeys = ref<DataTableRowKey[]>([]);

const formComponentsMap = {
  input: NInput,
  select: NSelect,
};
const defaultSearchBtnMap = new Map<'search' | 'add' | 'batchDelete', Required<SearchShowObj>>([
  ['search', { type: 'default', label: '搜索', event: onSearch }],
  ['add', { type: 'primary', label: '新增', event: () => emits('add') }],
  ['batchDelete', { type: 'error', label: '批量删除', event: onBatchDelete }],
]);
const searchBtnJudge = (item?: SearchShowItem) => {
  if (isUndefined(item)) return true;
  return item;
};
const getSearchBtnOption = (type: 'search' | 'add' | 'batchDelete', item?: SearchShowItem) => {
  if (isUndefined(item) || typeof item === 'boolean') return defaultSearchBtnMap.get(type)!;
  return { ...defaultSearchBtnMap.get(type), ...item };
};
defineExpose({ refresh: queryData });
</script>

<template>
  <NCard>
    <NDataTable
      v-bind="$props"
      remote
      :columns="columns"
      :pagination="pagination"
      :loading="loading"
      :data="data"
      @update-page="onUpdatePage"
      v-model:checked-row-keys="rowKeys"
      :row-key="rowData => rowData.id"
    />
    <template #header>
      <NForm inline :show-label="false" :show-feedback="false">
        <NFormItem v-for="(item, index) in searchColumnsFiltered" :key="index">
          <component
            :is="formComponentsMap[item.search.el]"
            v-model:value="searchParams[getSearchKey(item)]"
            v-bind="item.search.props as any"
          />
        </NFormItem>
        <NFormItem>
          <NSpace>
            <NButton
              :type="getSearchBtnOption('search', searchShow?.search).type"
              @click="getSearchBtnOption('search', searchShow?.search).event"
              v-if="searchBtnJudge(searchShow?.search)"
              >{{ getSearchBtnOption('search', searchShow?.search).label }}</NButton
            >
            <NButton
              :type="getSearchBtnOption('add', searchShow?.add).type"
              @click="getSearchBtnOption('add', searchShow?.add).event"
              v-if="searchBtnJudge(searchShow?.add)"
              >{{ getSearchBtnOption('add', searchShow?.add).label }}</NButton
            >
            <NButton
              :type="getSearchBtnOption('batchDelete', searchShow?.batchDelete).type"
              @click="getSearchBtnOption('batchDelete', searchShow?.batchDelete).event"
              v-if="searchBtnJudge(searchShow?.batchDelete)"
              >{{ getSearchBtnOption('batchDelete', searchShow?.batchDelete).label }}</NButton
            >
          </NSpace>
        </NFormItem>
      </NForm>
    </template>
  </NCard>
</template>
