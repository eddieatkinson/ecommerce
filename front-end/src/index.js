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

// We have set up redux (just need theStore below). Now we need a way to tell react about it.
// PROVIDER!
import { Provider } from 'react-redux';

// Create the store...the ugly way.
const theStore = applyMiddleware(reduxPromise)(createStore)(RootReducer);

// Hand render the Provider and hand Provider theStore.
// Put App INSIDE of the Provider, so that everything inside of App
// will know about the Provider/store.
ReactDOM.render(
	<Provider store={theStore}>
		<App />
	</Provider>,
	document.getElementById('root')
);
