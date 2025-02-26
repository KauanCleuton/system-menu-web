import axios from 'axios';
import { isLoggedIn, isclientCredentialsExpired } from '../utils/auth';
import ServiceError from './service.error';

const customAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  timeout: 20000,
});

const setclientCredentials = async () => {
  const {
    data: { data },
  } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/connect/token`,
    {
      client_id: process.env.REACT_APP_CLIENT_ID,
    }
  );
  localStorage.setItem('clientCredentials', data.client_token);
};

let isclientCredentialsRefreshed = false;

customAxios.interceptors.response.use(
  (response) => {
    process.env.NODE_ENV !== 'production' && console.log('kkk2');
    if (response.status === 401) {
      window.location = '/login';
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } else if (response.status === 402) {
      window.location = '/pagamento';
    }

    return response;
  },
  async (error) => {
    if (error.response?.data.code === 401) {
      if (error.response?.data.data.error === 'invalid client_token') {
        if (!isclientCredentialsRefreshed) {
          await setclientCredentials();
          isclientCredentialsRefreshed = true;
          const { request } = error;
          request.config.headers.Authorization = `Bearer ${localStorage.getItem(
            'clientCredentials'
          )}`;
          const ret = await customAxios.request(request.config);
          return ret;
        }
        isclientCredentialsRefreshed = false;
      }
    } else if (error.response?.data.code === 402) {
      console.log(787878);
    }
    return Promise.reject(error.response?.data);
  }
);

customAxios.interceptors.request.use(
  async (request) => {
    if (request.headers.isAuth) {
      delete request.headers.isAuth;
      process.env.NODE_ENV !== 'production' && console.log('kkk34');
      if (!isLoggedIn('accessToken')) {
        process.env.NODE_ENV !== 'production' && console.log('kkk35');
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          try {
            const { data } = await customAxios.post(
              '/auth/refresh-token',
              { refreshToken: refreshToken },
              { headers: { isClientCredentials: true } }
            );
            process.env.NODE_ENV !== 'production' &&
              console.log(refreshToken, 1);
            process.env.NODE_ENV !== 'production' && console.log(data, 'data');
            process.env.NODE_ENV !== 'production' &&
              console.log(data.accessToken, 100);
            process.env.NODE_ENV !== 'production' &&
              console.log(data.refreshToken, 200);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
          } catch (e) {
            process.env.NODE_ENV !== 'production' &&
              console.log('erro refreshtoken', e);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.setItem('redirectUrl', window.location.pathname);
            window.location = '/login';
            throw new ServiceError('Usuário não autenticado', 'not_auth');
          }
        } else {
          localStorage.setItem('redirectUrl', window.location.pathname);
          window.location = '/login';
          throw new ServiceError('Usuário não autenticado', 'not_auth');
        }
      }
      process.env.NODE_ENV !== 'production' && console.log('kkk19');
      request.headers.Authorization = `Bearer ${localStorage.getItem(
        'accessToken'
      )}`;
      return request;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

export default customAxios;
