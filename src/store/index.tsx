declare var window: Window & { devToolsExtension: any };
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/index';
import { loadTopPhotos } from '../actions/topPhotos';

export const store = createStore(
  rootReducer,
  window.devToolsExtension && window.devToolsExtension(),
  applyMiddleware(thunk),
);

store.dispatch(loadTopPhotos());

// window.str = store;

// systemjs-hot-reloader hook, rehydrating the state of redux store
export function __reload(exports: any) {
  console.log(exports.store.getState());
}
