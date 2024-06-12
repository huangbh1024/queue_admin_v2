import { isNil } from 'lodash-es';
import { Icon } from '.';

/**
 * 如果存在，通过删除前缀 'i-' 来规范化图标名称。
 * @param {string} icon 需要规范化的图标名称。
 * @returns {string} 返回规范化后的图标名称。
 */
export const normalizeIconName = (icon: string): string => {
  if (icon.startsWith('i-')) {
    icon = icon.replace(/^i-/, '');
  }
  return icon;
};

export const renderIcon = (icon: Component | string) => {
  if (isNil(icon)) return;
  if (typeof icon === 'string') return () => h(Icon, { name: normalizeIconName(icon) });
  return () => h(Icon, null, { default: () => h(icon) });
};
