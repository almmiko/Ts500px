import {SAVE_FAVOURITE, SELECT_FAVOURITE_ITEM, DELETE_FAVOURITE_ITEM} from '../constants/index';

export function saveFavourite(elements: any) {
  return {
    type: SAVE_FAVOURITE,
    favouritePhotos: elements,
  };
}

export function selectFavouriteItem(id: number) {
  return {
    type: SELECT_FAVOURITE_ITEM,
    id: id,
  };
}

export function deleteFavouritesItems() {
  return {
    type: DELETE_FAVOURITE_ITEM,
  };
}
