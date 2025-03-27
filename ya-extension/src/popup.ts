import './popup.css';

import { AuthService } from './services/auth';

document.addEventListener('DOMContentLoaded', async () => {
  const authForm = document.getElementById('auth-form') as HTMLFormElement;
  const authContainer = document.getElementById(
    'auth-container',
  ) as HTMLElement;
  const appContainer = document.getElementById('app-container') as HTMLElement;
  const goToWebsiteButton = document.getElementById(
    'go-to-website',
  ) as HTMLButtonElement;
  const goToRegistration = document.getElementById(
    'go-to-registration',
  ) as HTMLButtonElement;

  const storage = await chrome.storage.local.get('accessToken');

  if (storage.accessToken) {
    AuthService.refresh()
      .then(async (res) => {
        await chrome.storage.local.set({ accessToken: res.data.accessToken });
        appContainer.classList.remove('hidden');
      })
      .catch(async () => {
        await chrome.storage.local.remove('accessToken');
        authContainer.classList.remove('hidden');
      });
  } else {
    authContainer.classList.remove('hidden');
  }

  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement)
      .value;

    const response = await AuthService.login({ email, password });
    chrome.storage.local.set({ accessToken: response.data.accessToken });
    authContainer.classList.add('hidden');
    appContainer.classList.remove('hidden');
  });

  goToRegistration.addEventListener('click', () => {
    window.open('http://localhost:5173/signup', '_blank');
  });

  goToWebsiteButton.addEventListener('click', () => {
    window.open('http://localhost:5173/signup', '_blank');
  });
});
