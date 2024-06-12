export interface UserInfo {
  id: number;
  userName: string;
  userPic: string;
  token: string;
  roleList: Array<{ id: number; roleName: string }>;
}
