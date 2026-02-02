import {IUserData} from '../../shared/types';

export type TUser = {
  email: string;
  roles: string;
  _id: string;
  __v: number;
};

export type TUserUpdate = TUser & {
  password: string;
};

export type TUserWrapper = {
  data: IUserData;
};

export type TLogout = {success: boolean; message: string};
