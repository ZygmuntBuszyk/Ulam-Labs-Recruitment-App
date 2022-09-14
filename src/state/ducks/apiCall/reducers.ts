import types from './types';
import { IAction } from 'state/types';

export interface IApiCallState {
	[key: string]: {
		pending: boolean;
		error?: any;
		status: string;
	};
}

const initialState: IApiCallState = {};

function apiCallReducer(state: IApiCallState = initialState, action: IAction) {
	switch (action.type) {
		case types.SET_API_CALL_PENDING:
			return {
				...state,
				[action.apiCall]: {
					pending: action.payload
				}
			};
		case types.SET_API_CALL_ERROR:
			return {
				...state,
				[action.apiCall]: {
					...state[action.apiCall],
					error: action.payload,
					pending: false
				}
			};
		case types.DELETE_API_CALL_ERROR:
			return {
				...state,
				[action.apiCall]: {
					...state[action.apiCall],
					error: null
				}
			};
		case types.SET_API_CALL_STATUS:
			return {
				...state,
				[action.apiCall]: {
					...state[action.apiCall],
					status: action.payload,
					pending: false
				}
			};
		default:
			return state;
	}
}

export default apiCallReducer;
