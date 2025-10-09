import {
  legacy_createStore as createStore,
  applyMiddleware,
  Middleware,
  AnyAction,
} from 'redux';
import {rootReducer} from './reducers/rootReducer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {socketMiddleware} from './middleware/socketMiddleware';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_DISCONNECT,
  WS_CONNECTION_START_PROFILE,
  WS_CONNECTION_SUCCESS_PROFILE,
  WS_CONNECTION_CLOSED_PROFILE,
  WS_CONNECTION_ERROR_PROFILE,
  WS_GET_MESSAGE_PROFILE,
  WS_SEND_MESSAGE_PROFILE,
  WS_DISCONNECT_PROFILE,
} from './actions-types/wsActionTypes';
// Явно укажем тип Middleware, чтобы избежать TS-ошибок
const logger: Middleware = () => next => (action: AnyAction) => {
  console.log('Redux action:', action);
  return next(action);
};
const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsSend: WS_SEND_MESSAGE,
  wsDisconnect: WS_DISCONNECT,
};

const wsActionsProfile = {
  wsInit: WS_CONNECTION_START_PROFILE,
  onOpen: WS_CONNECTION_SUCCESS_PROFILE,
  onClose: WS_CONNECTION_CLOSED_PROFILE,
  onError: WS_CONNECTION_ERROR_PROFILE,
  onMessage: WS_GET_MESSAGE_PROFILE,
  wsSend: WS_SEND_MESSAGE_PROFILE,
  wsDisconnect: WS_DISCONNECT_PROFILE,
};

const middleware = [
  thunk,
  logger,
  socketMiddleware(wsActions),
  socketMiddleware(wsActionsProfile),
];
const composeEnhancers = composeWithDevTools({
  name: 'nevskayamasters',
  trace: true,
  traceLimit: 25,
});
const enhancer = __DEV__
  ? composeEnhancers(applyMiddleware(...middleware))
  : applyMiddleware(...middleware);
// Создание стора
const store = createStore(rootReducer, undefined, enhancer);
console.log(__DEV__, __DEV__);
export default store;
