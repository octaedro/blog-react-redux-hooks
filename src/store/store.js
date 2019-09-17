import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import rootReducer from './reducers/index';
import Reducers from '../reducers/reducers';

const store = createStore(Reducers, applyMiddleware(thunk));

export default store;