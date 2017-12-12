import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Get the createStore method as well as the applyMiddleware method from redux.
import { createStore, applyMiddleware } from 'redux';

// createStore needs a reducer. More specifically, a root reducer.
import RootReducer from './reducers/RootReducer';

// We are going to need AJAX a lot. We will use it in our
// redux actions which means... we need redux-promise.
import reduxPromise from 'redux-promise';

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
