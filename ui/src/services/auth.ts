import axios from 'axios';
import { getFingerprint } from './api';

const authApi = axios.create({
  baseURL: 'http://localhost:3000',
});

export interface registerInput {
  name: string;
  email: string;
  password: string;
}
const register = async (data: registerInput) => {
  const response = await authApi.post('/api/auth/register', {
    name: data.name,
    email: data.email,
    password: data.password,
    fingerprint: getFingerprint(),
  });

  localStorage.setItem('accessToken', response.data.accessToken);
};

export interface loginInput {
  email: string;
  password: string;
}
const login = async (data: loginInput) => {
  const response = await authApi.post('/api/auth/login', {
    email: data.email,
    password: data.password,
    fingerprint: getFingerprint(),
  });

  localStorage.setItem('accessToken', response.data.accessToken);
};

const logout = async () => {
  await authApi.post('/api/auth/logout', { fingerprint: getFingerprint() });
  localStorage.removeItem('accessToken');
};

const refresh = async () => {
  const response = await authApi.post('/api/auth/refresh', {
    fingerprint: getFingerprint(),
  });

  localStorage.setItem('accessToken', response.data.accessToken);
};

export const AuthService = {
  register,
  login,
  logout,
  refresh,
};
