import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import topPhotos from './topPhotos';
import favouritePhotos from './favouritePhotos';

const rootReducer = combineReducers({
  topPhotos,
  favouritePhotos,
  routing: routerReducer,
});

export default rootReducer;
