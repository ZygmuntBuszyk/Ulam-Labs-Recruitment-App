import { Action } from 'redux';

export interface IAction<T = any> extends Action {
	payload: T;
	apiCall?: string;
	id?: number;
}

export interface IApiCallType {
	REGULAR: string;
	SUCCESS: string;
}
