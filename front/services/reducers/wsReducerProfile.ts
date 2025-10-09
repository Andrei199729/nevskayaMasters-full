import {IProductRoom} from '../../shared/types';
import {
  WS_CONNECTION_SUCCESS_PROFILE,
  WS_CONNECTION_ERROR_PROFILE,
  WS_CONNECTION_CLOSED_PROFILE,
  WS_GET_MESSAGE_PROFILE,
} from '../actions-types/wsActionTypes';

import {TWsConnectionProfileAction} from '../actions/wsActionProfile';

type TWsConnectedProfileState = {
  wsConnected: boolean;
  rooms: IProductRoom[];
  error: boolean;
  errorMessage: null | string;
};

const initialState: TWsConnectedProfileState = {
  wsConnected: false,
  rooms: [],
  error: false,
  errorMessage: null,
};

export const wsReducerProfile = (
  state = initialState,
  action: TWsConnectionProfileAction,
): TWsConnectedProfileState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS_PROFILE:
      return {
        ...state,
        error: false,
        errorMessage: null,
        wsConnected: true,
      };
    case WS_CONNECTION_ERROR_PROFILE:
      return {
        ...state,
        errorMessage: action.payload,
        error: true,
        wsConnected: false,
      };
    case WS_CONNECTION_CLOSED_PROFILE:
      return {
        ...state,
        error: false,
        wsConnected: false,
      };
    case WS_GET_MESSAGE_PROFILE:
      return {
        ...state,
        error: false,
        rooms: action.payload.rooms,
      };
    default:
      return state;
  }
};
