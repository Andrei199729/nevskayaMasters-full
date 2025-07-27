// import {TBurgerIngredientsConstructorAction} from '../actions/constructor';
// import {TBurgerIngredientsAction} from '../actions/ingredient';
// import {TIngredientDataModalAction} from '../actions/popupIngredient';
// import {TOrderAction} from '../actions/popupOrder';
import {Action} from 'redux';
import {TUserAction} from '../actions/user';
// import {TWsConnectionAction} from '../actions/wsAction';
import {rootReducer} from '../reducers/rootReducer';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
// import {TWsConnectionProfileAction} from '../actions/wsActionProfile';

type TApplicationActions = TUserAction;
//   | TWsConnectionAction
//   | TWsConnectionProfileAction;

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  unknown,
  RootState,
  Action<string>
>;

export type AppDispatch = ThunkDispatch<RootState, unknown, Action<string>>;
