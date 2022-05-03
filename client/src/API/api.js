
import axios from 'axios';

const $authHost = axios.create({
  baseURL: 'http://localhost:5000'
});

const $host = axios.create({
  baseURL: 'http://localhost:5000'
});

const authInterceptor = config => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
}

$authHost.interceptors.request.use(authInterceptor);

export default class Api {
  static async auth(name, password) {
    const response = await $host.post('/api/login', {user: name, password: password});

    return response.data;
  }

  static async check() {
    const response = await $authHost.get('/api/auth');

    return response.data;
  }
}
