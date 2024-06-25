<script lang="ts" setup generic="T extends Record<string, any> = object">
import {
  NInput,
  NSelect,
  NSwitch,
  NForm,
  NGrid,
  NFormItemGi,
  FormProps,
  formProps,
  FormInst,
  NInputNumber,
} from 'naive-ui';
import { FormOption } from './interface';
import { PropType } from 'vue';

interface IProps extends FormProps {
  formOptions: FormOption<T>[];
}

defineProps({
  ...formProps,
  formOptions: { type: Array as PropType<IProps['formOptions']>, required: true },
});

const formData = ref({}) as Ref<T>;
const setFormData = (data: T) => {
  formData.value = data;
};
const getFormData = () => formData.value;
const formComponentsMap = {
  input: NInput,
  select: NSelect,
  switch: NSwitch,
  inputNumber: NInputNumber,
};
const renderFormItem = (item: FormOption<T>) => {
  if (item.render) return item.render(formData.value);
  else if (item.type)
    return h(formComponentsMap[item.type] as any, {
      ...item.props,
      value: formData.value[item.path ?? ''],
      onUpdateValue: (value: any) => {
        formData.value[item.path ?? ''] = value;
      },
    });
  else return null;
};
const { get, has } = Reflect;
const formRef = ref<FormInst | null>(null);
const _expose = new Proxy(
  { setFormData, getFormData }, // 这里可以添加自己需要暴露的一些方法
  {
    get(target, key) {
      return get(target, key) ?? get(formRef.value || {}, key);
    },
    has(target, get) {
      return has(target, get) || has(formRef.value || {}, get);
    },
  },
);
defineExpose(_expose);
</script>

<template>
  <NForm v-bind="$props" :model="formData" ref="formRef">
    <NGrid :cols="24" :x-gap="24">
      <NFormItemGi v-for="(item, index) in formOptions" :key="index" v-bind="item">
        <component :is="renderFormItem(item)" />
      </NFormItemGi>
    </NGrid>
  </NForm>
</template>
