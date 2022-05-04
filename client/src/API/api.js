
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const $authHost = axios.create({
  baseURL: 'http://localhost:5000'
});

const $host = axios.create({
  baseURL: 'http://localhost:5000'
});

const authInterceptor = config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
}

$authHost.interceptors.request.use(authInterceptor);


export const auth = async (name, password) => {
  try {
    const response = await $host.post('/api/login', {user: name, password: password});

    localStorage.setItem('token', response.data.token);
    return jwt_decode(response.data.token);
  } catch (e) {
    return e.response.data;
  }
}

export const check = async () => {
  try {
    const response = await $authHost.get('/api/auth');

    localStorage.setItem('token', response.data.token);
    return jwt_decode(response.data.token);
  } catch (e) {
    return e.response.data;
  }
}
