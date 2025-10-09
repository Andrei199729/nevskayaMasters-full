import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../types';
import type {} from 'redux-thunk/extend-redux';

export const WS_CONNECTION_START = 'WS_CONNECTION_START' as const;
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS' as const;
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR' as const;
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED' as const;
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE' as const;
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE' as const;
export const WS_DISCONNECT = 'WS_DISCONNECT' as const;

export const WS_CONNECTION_START_PROFILE =
  'WS_CONNECTION_START_PROFILE' as const;
export const WS_CONNECTION_SUCCESS_PROFILE =
  'WS_CONNECTION_SUCCESS_PROFILE' as const;
export const WS_CONNECTION_ERROR_PROFILE =
  'WS_CONNECTION_ERROR_PROFILE' as const;
export const WS_CONNECTION_CLOSED_PROFILE =
  'WS_CONNECTION_CLOSED_PROFILE' as const;
export const WS_GET_MESSAGE_PROFILE = 'WS_GET_MESSAGE_PROFILE' as const;

export const WS_SEND_MESSAGE_PROFILE = 'WS_SEND_MESSAGE_PROFILE' as const;
export const WS_DISCONNECT_PROFILE = 'WS_DISCONNECT_PROFILE' as const;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
