export type TUser = {
  email: string;
  roles: string;
  _id: string;
  __v: number;
};

export type TUserUpdate = TUser & {
  password: string;
};

export type TUserData = {
  success: boolean;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  user: TUser;
  _id: string;
};

export type TUserWrapper = {
  data: TUserData;
};

export type TLogout = {success: boolean; message: string};
export interface IApartment {
  id: number;
  createdAt: Date;
  formApplication: any;
}
