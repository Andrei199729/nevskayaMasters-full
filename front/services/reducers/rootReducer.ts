import {combineReducers} from 'redux';
import {authReducer} from './user';

export const rootReducer = combineReducers({
  user: authReducer,
  //   ws: wsReducer,
  //   wsProfile: wsReducerProfile,
});
