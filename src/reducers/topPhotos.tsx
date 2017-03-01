import {
  LOAD_TOP_PHOTOS_SUCCESS, SELECT_ITEM, ADD_TO_FAVOURITE, LOADING_STARTED, CLIENT_OFFLINE
} from '../constants/index';
import * as _ from "lodash";
import * as Immutable from 'seamless-immutable';

const INITIAL_STATE = Immutable.from({
  topPhotos: [],
  page: 1,
  loading: false,
  clienOffline: false,
  favourite: [],
});

function topPhotosReducer(state = INITIAL_STATE, action: any) {

  let _state = null;

  switch (action.type) {

    case LOAD_TOP_PHOTOS_SUCCESS:

      _state = JSON.parse(JSON.stringify(state));
      _state.topPhotos = _state.topPhotos.concat(action.photos);
      _state.page = action.page;
      _state.loading = false;
      _state.clienOffline = false;
      return _state;

    case LOADING_STARTED:

      _state = JSON.parse(JSON.stringify(state)); //Object.assing() save references!!!
      _state.loading = true;
      return _state;

    case SELECT_ITEM:

      let _stateCopy = JSON.parse(JSON.stringify(state)); //copy without references

      const selectedItemIndex = _.findIndex(state.topPhotos, {id: action.id});

      let item:any = _stateCopy.topPhotos[selectedItemIndex];

      if (item.selected ) {
        item.selected = false;

        _stateCopy.favourite.forEach((el:any, idx:number) => {
          if (el.id === item.id) {
            _stateCopy.favourite.splice(idx, 1);
          }
        });

      } else {
        item.selected = true;
        _stateCopy.favourite.push(item);
      }

      return _stateCopy;

    case ADD_TO_FAVOURITE:

      _state = JSON.parse(JSON.stringify(state));

      _state.topPhotos.forEach((item:any) => {
        item.selected = false;
      });

      _state.favourite = [];

      return _state;

    case CLIENT_OFFLINE:

      _state = Object.assign({}, state);
      _state.clienOffline = true;
      _state.loading = false;

      return _state;

    default:
      return state;
  }
}


export default topPhotosReducer;
