import type { DataTableColumn, SelectProps, InputProps } from 'naive-ui';
interface TypeToPropsMap {
  select: SelectProps;
  input: InputProps;
}

export type Column<T extends Record<string, any> = object> = DataTableColumn<T> &
  {
    [K in keyof TypeToPropsMap]: {
      // key?: keyof T;
      search?: { el: K; props?: TypeToPropsMap[K]; searchKey?: string };
    };
  }[keyof TypeToPropsMap];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface ProTableIns<T extends Record<string, any> = object> {
  refresh: () => Promise<void>;
}
