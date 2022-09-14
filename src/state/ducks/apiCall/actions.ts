import types from './types';

export const setApiCallPendingStatus = (type: string, status: boolean) => ({
	type: types.SET_API_CALL_PENDING,
	apiCall: type,
	payload: status
});

export const setApiCallError = (type: string, error: any) => ({
	type: types.SET_API_CALL_ERROR,
	apiCall: type,
	payload: error
});

export const deleteApiCallError = (type: string) => ({
	type: types.DELETE_API_CALL_ERROR,
	apiCall: type
});

export const setApiCallResponseStatus = (type: string, responseStatus: number) => ({
	type: types.SET_API_CALL_STATUS,
	apiCall: type,
	payload: responseStatus
});
