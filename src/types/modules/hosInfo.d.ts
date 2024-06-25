export interface IWaitArea {
  id: number;
  waitAreaName: string;
  waitAreaPosition: string;
  isEnable: string;
  pinyin: string;
  waitAreaCode: string;
  waitRuleTemplateId: number;
  remark: string;
  intercomReceptionId: number;
}

export interface IWaitAreaTemplate {
  createTime: string;
  createUser: string;
  id: number;
  isEnable: string;
  isEnableLockBatchSignIn: string;
  isEnableRepeatHangUp: string;
  isEnableShowLockSick: string;
  lockJoinQueueLocation: string;
  remark: string;
  ruleTemplateName: string;
  sort: number;
  updateTime: string;
  updateUser: string;
}

export interface IWaitAreaTemplateUsage {
  attribute: string;
  content: {
    createTime: string;
    createUser: string;
    id: number;
    intercomReceptionId: number;
    isEnable: string;
    pinyin: string;
    remark: string;
    updateTime: string;
    updateUser: string;
    waitAreaCode: string;
    waitAreaFlag: string;
    waitAreaName: string;
    waitAreaPosition: string;
    waitRuleTemplateId: number;
  }[];
  pageUrl: string;
}
