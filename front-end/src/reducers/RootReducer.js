// This is the master or root reducer.
// Each reducer contains a piece of state.
// The root reducer contains all the reducers.
// I.e., the root reducer contains ALL pieces of state,
// or the entire application state.

// In order to get all the "little" reducers or pieces of state
// into one big, "root" reducer, we need the combineReducers method from redux.
import { combineReducers } from 'redux';

// Import each individual reducer to hand to combineReducers.
// First: AuthReducer
import AuthReducer from './AuthReducer';
import ProductLineReducer from './ProductLineReducer';

// combineReducers taks an object as an arg.
// That arg has key: value pair = stateName: reducerFunction.
// The reducerFunction will return a value.
const rootReducer = combineReducers({
	auth: AuthReducer,
	productLines: ProductLineReducer
});

export default rootReducer;