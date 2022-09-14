import { apiCallTypeCreator, BaseActionTypes } from 'state/utillities';

export default class types extends BaseActionTypes {
	static APP = 'APP';

	static COINS = 'COINS';
	static SET_CHOSEN_COIN = 'SET_CHOSEN_COIN';
	static REMOVE_CHOSEN_COIN = 'REMOVE_CHOSEN_COIN';
	static ACTIVE_TAB = 'ACTIVE_TAB';
	static MARKET_DATA = 'MARKET_DATA';

	static GET_CALLS = {
		COINS: apiCallTypeCreator(`${types.APP}/${types.COINS}/${types.GET_CALL}`),
		MARKET_DATA: apiCallTypeCreator(`${types.APP}/${types.MARKET_DATA}/${types.GET_CALL}`)
	};
}
