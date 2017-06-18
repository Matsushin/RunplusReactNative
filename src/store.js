import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from './reducers';

const logger = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore(onComplete) {
  const store = createStore(reducers, composeEnhancers(applyMiddleware(logger)), autoRehydrate());
  persistStore(
    store,
    { storage: AsyncStorage, whitelist: ['currentUser', 'signupModal'] },
    onComplete,
  );
  return store;
}

module.exports = configureStore;
