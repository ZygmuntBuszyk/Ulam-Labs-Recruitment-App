import { coinPrices, IChosenCoin, ICoin, MarketData } from 'services/api/apiModels';
import types from './types';
import { IAction } from 'state/types';

export interface IAppState {
	Coins?: ICoin[];
	ChosenCoins?: IChosenCoin[];
	MarketData?: MarketData;
	ActiveTab?: string;
}

const initialState: IAppState = {
	Coins: [],
	ChosenCoins: [],
	MarketData: {},
	ActiveTab: ''
};

function appReducer(state: IAppState = initialState, action: IAction) {
	switch (action.type) {
		case types.GET_CALLS.COINS.SUCCESS:
			return {
				...state,
				Coins: action.payload
			};
		case types.SET_CHOSEN_COIN:
			return {
				...state,
				ChosenCoins: [...state?.ChosenCoins, action.payload]
			};
		case types.REMOVE_CHOSEN_COIN:
			return {
				...state,
				ChosenCoins: state?.ChosenCoins.filter(coin => coin.Id !== action.payload)
			};
		case types.GET_CALLS.MARKET_DATA.SUCCESS:
			return {
				...state,
				MarketData: {
					...state?.MarketData,
					[action.payload.id]: action.payload.prices
				}
			};
		case types.ACTIVE_TAB:
			return {
				...state,
				ActiveTab: action.payload
			};
		default:
			return state;
	}
}

export default appReducer;
