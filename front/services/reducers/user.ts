import {TUserAction} from '../actions/user';
import {
  POST_REGISTER_SUCCESS,
  POST_REGISTER_REQUEST,
  POST_REGISTER_FAILED,
  SET_AUTH_LOGGED_IN,
  POST_LOGIN_FAILED,
  SET_USER_DATA,
  GET_ABOUT_USER_REQUEST,
  GET_ABOUT_USER_FAILED,
  POST_LOGOUT_FAILED,
  POST_LOGOUT_REQUEST,
  POST_LOGOUT_SUCCESS,
  //   PATCH_ABOUT_USER_SUCCESS,
  //   PATCH_ABOUT_USER_REQUEST,
  //   PATCH_ABOUT_USER_FAILED,
  //   RESET_PASSWORD_SUCCESS,
} from '../constants/constants';
import {TUser, TUserData, TUserWrapper} from '../types/data';

type TUserState = {
  userData: TUserWrapper | null;
  user: TUser | null;
  password: string;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  isAuthloggedIn: boolean;
  success: boolean;
  error: string;
};

const initialState: TUserState = {
  userData: null,
  user: null,
  password: '',
  accessToken: undefined,
  refreshToken: undefined,
  isAuthloggedIn: false,
  success: false,
  error: '',
};

export const authReducer = (
  state = initialState,
  action: TUserAction,
): TUserState => {
  switch (action.type) {
    case SET_AUTH_LOGGED_IN:
      return {
        ...state,
        isAuthloggedIn: action.authloggedIn,
      };
    case POST_REGISTER_REQUEST:
      return {
        ...state,
      };
    case POST_REGISTER_SUCCESS:
      return {
        ...state,
        userData: action.userData,
        error: '',
        success: true,
      };

    case POST_REGISTER_FAILED:
      return {
        ...state,
        error: action.error,
        success: false,
      };
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.userData,
        accessToken: action.accessToken ?? state.accessToken,
      };

    case POST_LOGIN_FAILED:
      return {
        ...state,
        error: action.error,
      };

    case GET_ABOUT_USER_REQUEST:
      return {
        ...state,
      };

    case GET_ABOUT_USER_FAILED:
      return {
        ...state,
        error: action.error,
      };

    //     case PATCH_ABOUT_USER_REQUEST:
    //       return {
    //         ...state,
    //       };
    //     case PATCH_ABOUT_USER_SUCCESS:
    //       return {
    //         ...state,
    //         user: action.updateUser,
    //       };
    //     case PATCH_ABOUT_USER_FAILED:
    //       return {
    //         ...state,
    //       };

    case POST_LOGOUT_REQUEST:
      return {
        ...state,
      };
    case POST_LOGOUT_SUCCESS:
      return {
        ...state,
        accessToken: undefined,
        userData: null,
      };
    case POST_LOGOUT_FAILED:
      return {
        ...state,
        error: action.error,
      };

    //     case RESET_PASSWORD_SUCCESS:
    //       return {
    //         ...state,
    //         success: action.success,
    //       };

    default:
      return state;
  }
};
