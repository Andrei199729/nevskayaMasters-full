import {
  legacy_createStore as createStore,
  applyMiddleware,
  Middleware,
  AnyAction,
} from 'redux';
import {rootReducer} from './reducers/rootReducer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
// Явно укажем тип Middleware, чтобы избежать TS-ошибок
const logger: Middleware = () => next => (action: AnyAction) => {
  console.log('Redux action:', action);
  return next(action);
};
const middleware = [thunk, logger];
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
