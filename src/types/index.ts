import { IRole } from './modules/system';

export interface UserInfo {
  createTime: string;
  createUser: string;
  deptId: number;
  errorLoginNumber: number;
  id: number;
  isDelete: string;
  isEnable: string;
  lastLoginTime: string;
  phone: string;
  remark: string;
  roleIdList: number[];
  roleList: IRole[];
  token: string;
  updateTime: string;
  updateUser: string;
  userAddress: string;
  userBirthday: string;
  userDuty: string;
  userIdcard: string;
  userName: string;
  userNameKey: string;
  userNote: string;
  userOutNo: string;
  userPassword: string;
  userPic: string;
  userProfessional: string;
  userRealname: string;
  userSex: string;
  userSpeciality: string;
  userType: string;
}

export interface Menu {
  id: number;
  menuName: string;
  menuUrl: string;
  parentId: number;
  menuLever: number;
  isEnable: string;
}
