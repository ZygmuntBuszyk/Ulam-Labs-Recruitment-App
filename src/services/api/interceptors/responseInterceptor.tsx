import { message } from 'antd';
import api from '../api';
import { AxiosError } from 'axios';

const responseInterceptor = () => {
	api.interceptors.response.use(
		response => response,
		(error: AxiosError) => {
			console.log('error: ', error);
			if (error?.response?.status === 500) {
				message.error({
					content: 'Server error, there is something wrong with your requested operation.',
					icon: <img src={require('../../../assets/icons/error.svg')} alt='error' />
				});
			}
			// I don't need to handle more errors from coingecko I quess
			return Promise.reject(error);
		}
	);
};

export default responseInterceptor;
