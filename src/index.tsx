//* *********************************************************** */
//  React and other npm's packages imports
//* *********************************************************** */

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import apiMiddleware from './stores/middlewares/apiMiddelware';

//* *********************************************************** */
//  Styles imports
//* *********************************************************** */

import './index.scss';

//* *********************************************************** */
//  Custom components imports
//* *********************************************************** */

import App from './components/App/App'

//* *********************************************************** */
//  Redux Reducers imports
//* *********************************************************** */

import AppReducer from './stores/reducers/WorkspacesReducer';

//* *********************************************************** */
//  Creates the store
//* *********************************************************** */

const store = createStore(AppReducer, applyMiddleware(apiMiddleware));

//* *********************************************************** */
//  Provides the redux store to the App component and render
//  it to the root element
//* *********************************************************** */

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
