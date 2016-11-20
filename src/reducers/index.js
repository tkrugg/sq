import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  Events: eventsReducer,
  routing: routerReducer
});

export default rootReducer;
