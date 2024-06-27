export interface IDict {
  createTime: string;
  createUser: string;
  dictCode: string;
  dictId: number;
  dictType: string;
  dictTypeName: string;
  dictValue: string;
  id: number;
  isEnable: string;
  remark: string;
  sort: number;
  updateTime: string;
  updateUser: string;
}

export interface IRole {
  createTime: string;
  createUser: string;
  id: number;
  isEnable: string;
  menuIdList: number[];
  menuList: {
    createTime: string;
    createUser: string;
    id: number;
    isEnable: string;
    menuLever: number;
    menuName: string;
    menuUrl: string;
    parentId: number;
    remark: string;
    sort: number;
    updateTime: string;
    updateUser: string;
  }[];
  onlineProjectType: string;
  remark: string;
  roleCode: string;
  roleName: string;
  updateTime: string;
  updateUser: string;
}
