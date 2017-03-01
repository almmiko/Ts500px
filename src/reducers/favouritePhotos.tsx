import {
  SAVE_FAVOURITE, SELECT_FAVOURITE_ITEM, DELETE_FAVOURITE_ITEM,
} from '../constants/index';
import * as _ from 'lodash';
import * as Immutable from 'seamless-immutable';
import { appStorage } from '../services/local-storage/app-store';

const INITIAL_STATE = Immutable.from({
  myPhotos: appStorage().getState() || [],
  selectedItems: [],
  showDeleteBar: false,
});

function favouritePhotosReducer(state = INITIAL_STATE, action: any) {

  let _state = null;
  let _incomingData = null;

  switch (action.type) {

    case SAVE_FAVOURITE:

      _state = JSON.parse(JSON.stringify(state));
      _incomingData = JSON.parse(JSON.stringify(action.favouritePhotos));

      _incomingData.forEach((item:any) => {
        item.selected = false;
      });

      if (!_state.myPhotos.length) {
        _state.myPhotos = _state.myPhotos.concat(_incomingData);
        appStorage().saveState(_state.myPhotos);
        return _state;
      }

      let result = [];

      for( let i in _incomingData ) {
        let shared = false;
        for (let j in _state.myPhotos) {
          if (_state.myPhotos[j].id === _incomingData[i].id) {
            shared = true;
            break;
          }
        }
        if(!shared) result.push(_incomingData[i]);
      }

      result = result.concat(_state.myPhotos);

      _state.myPhotos = result;

      appStorage().saveState(_state.myPhotos);

      return _state;


    case SELECT_FAVOURITE_ITEM:

      let _stateCopy = JSON.parse(JSON.stringify(state));
      const selectedItemIndex = _.findIndex(_stateCopy.myPhotos, {id: action.id});
      let item:any = _stateCopy.myPhotos[selectedItemIndex];

      if (item.selected ) {
        item.selected = false;

        _stateCopy.selectedItems.forEach((el:any, idx: number) => {
          if (el.id === item.id) {
            _stateCopy.selectedItems.splice(idx, 1);
          }
        });

        if (!_stateCopy.selectedItems.length) {
          _stateCopy.showDeleteBar = false;
        }

      } else {
        item.selected = true;
        _stateCopy.selectedItems.push(item);
        _stateCopy.showDeleteBar = true;
      }

      return _stateCopy;

    case DELETE_FAVOURITE_ITEM:

      _state = JSON.parse(JSON.stringify(state));

      // delete all elements optimization
      if (_state.myPhotos.length === _state.selectedItems.length) {
        _state.myPhotos = [];
        _state.selectedItems = [];

        appStorage().saveState([]);
      }

      for( let i = _state.myPhotos.length - 1; i >= 0; i--) {
        for( let j = 0; j < _state.selectedItems.length; j++) {
          if(_state.myPhotos[i] && (_state.myPhotos[i].id === _state.selectedItems[j].id)) {
            _state.myPhotos.splice(i, 1);
          }
        }
      }

      _state.showDeleteBar = false;
      _state.selectedItems = [];

      appStorage().saveState(_state.myPhotos);

      return _state;

    default:
      return state;
  }
}


export default favouritePhotosReducer;
