import { IStoreState } from '..';

export const getApiCall =
	type =>
	({ apiCall }) =>
		[!!apiCall?.[type.REGULAR]?.pending, apiCall?.[type.REGULAR]?.error, apiCall?.[type.REGULAR]?.status];

export const getIsPendingStatus = ({ apiCall }: IStoreState) =>
	Object.keys(apiCall)
		?.map(item => apiCall?.[item]?.pending)
		.includes(true);
