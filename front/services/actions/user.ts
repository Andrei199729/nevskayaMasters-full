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
  SET_LOADING,
} from '../constants/constants';
import {TLogout, TUserWrapper} from '../types/data';
import {AppDispatch} from '../types/index';
import {deleteKeychain, getKeychain, setKeychain} from '../../utils/keychain';
import auth from '../../utils/auth';
import api from '../../utils/api';
import {accessToken} from '../../utils/constants';
import {getErrorMessage} from '../../utils/errorHandler';
import {IUserDataRegister} from '../../shared/types';
// Типизация экшенов
export interface IPostRegisterSuccessAction {
  readonly type: typeof POST_REGISTER_SUCCESS;
  readonly userDataRegister: IUserDataRegister;
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
  payload: {
    userData: TUserWrapper | null;
    accessToken: string | undefined;
    refreshToken: string | undefined;
  };
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

export interface ISetLoadingAction {
  readonly type: typeof SET_LOADING;
  payload: boolean;
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
  | IPostLogoutFailedAction
  | ISetLoadingAction;

// Генераторы экшенов
export const postRegisterSuccess = (
  userDataRegister: IUserDataRegister,
): IPostRegisterSuccessAction => ({
  type: POST_REGISTER_SUCCESS,
  userDataRegister,
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

export const setUserData = (payload: {
  userData: TUserWrapper | null;
  accessToken: string | undefined;
  refreshToken: string | undefined;
}): ISetUserData => ({
  type: SET_USER_DATA,
  payload,
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

export const setLoading = (payload: boolean): ISetLoadingAction => ({
  type: SET_LOADING,
  payload,
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
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Ошибка регистрации');
      dispatch(postRegisterFailed(errorMessage || 'Ошибка регистрации'));
      return {success: false, error: errorMessage || 'Ошибка регистрации'};
    }
  };
}

export function postLoginAuth(emailRegister: string, passwordRegister: string) {
  return async function (dispatch: AppDispatch) {
    dispatch(setLoading(true));
    dispatch(postLoginRequest());
    try {
      const res = await auth.login(emailRegister, passwordRegister);

      dispatch(setAuthloggedIn(true));
      await setKeychain('accessToken', res.accessToken);
      await setKeychain('refreshToken', res.refreshToken);
      api.setToken(res.accessToken);
      dispatch(
        setUserData({
          userData: res,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        }),
      );
      dispatch(setLoading(false));
      return {success: true, message: 'Авторизация успешна'};
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Ошибка авторизации');
      dispatch(postLoginFailed(errorMessage || 'Ошибка авторизации'));
      dispatch(setLoading(false));
      return {success: false, error: errorMessage || 'Ошибка авторизации'};
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
      dispatch(
        setUserData({
          userData: res,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        }),
      );

      dispatch(setAuthloggedIn(true));
    } catch (error) {
      const errorMessage = getErrorMessage(
        error,
        'Ошибка запроса пользователя',
      );
      dispatch(getAboutUserFailedAction(errorMessage));
      return {
        success: false,
        error: errorMessage || 'Ошибка запроса пользователя',
      };
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
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Ошибка токена');

      dispatch(postRefressTokenFailed(errorMessage));
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
          dispatch(
            setUserData({
              userData: null,
              accessToken: undefined,
              refreshToken: undefined,
            }),
          );
        })
        .catch(error => dispatch(postLogoutFailedAction(error)));
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Ошибка выхода');
      dispatch(postLogoutFailedAction(errorMessage));
    }
  };
}

export const checkUserAuth = () => {
  return async (dispatch: AppDispatch) => {
    if (await accessToken) {
      dispatch(getUserData())
        .catch(() => {
          deleteKeychain('accessToken');
          deleteKeychain('refreshToken');
          dispatch(
            setUserData({
              userData: null,
              accessToken: undefined,
              refreshToken: undefined,
            }),
          );
        })
        .finally(() => dispatch(setAuthloggedIn(true)));
    } else {
      dispatch(setAuthloggedIn(true));
    }
  };
};
