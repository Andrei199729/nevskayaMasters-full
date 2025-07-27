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
};

export type TLogout = {success: boolean; message: string};
