// NOTE:
//  createStore()
// => Redux store that holds the complete state tree of your app
// => only be a single store in your app

// Compose()
// => Composes functions from right to left.

// applyMiddleware() 
// => Middleware is the suggested way to extend Redux with custom functionality. 
// Middleware lets you wrap the store's dispatch method for fun and profit. 
// The key feature of middleware is that it is composable. 
// Multiple middleware can be combined together, where each middleware requires no knowledge of what comes before or after it in the chain.
import { createStore, compose, applyMiddleware } from 'redux';

// AsyncStorage
// A simple, unencrypted, asynchronous, persistent, key-value storage system that is global to the app.
// It should be used instead of LocalStorage.
import {  AsyncStorage } from 'react-native';

// redux-persist
// https://github.com/rt2zz/redux-persist
import { persistStore, persistReducer } from 'redux-persist';

// State reconcilers define how incoming state is merged in with initial state.
// It is critical to choose the right state reconciler for your state.
// Three options:  hardSet , autoMergeLevel1, autoMergeLevel2
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

// redux-saga
// A library that aims to make application side effects 
// (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) 
// easier to manage, more efficient to execute, easy to test, and better at handling failures.
// To run our Saga, we'll have to connect it to the Redux Store using the redux-saga middleware.
import createSagaMiddleware from 'redux-saga';

import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from '../reducers/index';
import rootSaga from '../sagas/index';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if(__DEV__) {
    //middlewares.push(createLogger());
};


// For hardSet 
const persistConfig = {
    
    key:'foodiePick',
    //key: 'root',
    // Apply to AsyncStorage
    // storage => storage:AsyncStorage
    storage: AsyncStorage,
    stateReconciler: hardSet,
    //  Blacklist & Whitelist :
    //  blacklist: ['navigation'] // navigation will not be persisted
    //  whitelist: ['navigation'] // only navigation will be persisted
    debug:true,
  }

// set-up persistedReducer
// persistReducer(config, reducer)
const persistedReducer = persistReducer(persistConfig, reducers)

const allStoreEnhancers = composeWithDevTools(
  //window.devToolsExtension && window.devToolsExtension()
  applyMiddleware (...middlewares),
  //window.devToolsExtension && window.devToolsExtension()
);

// ...middlewares 
// => https://redux.js.org/api/applymiddleware#arguments
//const store = createStore( persistedReducer, compose( applyMiddleware (...middlewares) ) );
const store = createStore( persistedReducer, allStoreEnhancers,  );

// set-up persistor
// persistStore(store, [config, callback])
const persistor = persistStore(store);

// run sagaMiddleware
sagaMiddleware.run(rootSaga);

export { store, persistor }