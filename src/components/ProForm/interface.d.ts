import type { SelectProps, InputProps, SwitchProps, FormItemGiProps, FormInst, InputNumberProps } from 'naive-ui';

interface TypeToPropsMap {
  select: SelectProps;
  input: InputProps;
  switch: SwitchProps;
  inputNumber: InputNumberProps;
}
export type FormOption<T extends Record<string, any> = object> = {
  [K in keyof TypeToPropsMap]: {
    type?: K;
    props?: TypeToPropsMap[K] & { class?: string };
    render?: (rowData: T) => JSX.Element;
    path?: keyof T;
  };
}[keyof TypeToPropsMap] &
  FormItemGiProps;

export interface ProFormIns<T extends Record<string, any> = object> extends FormInst {
  getFormData: () => T;
  setFormData: (data: T) => void;
}
