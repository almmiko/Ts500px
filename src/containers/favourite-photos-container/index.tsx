
import * as React from 'react';
import { connect } from 'react-redux';

import {selectFavouriteItem, deleteFavouritesItems} from '../../actions/favourite';
import { Grid } from '../../components/grid';

interface IFavouritePhotosProps {
  photos: any;
  selectItem: (id: number) => void;
  deleteFavouritesItems: () => void;
}

function mapStateToProps(state: any) {
  return {
    photos: state.favouritePhotos,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    selectItem: (id: number): void  => dispatch(selectFavouriteItem(id)),
    deleteFavouritesItems: (): void  => dispatch(deleteFavouritesItems()),
  };
}

class FavouritePhotosContainer extends React.Component<IFavouritePhotosProps, void> {

  render() {
    const { photos, selectItem, deleteFavouritesItems } = this.props;

    return (
      <div>
        {photos.selectedItems.length && photos.showDeleteBar ?
          <div className="top-photos-add-container">
            <button onClick={ () => { deleteFavouritesItems(); }  }
                    className="c-button c-button--block c-button--error">Delete selected Items</button>
          </div>
          : ''}
        <Grid topPhotos={photos.myPhotos} selectItem={selectItem} />
      </div>

    );
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FavouritePhotosContainer);
