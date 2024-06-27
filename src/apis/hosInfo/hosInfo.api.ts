import { IHosInfo } from '@/types/modules/hosInfo';
import { request } from '@/utils/request';

export const queryHospHospitalInfo = () =>
  request<IHosInfo>({
    url: 'hosp/hospHospitalInfo/queryHospHospitalInfo',
    method: 'post',
  });

export const saveHospHospitalInfo = (data: Partial<IHosInfo>) =>
  request({
    url: 'hosp/hospHospitalInfo/saveHospHospitalInfo',
    method: 'post',
    data,
  });
