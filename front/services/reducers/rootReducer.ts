import {combineReducers} from 'redux';
import {authReducer} from './user';
import {roomReducer} from './room';
import {modalOpenReducer} from './modalOpen';
import {drawReducer} from './draw';

export const rootReducer = combineReducers({
  user: authReducer,
  room: roomReducer,
  modalOpen: modalOpenReducer,
  draw: drawReducer,
  //   ws: wsReducer,
  //   wsProfile: wsReducerProfile,
});
