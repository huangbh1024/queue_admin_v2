import { request } from '@/utils/request';

export const saveSysBusinessLicense = (data: { deviceLicense: string; moduleLicense: string }) =>
  request({ url: 'license/saveSysBusinessLicense', method: 'post', data });
