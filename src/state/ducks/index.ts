import appReducer, { IAppState } from './app/';
import { AnyAction, combineReducers, Store } from 'redux';
import apiCallReducer from './apiCall';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export interface IProps {
	store: Store<IStoreState>;
	action: AnyAction;
}

export interface IStoreState {
	apiCall: any;
	app: IAppState;
}

const appPersistConfig = {
	key: 'app',
	storage: storage,
	whitelist: ['ChosenCoins', 'Coins, ActiveTab', 'MarketData'],
	blackList: []
};

const mainReducer = combineReducers({
	apiCall: apiCallReducer,
	app: persistReducer(appPersistConfig, appReducer)
});

const rootReducer = (state, action) => mainReducer(state, action);

export default rootReducer;
