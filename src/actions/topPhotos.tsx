import {
  LOAD_TOP_PHOTOS_SUCCESS, SELECT_ITEM, ADD_TO_FAVOURITE, LOADING_STARTED,
  CLIENT_OFFLINE
} from '../constants/index';
import axios from 'axios';
import { dataTransform } from '../utils/index';

export function loadTopPhotosSuccess(photos: any, page: number) {
  return {
    type: LOAD_TOP_PHOTOS_SUCCESS,
    photos: photos,
    page: page,
  };
}

export function handleLoading() {
  return {
    type: LOADING_STARTED
  }
}

export function clientOffline() {
  return {
    type: CLIENT_OFFLINE
  }
}

export function loadTopPhotos(page: number = 1) {
  return function (dispatch: any) {

    dispatch(handleLoading());

    if (!navigator.onLine) {
      dispatch(clientOffline());
      return;
    }

    return axios.get('https://api.500px.com/v1/photos?feature=popular&image_size=3&' +
     'consumer_key=ci6nA26aaqaDSb6YnJLPHVP3BoGSBIqdLI3NNMdz&page=' + page).then(res => {
     dispatch(loadTopPhotosSuccess(dataTransform(res.data.photos), res.data.current_page));
    }).catch(error => {
     throw(error);

    });
  };
}

export function selectItem(id: number) {
  return {
    type: SELECT_ITEM,
    id: id,
  };
}

export function addToFavourite() {
  return {
    type: ADD_TO_FAVOURITE,
  };
}
