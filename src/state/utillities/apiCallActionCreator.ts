import api from 'services/api/api';
import { apiCallOperations } from 'state/ducks/apiCall';
import { AxiosError, AxiosResponse } from 'axios';
import { IApiCallType } from '../types';

const successCodes = [200, 201, 204];

export function getApiCallAction<TResponse>(
	url: string,
	type: IApiCallType,
	actionOnSuccess: (arg0: TResponse) => any,
	headers?: Record<string, string>,
	responseType?: string
) {
	return dispatch => {
		dispatch(apiCallOperations.setApiCallPendingStatus(type.REGULAR, true));

		api.get(url, {
			headers: headers,
			responseType: responseType as 'text'
		})
			.then((response: AxiosResponse) => {
				if (successCodes.includes(response.status)) {
					dispatch(actionOnSuccess(response.data));
					dispatch(apiCallOperations.setApiCallResponseStatus(type.REGULAR, response.status));
				} else {
					throw response;
				}
			})
			.catch((error: AxiosError) => {
				dispatch(apiCallOperations.setApiCallError(type.REGULAR, error));
			});
	};
}
