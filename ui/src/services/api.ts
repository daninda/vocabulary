import axios from 'axios';
import fingerprintjs from '@fingerprintjs/fingerprintjs';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

const fpInstance = await fingerprintjs.load();
const fpVisitor = await fpInstance.get();
const fingerprint = fpVisitor.visitorId;

export const getFingerprint = () => {
  return fingerprint;
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await api.post('api/auth/refresh', {
          fingerprint: getFingerprint(),
        });

        localStorage.setItem('accessToken', refreshResponse.data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
        return api(originalRequest);
      } catch {
        localStorage.removeItem('accessToken');
      }
    }

    return Promise.reject(error);
  },
);

export default api;
