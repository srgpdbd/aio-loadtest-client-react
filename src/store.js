import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import appReducers from './reducers';
import history from './history';

export default createStore(
  combineReducers({...appReducers, routing: routerReducer }),
  compose(applyMiddleware(thunk, routerMiddleware(history)))
);
