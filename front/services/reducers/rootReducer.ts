import {combineReducers} from 'redux';
import {authReducer} from './user';
import {roomReducer} from './room';
import {modalOpenReducer} from './modalOpen';
import {drawReducer} from './draw';
import {apartmentReducer} from './apartment';

export const rootReducer = combineReducers({
  user: authReducer,
  room: roomReducer,
  modalOpen: modalOpenReducer,
  draw: drawReducer,
  apartment: apartmentReducer,
  //   ws: wsReducer,
  //   wsProfile: wsReducerProfile,
});
