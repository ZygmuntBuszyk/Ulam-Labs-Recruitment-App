import types from './types';
import { setActiveTab, setChosenCoin, setCoinsData, removeChosenCoin, setMarketPrices } from './actions';
import { appApiRoutes } from 'services/api/apiRoutes';
import { ICoingeckoMarketPriceResponse, ICoingeckoResponse } from 'services/api/apiModels';
import { getApiCallAction } from 'state/utillities';

export const searchCoins = (value: string) =>
	getApiCallAction<ICoingeckoResponse>(`${appApiRoutes.coingecko.searchCoins}?query=${value}`, types.GET_CALLS.COINS, response =>
		setCoinsData(response?.coins)
	);

export const getCoinMarketData = ({ coinId, vsCurrency, daysAgo, interval }) =>
	getApiCallAction<ICoingeckoMarketPriceResponse>(
		`${appApiRoutes.coingecko.coins}/${coinId}/market_chart?vs_currency=${vsCurrency}&days=${daysAgo}&interval=${interval}`,
		types.GET_CALLS.MARKET_DATA,
		response => setMarketPrices({ prices: response?.prices, id: coinId })
	);

export { setActiveTab, setChosenCoin, removeChosenCoin };
