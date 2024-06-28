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

export interface IHosInfo {
  bedNum: number;
  createTime: string;
  createUser: string;
  deviceNumLicense: string;
  dmidecodeUUID: string;
  hospitalAddress: string;
  hospitalExpiryDate: string;
  hospitalLevel: string;
  hospitalLogoPic: string;
  hospitalName: string;
  hospitalNote: string;
  hospitalTelephone: string;
  id: number;
  license: string;
  moduleLicense: string;
  orgCode: string;
  projectCode: string;
  remark: string;
  updateTime: string;
  updateUser: string;
}

export interface IRegional {
  areaCode: string;
  areaLevelType: string;
  areaName: string;
  children: IRegional[];
  createTime: string;
  createUser: string;
  id: number;
  isEnable: string;
  parentId: number;
  remark: string;
  sort: string | number; // 后端是string,string组件会警告,所以改成number
  updateTime: string;
  updateUser: string;
}
