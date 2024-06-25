import { IWaitAreaTemplate, IWaitAreaTemplateUsage } from '@/types/modules/hosInfo';
import { request } from '@/utils/request';

export const queryWaitAreaRuleTemplateList = (
  data: Partial<{ id: number; pageNum: number; pageSize: number; ruleTemplateName: string }>,
) =>
  request<IWaitAreaTemplate[]>({
    url: 'qcs/qcsWaitAreaRuleTemplateInfo/queryWaitAreaRuleTemplateList',
    method: 'post',
    data,
  });

export const queryWaitAreaRuleTemplateListByPage = (
  data: Partial<{ id: number; pageNum: number; pageSize: number; ruleTemplateName: string }>,
) =>
  request<{ records: IWaitAreaTemplate[]; total: number }>({
    url: 'qcs/qcsWaitAreaRuleTemplateInfo/queryWaitAreaRuleTemplateListByPage',
    method: 'post',
    data,
  });

export const saveWaitAreaTemplateRuleInfo = (data: Partial<IWaitAreaTemplate>) =>
  request({ url: 'qcs/qcsWaitAreaRuleTemplateInfo/saveWaitAreaTemplateRuleInfo', method: 'post', data });

export const updateWaitAreaTemplateRuleInfo = (data: Partial<IWaitAreaTemplate>) =>
  request({ url: 'qcs/qcsWaitAreaRuleTemplateInfo/updateWaitAreaTemplateRuleInfo', method: 'post', data });

export const queryWaitAreaRuleTemplateUsage = (
  data: Partial<{ id: number; pageNum: number; pageSize: number; ruleTemplateName: string }>,
) =>
  request<IWaitAreaTemplateUsage>({
    url: 'qcs/qcsWaitAreaRuleTemplateInfo/queryWaitAreaRuleTemplateUsage',
    method: 'post',
    data,
  });

export const batchDeleteWaitAreaTemplateRuleInfo = (data: number[]) =>
  request({ url: 'qcs/qcsWaitAreaRuleTemplateInfo/batchDeleteWaitAreaTemplateRuleInfo', method: 'post', data });
