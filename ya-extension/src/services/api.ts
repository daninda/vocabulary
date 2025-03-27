import fingerprintjs from '@fingerprintjs/fingerprintjs';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export const getFingerprint = async () => {
  const fp = await fingerprintjs.load();
  const result = await fp.get();
  return 'ext' + result.visitorId;
};

api.interceptors.request.use(
  async (config) => {
    const storage = await chrome.storage.local.get('accessToken');
    if (storage.accessToken.length) {
      config.headers.Authorization = `Bearer ${storage.accessToken}`;
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
          fingerprint: await getFingerprint(),
        });

        await chrome.storage.local.set({
          accessToken: refreshResponse.data.accessToken,
        });

        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
        return api(originalRequest);
      } catch {
        await chrome.storage.local.remove('accessToken');
      }
    }

    return Promise.reject(error);
  },
);

export default api;
