import {IProductRoom} from '../../shared/types';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_CONNECTION_START,
  WS_DISCONNECT,
} from '../actions-types/wsActionTypes';

export interface IWebSocket {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
  wsSend: string;
  wsDisconnect: string;
}

export interface IWsMessage {
  rooms: IProductRoom[];
  success: boolean;
  total: number;
  totalToday: number;
}

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: Event | string;
}

export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly error: boolean;
  readonly errorMessage: null | string;
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string;
}

export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsConnectionMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IWsMessage;
}

export interface IWsSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
}

export interface IWsDisconnect {
  readonly type: typeof WS_DISCONNECT;
}

export type TWsConnectionAction =
  | IWsConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsConnectionClosedAction
  | IWsConnectionMessageAction
  | IWsSendMessageAction
  | IWsConnectionStartAction
  | IWsDisconnect;

export const wsConnectionStartAction = (
  url: Event | string,
): IWsConnectionStartAction => {
  return {
    type: WS_CONNECTION_START,
    payload: url,
  };
};

export const wsConnectionSuccess = (
  error: boolean,
  errorMessage: null | string,
): IWsConnectionSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS,
    error,
    errorMessage,
  };
};

export const wsConnectionError = (error: string): IWsConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR,
    payload: error,
  };
};

export const wsConnectionClosed = (): IWsConnectionClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetMessage = (
  message: IWsMessage,
): IWsConnectionMessageAction => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  };
};

export const disconnect = (): IWsDisconnect => ({
  type: WS_DISCONNECT,
});
