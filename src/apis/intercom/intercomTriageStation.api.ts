import { ISoiIntercomReception } from '@/types/modules/intercom';
import { request } from '@/utils/request';

export const querySoiIntercomReceptionList = (
  data: Partial<{
    isEnable: string;
    pageNum: number;
    pageSize: number;
    soiIntercomReceptionCode: string;
    soiIntercomReceptionName: string;
    waitAreaId: number;
  }>,
) =>
  request<ISoiIntercomReception[]>({
    url: 'soi/soiIntercomReception/querySoiIntercomReceptionList',
    method: 'post',
    data,
  });
