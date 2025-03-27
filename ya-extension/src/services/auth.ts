import axios from 'axios';

import { getFingerprint } from './api';

const authApi = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export interface IRegisterInput {
  name: string;
  email: string;
  password: string;
}
const register = async (data: IRegisterInput) => {
  return await authApi.post<{ accessToken: string }>('/api/auth/register', {
    name: data.name,
    email: data.email,
    password: data.password,
    fingerprint: await getFingerprint(),
  });
};

export interface ILoginInput {
  email: string;
  password: string;
}
const login = async (data: ILoginInput) => {
  return await authApi.post<{ accessToken: string }>('/api/auth/login', {
    email: data.email,
    password: data.password,
    fingerprint: await getFingerprint(),
  });
};

const logout = async () => {
  return await authApi.post('/api/auth/logout', {
    fingerprint: await getFingerprint(),
  });
};

const refresh = async () => {
  return await authApi.post<{ accessToken: string }>('/api/auth/refresh', {
    fingerprint: await getFingerprint(),
  });
};

export const AuthService = {
  register,
  login,
  logout,
  refresh,
};
