import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import queryString from 'query-string';

import config from './config';

import {setChannel} from './actions/video';

import App from './containers/app';

import app from './reducers';

const store = createStore(
  app,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.dispatch(setChannel(queryString.parse(location.search).v || 'shrimpcam'));

ReactDOM.render(
  <Provider store={store}>
    <App {...config.shrimps} />
  </Provider>,
  document.getElementById('react')
);
