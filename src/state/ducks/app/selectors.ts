import { IStoreState } from 'state/ducks';
import { coinPrices, IChosenCoin, ICoinData } from '../../../services/api/apiModels';

export const getCoins = ({ app }: IStoreState): ICoinData[] => {
	const coinsToExclude = app.ChosenCoins.map(c => c.Id);

	return app.Coins?.filter(coin => !coinsToExclude.includes(coin.id)).map(coin => ({
		Id: coin.id,
		Name: coin.name
	}));
};

export const getActiveTab = ({ app }: IStoreState): string => app.ActiveTab;

export const getChosenCoins = ({ app }: IStoreState): IChosenCoin[] => app.ChosenCoins;

export const getMarketData =
	(id: string) =>
	({ app }: IStoreState): coinPrices =>
		app.MarketData[id];
