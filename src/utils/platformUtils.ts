import { type OS, OperatingSystem } from '@/constants/platform.constant';

/**
 * 基于用户代理检索当前环境的操作系统（OS）。
 * @returns {OS} 操作系统
 */
export const detectOperatingSystem = (): OS => {
  const { userAgent } = navigator;
  if (userAgent.includes('Win')) return OperatingSystem.Windows;
  if (userAgent.includes('Mac')) return OperatingSystem.MacOS;
  if (userAgent.includes('X11')) return OperatingSystem.UNIX;
  if (userAgent.includes('Linux')) return OperatingSystem.Linux;
  return OperatingSystem.Unknown;
};

/**
 * 检查当前环境是否为 Windows。
 * @returns {boolean} 是否为 Windows
 */
export const isWindows = (): boolean => detectOperatingSystem() === OperatingSystem.Windows;

/**
 * 检查当前环境是否为 MacOS。
 * @returns {boolean} 是否为 MacOS
 */
export const isMacOS = (): boolean => detectOperatingSystem() === OperatingSystem.MacOS;

/**
 * 检查当前环境是否为 UNIX。
 * @returns {boolean} 是否为 UNIX
 */
export const isUNIX = (): boolean => detectOperatingSystem() === OperatingSystem.UNIX;

/**
 * 检查当前环境是否为 Linux。
 * @returns {boolean} 是否为 Linux
 */
export const isLinux = (): boolean => detectOperatingSystem() === OperatingSystem.Linux;
