
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const BASE_URL = 'http://192.168.5.72:5028';

const $authHost = axios.create({
  baseURL: BASE_URL
});

const $host = axios.create({
  baseURL: BASE_URL
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

export const addUser = async (name, password) => {
  const query = window.location.href.split('?')[1];
  try {
    const response = await $host.post(`/api/registration?${query}`,
      {user: name, password: password}
    );

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

export const getLinkRegistration = async () => {
  try {
    const response = await $authHost.get('/api/get-registration');

    return response.data;
  } catch (e) {
    return e.response.data;
  }
}

export const getUsersApi = async () => {
  try {
    const response = await $authHost.get('/api/user');

    return response.data;
  } catch (e) {
    return e.response.data;
  }
}

export const editUserApi = async (id, role, password) => {
  try {
    const response = await $authHost.put('/api/user/',
      {id, role, password}
    );

    return response.data;
  } catch (e) {
    return e.response.data;
  }
}

export const deleteUsersApi = async (id) => {
  try {
    const response = await $authHost.delete('/api/user/' + id);

    return response.data;
  } catch (e) {
    return e.response.data;
  }
}

export const ipApi = async (id) => {
  try {
    const response = await $authHost.get('/api/ip' + (id ? `/${id}` : ''));

    return response.data;
  } catch (e) {
    return e.response.data;
  }
}

export const setIpApi = async (id, data) => {
  try {
    const response = await $authHost.put('/api/ip/' + id, {...data});

    return response.data;
  } catch (e) {
    return e.response.data;
  }
}

export const uploadIpApi = async (e) => {
  try {
    const formData = new FormData();
    formData.append('ip', e.target.files[0]);

    const response = await $authHost.post('/api/ip', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return response.data;
  } catch (e) {
    return e.response.data;
  }
}

export const pingApi = async () => {
  try {
    const response = await $authHost.get('/api/ping');

    return response.data;
  } catch (e) {
    return e.response.data;
  }
}
