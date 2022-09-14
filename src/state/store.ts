import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import freeze from 'redux-freeze';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './ducks';
import { persistStore } from 'redux-persist';

function configureStore() {
	const logger = createLogger();
	const middlewares = [thunk, freeze, logger];
	const middlewareEnhancer = applyMiddleware(...middlewares);

	const enhancers = [middlewareEnhancer];
	const composedEnhancers = composeWithDevTools(...enhancers);

	const store = createStore(rootReducer, composedEnhancers);

	return store;
}

const store = configureStore();

const persistor = persistStore(store);

export { store, persistor };
0;
