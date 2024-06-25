import { IWaitArea, IWaitAreaTemplateUsage } from '@/types/modules/hosInfo';
import { request } from '@/utils/request';

export const queryWaitQueueInfo = (data: { pageNum: number; pageSize: number; waitAreaName?: string }) =>
  request<{
    records: IWaitArea[];
    total: number;
  }>({
    url: 'hosp/hospWaitAreaInfo/queryWaitQueueInfo',
    method: 'post',
    data,
  });

export const addWaitAreaInfo = (data: Partial<IWaitArea>) =>
  request({
    url: 'hosp/hospWaitAreaInfo/addWaitAreaInfo',
    method: 'post',
    data,
  });

export const updateWaitQueueInfo = (data: Partial<IWaitArea>) =>
  request({
    url: 'hosp/hospWaitAreaInfo/updateWaitQueueInfo',
    method: 'post',
    data,
  });

export const deleteWaitQueueInfo = (data: { idList: string }) =>
  request<IWaitAreaTemplateUsage>({ url: 'hosp/hospWaitAreaInfo/deleteWaitQueueInfo', method: 'post', data });
