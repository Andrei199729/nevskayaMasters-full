import {
  POST_REGISTER_SUCCESS,
  POST_REGISTER_REQUEST,
  POST_REGISTER_FAILED,
  SET_AUTH_LOGGED_IN,
  POST_LOGIN_REQUEST,
  POST_LOGIN_FAILED,
  SET_USER_DATA,
  GET_ABOUT_USER_SUCCESS,
  GET_ABOUT_USER_REQUEST,
  GET_ABOUT_USER_FAILED,
  POST_REFRESH_TOKEN_SUCCESS,
  POST_REFRESH_TOKEN_FAILED,
  POST_REFRESH_TOKEN_REQUEST,
  POST_LOGOUT_REQUEST,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_FAILED,
} from '../constants/constants';
import {TLogout, TUser, TUserData, TUserWrapper} from '../types/data';
import {AppDispatch, AppThunk} from '../types/index';
import {deleteKeychain, getKeychain, setKeychain} from '../../utils/keychain';
import auth from '../../utils/auth';
import api from '../../utils/api';
import {accessToken} from '../../utils/constants';
// Типизация экшенов
export interface IPostRegisterSuccessAction {
  readonly type: typeof POST_REGISTER_SUCCESS;
  readonly userData: TUserWrapper;
}

export interface IPostRegisterRequestAction {
  readonly type: typeof POST_REGISTER_REQUEST;
}
export interface IPostRegisterFailedAction {
  readonly type: typeof POST_REGISTER_FAILED;
  readonly error: string;
}

export interface ISetAuthLoggedInAction {
  readonly type: typeof SET_AUTH_LOGGED_IN;
  readonly authloggedIn: boolean;
}

export interface IPostLoginRequestAction {
  readonly type: typeof POST_LOGIN_REQUEST;
}
export interface IPostLoginFailedAction {
  readonly type: typeof POST_LOGIN_FAILED;
  readonly error: string;
}

export interface ISetUserData {
  readonly type: typeof SET_USER_DATA;
  readonly userData: TUserWrapper | null;
  readonly accessToken: string | undefined;
}

export interface IGetAboutUserSuccessAction {
  readonly type: typeof GET_ABOUT_USER_SUCCESS;
}

export interface IGetAboutUserRequestAction {
  readonly type: typeof GET_ABOUT_USER_REQUEST;
}

export interface IGetAboutUserFailedAction {
  readonly type: typeof GET_ABOUT_USER_FAILED;
  readonly error: string;
}

export interface IPostRefressTokenSuccessAction {
  readonly type: typeof POST_REFRESH_TOKEN_SUCCESS;
}

export interface IPostRefressTokenRequestAction {
  readonly type: typeof POST_REFRESH_TOKEN_REQUEST;
}
export interface IPostRefressTokenFailedAction {
  readonly type: typeof POST_REFRESH_TOKEN_FAILED;
  readonly error: string;
}

export interface IPostLogoutSuccessAction {
  readonly type: typeof POST_LOGOUT_SUCCESS;
  readonly tokenLogout: TLogout[];
}

export interface IPostLogoutRequestAction {
  readonly type: typeof POST_LOGOUT_REQUEST;
}
export interface IPostLogoutFailedAction {
  readonly type: typeof POST_LOGOUT_FAILED;
  readonly error: string;
}

// Объединяем в Union
export type TUserAction =
  | IPostRegisterSuccessAction
  | IPostRegisterRequestAction
  | IPostRegisterFailedAction
  | ISetAuthLoggedInAction
  | IPostLoginRequestAction
  | IPostLoginFailedAction
  | ISetUserData
  | IGetAboutUserSuccessAction
  | IGetAboutUserRequestAction
  | IGetAboutUserFailedAction
  | IPostRefressTokenRequestAction
  | IPostRefressTokenSuccessAction
  | IPostRefressTokenFailedAction
  | IPostLogoutSuccessAction
  | IPostLogoutRequestAction
  | IPostLogoutFailedAction;

// Генераторы экшенов
export const postRegisterSuccess = (
  userData: TUserWrapper,
): IPostRegisterSuccessAction => ({
  type: POST_REGISTER_SUCCESS,
  userData,
});

export const postRegisterRequest = (): IPostRegisterRequestAction => ({
  type: POST_REGISTER_REQUEST,
});

export const postRegisterFailed = (
  error: string,
): IPostRegisterFailedAction => ({
  type: POST_REGISTER_FAILED,
  error,
});

export const postLoginRequest = (): IPostLoginRequestAction => ({
  type: POST_LOGIN_REQUEST,
});

export const postLoginFailed = (error: string): IPostLoginFailedAction => ({
  type: POST_LOGIN_FAILED,
  error,
});

export const setAuthloggedIn = (
  authloggedIn: boolean,
): ISetAuthLoggedInAction => ({
  type: SET_AUTH_LOGGED_IN,
  authloggedIn,
});

export const setUserData = (
  userData: TUserWrapper | null,
  accessToken: string | undefined,
): ISetUserData => ({
  type: SET_USER_DATA,
  userData,
  accessToken,
});

export const getAboutUserRequestAction = (): IGetAboutUserRequestAction => ({
  type: GET_ABOUT_USER_REQUEST,
});

export const getAboutUserSuccessAction = (): IGetAboutUserSuccessAction => ({
  type: GET_ABOUT_USER_SUCCESS,
});

export const getAboutUserFailedAction = (
  error: string,
): IGetAboutUserFailedAction => ({
  type: GET_ABOUT_USER_FAILED,
  error,
});

export const postRefressTokenSuccess = (): IPostRefressTokenSuccessAction => ({
  type: POST_REFRESH_TOKEN_SUCCESS,
});

export const postRefressTokenRequest = (): IPostRefressTokenRequestAction => ({
  type: POST_REFRESH_TOKEN_REQUEST,
});

export const postRefressTokenFailed = (
  error: string,
): IPostRefressTokenFailedAction => ({
  type: POST_REFRESH_TOKEN_FAILED,
  error,
});

export const postLogoutRequestAction = (): IPostLogoutRequestAction => ({
  type: POST_LOGOUT_REQUEST,
});

export const postLogoutSuccessAction = (
  tokenLogout: TLogout[],
): IPostLogoutSuccessAction => ({
  type: POST_LOGOUT_SUCCESS,
  tokenLogout,
});

export const postLogoutFailedAction = (
  error: string,
): IPostLogoutFailedAction => ({
  type: POST_LOGOUT_FAILED,
  error,
});

export function postRegisterAuth(
  emailRegister: string,
  passwordRegister: string,
  roles: string,
) {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(postRegisterRequest());
      const res = await auth.register(emailRegister, passwordRegister, roles);
      dispatch(postRegisterSuccess(res));
      dispatch(setAuthloggedIn(true));
      return {success: true, email: res.email};
    } catch (error: any) {
      dispatch(postRegisterFailed(error.message || 'Ошибка регистрации'));
      return {success: false, error: error.message || 'Ошибка регистрации'};
    }
  };
}

export function postLoginAuth(emailRegister: string, passwordRegister: string) {
  return async function (dispatch: AppDispatch) {
    dispatch(postLoginRequest());
    try {
      const res = await auth.login(emailRegister, passwordRegister);
      dispatch(setUserData(res, res.accessToken));
      dispatch(setAuthloggedIn(true));
      await setKeychain('accessToken', res.accessToken);
      await setKeychain('refreshToken', res.refreshToken);
      api.setToken(res.accessToken);
    } catch (error: any) {
      dispatch(postLoginFailed(error.message || 'Ошибка авторизации'));
      return {success: false, error: error.message || 'Ошибка авторизации'};
    }
  };
}

export function getUserData() {
  return async function (dispatch: AppDispatch) {
    dispatch(getAboutUserRequestAction());
    try {
      const accessToken = await getKeychain('accessToken');

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      api.setToken(accessToken); // ✅ установить токен в API перед запросом
      const res = await api.getAboutUser();
      dispatch(setUserData(res, res.accessToken));
      dispatch(setAuthloggedIn(true));
    } catch (error: any) {
      dispatch(getAboutUserFailedAction(error.message));
    }
  };
}

export function postTokenRefresh(refreshToken: string) {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(postRefressTokenRequest());
      const res = await auth.postRefreshToken(refreshToken);
      await dispatch(getUserData());
      await setKeychain('accessToken', res.accessToken);
      await setKeychain('refreshToken', res.refreshToken);
    } catch (error: any) {
      dispatch(postRefressTokenFailed(error.message));
    }
  };
}

export function postLogoutAuth(token: string | undefined) {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(postLogoutRequestAction());
      await auth
        .postLogout(token)
        .then(res => {
          deleteKeychain('accessToken');
          deleteKeychain('refreshToken');
          dispatch(postLogoutSuccessAction(res));

          dispatch(setUserData(null, undefined));
        })
        .catch(error => dispatch(postLogoutFailedAction(error)));
    } catch (error: any) {
      dispatch(postLogoutFailedAction(error));
    }
  };
}

export const checkUserAuth = () => {
  return async (dispatch: AppDispatch) => {
    if (await accessToken) {
      dispatch(getUserData())
        .then(res => console.log(res, 'getUserData'))
        .catch(() => {
          deleteKeychain('accessToken');
          deleteKeychain('refreshToken');
          dispatch(setUserData(null, undefined));
        })
        .finally(() => dispatch(setAuthloggedIn(true)));
    } else {
      dispatch(setAuthloggedIn(true));
    }
  };
};
