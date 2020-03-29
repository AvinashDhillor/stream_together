import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import connectionReducer from '../reducers/connectionReducer';
import mediaReducer from '../reducers/mediaReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      connection: connectionReducer,
      media: mediaReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
