// lib imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
// app imports
import { MainLayout } from './layouts/main-layout';
import NotFoundContainer from './containers/not-found/index';
import TopPhotosContainer from './containers/top-photos-container/index';
import FavouritePhotosContainer from './containers/favourite-photos-container/index';

import { store } from './store/index';
const history = syncHistoryWithStore(browserHistory, store) as any;

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route component={MainLayout}>
          <Route path="/" component={TopPhotosContainer} />
          <Route path="/top" component={TopPhotosContainer} />
          <Route path="/favourite" component={FavouritePhotosContainer} />
          <Route path="*" component={NotFoundContainer} />
        </Route>
      </Router>
    </Provider>
  );
}

export const app = ReactDOM.render(
  <App />, document.getElementById('app-container'),
);
