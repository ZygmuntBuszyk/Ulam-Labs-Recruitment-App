import types from './types';
import { coinPrices, IChosenCoin, ICoin } from '../../../services/api/apiModels';

export const setCoinsData = (data: ICoin[]) => ({
	type: types.GET_CALLS.COINS.SUCCESS,
	payload: data
});

export const setActiveTab = (data: string) => ({
	type: types.ACTIVE_TAB,
	payload: data
});

export const setChosenCoin = (data: IChosenCoin) => ({
	type: types.SET_CHOSEN_COIN,
	payload: data
});

export const removeChosenCoin = (data: string) => ({
	type: types.REMOVE_CHOSEN_COIN,
	payload: data
});

export const setMarketPrices = (data: { prices: coinPrices; id: string }) => ({
	type: types.GET_CALLS.MARKET_DATA.SUCCESS,
	payload: data
});
