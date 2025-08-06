import {combineReducers} from 'redux';
import {authReducer} from './user';
import {roomReducer} from './room';

export const rootReducer = combineReducers({
  user: authReducer,
  room: roomReducer,
  //   ws: wsReducer,
  //   wsProfile: wsReducerProfile,
});
