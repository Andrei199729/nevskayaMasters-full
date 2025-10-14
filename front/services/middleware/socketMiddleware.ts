import {Middleware} from 'redux';
import {IWebSocket} from '../actions/wsAction';
import {RootState} from '../types';

export const socketMiddleware = (
  wsActions: IWebSocket,
): Middleware<{}, RootState> => {
  return store => {
    let socket: WebSocket | null = null;

    return next => action => {
      const {dispatch} = store;
      const {type} = action;
      const {
        wsInit,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsSend,
        wsDisconnect,
      } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(action.payload);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({type: onOpen});
        };

        socket.onerror = () => {
          dispatch({type: onError, payload: 'Error'});
        };

        socket.onmessage = event => {
          const {data} = event;
          const parsedData = JSON.parse(data);
          console.log(`Получены данные: ${data}`);
          console.log(`Получены данные: ${parsedData}`);
          dispatch({type: onMessage, payload: parsedData});
        };

        socket.onclose = event => {
          dispatch({type: onClose, payload: event});
        };

        if (type === wsSend) {
          socket.send(JSON.stringify(action.payload));
        }
        if (type === wsDisconnect) {
          socket.close();
          socket = null;
        }
      }
      next(action);
    };
  };
};
