import { IRegional } from '@/types/modules/hosInfo';
import { request } from '@/utils/request';

export const queryHospAreaInfoByLevelPage = (
  data: Partial<{
    areaCode: string;
    areaId: number;
    areaLevelType: string;
    areaName: string;
    isEnable: string;
    pageNum: number;
    pageSize: number;
  }>,
) => request({ url: 'hosp/HospAreaInfo/queryHospAreaInfoByLevelPage', method: 'post', data });

export const saveHospAreaInfo = (data: Partial<IRegional>) =>
  request({
    url: 'hosp/HospAreaInfo/saveHospAreaInfo',
    method: 'post',
    data,
  });

export const deleteHospAreaInfo = (data: { id: number }) =>
  request({
    url: 'hosp/HospAreaInfo/deleteHospAreaInfo',
    method: 'post',
    data,
  });
