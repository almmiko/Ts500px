import * as React from 'react';
import { connect } from 'react-redux';

import { loadTopPhotos, selectItem, addToFavourite, clientOffline } from '../../actions/topPhotos';
import { saveFavourite } from '../../actions/favourite';
import { Grid } from '../../components/grid';
import { InfiniteScroll } from './components/infiniteScroll';
import { ProgressLoader } from './components/progressBar';

interface ITopPhotosProps {
  photos: any;
  loading: boolean;
  isOffline: boolean;
  loadTopPhotos: (page: number) => void;
  selectItem: (id: number) => void;
  addToFavourite: () => void;
  saveFavourite: (elements: any) => void;
  clientOffline: () => void;
}

function mapStateToProps(state: any) {
  return {
    loading: state.topPhotos.loading,
    photos: state.topPhotos,
    isOffline: state.topPhotos.clienOffline,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    loadTopPhotos: (page: number): void  => dispatch(loadTopPhotos(page)),
    selectItem:    (id: number): void  => dispatch(selectItem(id)),
    addToFavourite: (): void  => dispatch(addToFavourite()),
    saveFavourite: (elements: any): void => dispatch(saveFavourite(elements)),
    clientOffline: (): void => dispatch(clientOffline()),
  };
}

class TopPhotosContainer extends React.Component<ITopPhotosProps, void> {

  constructor(props: ITopPhotosProps) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    const {photos, loading, loadTopPhotos, clientOffline} = this.props;

    if (!loading && navigator.onLine) {
      loadTopPhotos(photos.page + 1)
    }

    if (!navigator.onLine) {
      clientOffline();
    }

  }

  render() {

    const { photos, addToFavourite, saveFavourite, selectItem, loading} = this.props;

    return (
      <div>

        {!navigator.onLine && <div className="offline">You are offline :( </div>}

        {photos.favourite.length ?
          <div className="top-photos-add-container">
            <button onClick={ () => { addToFavourite(); saveFavourite(photos.favourite);
          }  } className="c-button c-button--block c-button--success">Add to favourite</button>
          </div>
        : ''}

        <InfiniteScroll loadMore={this.loadMore} />
        <Grid topPhotos={photos.topPhotos} selectItem={selectItem} />
        {loading && <ProgressLoader />}
      </div>

    );
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopPhotosContainer);
