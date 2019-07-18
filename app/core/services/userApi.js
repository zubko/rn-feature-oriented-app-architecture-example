import apisauce from 'apisauce';
import jwtDecode from 'jwt-decode';

import createApiMonitor from './createApiMonitor';

export function parseToken(token) {
  const data = jwtDecode(token);
  return {
    email: data.email || '',
    userId: data.sub || '',
  };
}

export function createApi(onTokenExpired) {
  const api = apisauce.create({
    baseURL: 'http://localhost:3001/',
    timeout: 10000,
  });
  if (__DEV__) {
    api.addMonitor(createApiMonitor('user api'));
  }
  api.addMonitor(response => {
    if (
      !response.ok &&
      response.status === 401 &&
      response.data === 'jwt expired' &&
      onTokenExpired
    ) {
      onTokenExpired();
    }
  });
  return api;
}

export async function setToken(api, token) {
  if (token) {
    api.setHeader('Authorization', `Bearer ${token}`);
  } else {
    api.deleteHeader('Authorization');
  }
}

function cleanup(api) {
  api.deleteHeader('Authorization');
}

export async function login(api, email, password) {
  cleanup(api);
  const res = await api.post('login', { email, password });
  return res;
}

export async function signup(api, email, password) {
  cleanup(api);
  const res = await api.post('signup', { email, password });
  return res;
}

export function get(api, entity, id) {
  return api.get(`${entity}/${id}`);
}

export function patch(api, entity, id, data) {
  return api.patch(`${entity}/${id}`, data);
}

export default createApi;
