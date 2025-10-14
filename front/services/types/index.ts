import {TUserAction} from '../actions/user';
// import {TWsConnectionAction} from '../actions/wsAction';
import {rootReducer} from '../reducers/rootReducer';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TRoomAction} from '../actions/room';
import {TModalOpenAction} from '../actions/modalOpen';
import {TDrawAction} from '../actions/draw';

type TApplicationActions =
  | TUserAction
  | TRoomAction
  | TModalOpenAction
  | TDrawAction;
//   | TWsConnectionAction
//   | TWsConnectionProfileAction;

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;

export type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  TApplicationActions
>;
