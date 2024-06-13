export interface UserInfo {
  id: number;
  userName: string;
  userPic: string;
  token: string;
  roleList: Array<{ id: number; roleName: string }>;
}

export interface Menu {
  id: number;
  menuName: string;
  menuUrl: string;
  parentId: number;
  menuLever: number;
  isEnable: string;
}
