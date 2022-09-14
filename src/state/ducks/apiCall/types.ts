export default class types {
	static API_CALL = 'API_CALL';

	static SET_API_CALL_PENDING = `${types.API_CALL}/SET_API_CALL_PENDING`;

	static SET_API_CALL_ERROR = `${types.API_CALL}/SET_API_CALL_ERROR`;

	static DELETE_API_CALL_ERROR = `${types.API_CALL}/DELETE_API_CALL_ERROR`;

	static SET_API_CALL_STATUS = `${types.API_CALL}/SET_API_CALL_STATUS`;
}
