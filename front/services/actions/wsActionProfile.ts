import {IProductRoom} from '../../shared/types';
import {
  WS_CONNECTION_SUCCESS_PROFILE,
  WS_CONNECTION_ERROR_PROFILE,
  WS_CONNECTION_CLOSED_PROFILE,
  WS_GET_MESSAGE_PROFILE,
  WS_SEND_MESSAGE_PROFILE,
  WS_CONNECTION_START_PROFILE,
  WS_DISCONNECT_PROFILE,
} from '../actions-types/wsActionTypes';

export interface IWsMessageProfile {
  rooms: Array<IProductRoom>;
  success: boolean;
}

export interface IWsConnectionStartProfileAction {
  readonly type: typeof WS_CONNECTION_START_PROFILE;
  readonly payload: string;
}

export interface IWsConnectionSuccessProfileAction {
  readonly type: typeof WS_CONNECTION_SUCCESS_PROFILE;
}

export interface IWsConnectionErrorProfileAction {
  readonly type: typeof WS_CONNECTION_ERROR_PROFILE;
  readonly payload: null | string;
}

export interface IWsConnectionClosedProfileAction {
  readonly type: typeof WS_CONNECTION_CLOSED_PROFILE;
}

export interface IWsConnectionMessageProfileAction {
  readonly type: typeof WS_GET_MESSAGE_PROFILE;
  readonly payload: IWsMessageProfile;
}

export interface IWsSendMessageProfileAction {
  readonly type: typeof WS_SEND_MESSAGE_PROFILE;
}

export interface IWsDisconnectProfile {
  readonly type: typeof WS_DISCONNECT_PROFILE;
}

export type TWsConnectionProfileAction =
  | IWsConnectionSuccessProfileAction
  | IWsConnectionErrorProfileAction
  | IWsConnectionClosedProfileAction
  | IWsConnectionMessageProfileAction
  | IWsSendMessageProfileAction
  | IWsConnectionStartProfileAction
  | IWsDisconnectProfile;

export const wsConnectionStartAction = (
  url: string,
): IWsConnectionStartProfileAction => {
  return {
    type: WS_CONNECTION_START_PROFILE,
    payload: url,
  };
};

export const wsConnectionSuccess = (): IWsConnectionSuccessProfileAction => {
  return {
    type: WS_CONNECTION_SUCCESS_PROFILE,
  };
};

export const wsConnectionError = (
  error: null | string,
): IWsConnectionErrorProfileAction => {
  return {
    type: WS_CONNECTION_ERROR_PROFILE,
    payload: error,
  };
};

export const wsConnectionClosed = (): IWsConnectionClosedProfileAction => {
  return {
    type: WS_CONNECTION_CLOSED_PROFILE,
  };
};

export const wsGetMessage = (
  message: IWsMessageProfile,
): IWsConnectionMessageProfileAction => {
  return {
    type: WS_GET_MESSAGE_PROFILE,
    payload: message,
  };
};

export const disconnectProfile = (): IWsDisconnectProfile => ({
  type: WS_DISCONNECT_PROFILE,
});
