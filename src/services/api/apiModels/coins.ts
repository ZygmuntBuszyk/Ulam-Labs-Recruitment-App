export type coinPrices = string[][];

export interface MarketData {
	[key: string]: coinPrices;
}

export interface ICoingeckoMarketPriceResponse {
	prices: coinPrices;
}

export interface ICoinData {
	Id: string;
	Name: string;
}

export interface IChosenCoin extends ICoinData {
	Color: string;
}

export interface ICoin {
	api_symbol: string;
	id: string;
	large: string;
	market_cap_rank: number;
	name: string;
	symbol: string;
	thumb: string;
}

export interface ICoingeckoResponse {
	categories: any[];
	coins: ICoin[];
	exchanges: any[];
	icos: any[];
	nfts: any;
}
