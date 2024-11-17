import { AxiosError } from 'axios';
import { AuthService, ILoginInput, IRegisterInput } from '../../services/auth';
import createAppSlice from '../createAppSlice';

export const authSlice = createAppSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    isLoading: true,
    errorMessage: '',
  },
  reducers: (create) => ({
    setError: create.reducer<string>((state, action) => {
      state.errorMessage = action.payload;
    }),

    register: create.asyncThunk<void, IRegisterInput, { rejectValue: string }>(
      async (data, config) => {
        try {
          const res = await AuthService.register(data);
          localStorage.setItem('accessToken', res.data.accessToken);
          return;
        } catch (error) {
          if (error instanceof AxiosError) {
            return config.rejectWithValue(error.response?.data.message);
          }
        }
      },
      {
        pending: (state) => {
          state.errorMessage = '';
          state.isLoading = true;
        },
        fulfilled: (state) => {
          state.errorMessage = '';
          state.isAuth = true;
          state.isLoading = false;
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message || 'Something went wrong';
          state.isAuth = false;
          state.isLoading = false;
        },
      },
    ),

    login: create.asyncThunk<void, ILoginInput, { rejectValue: string }>(
      async (data, config) => {
        try {
          const res = await AuthService.login(data);
          localStorage.setItem('accessToken', res.data.accessToken);
          return;
        } catch (error) {
          if (error instanceof AxiosError) {
            return config.rejectWithValue(error.response?.data.message);
          }
        }
      },
      {
        pending: (state) => {
          state.errorMessage = '';
          state.isLoading = true;
        },
        fulfilled: (state) => {
          state.errorMessage = '';
          state.isAuth = true;
          state.isLoading = false;
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message || 'Something went wrong';
          state.isAuth = false;
          state.isLoading = false;
        },
      },
    ),

    logout: create.asyncThunk<void, void, { rejectValue: string }>(
      async (_, config) => {
        try {
          await AuthService.logout();
          localStorage.removeItem('accessToken');
          return;
        } catch (error) {
          if (error instanceof AxiosError) {
            return config.rejectWithValue(error.response?.data.message);
          }
        }
      },
      {
        pending: (state) => {
          state.errorMessage = '';
          state.isLoading = true;
        },
        fulfilled: (state) => {
          state.isAuth = false;
          state.isLoading = false;
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message || 'Something went wrong';
          state.isAuth = false;
          state.isLoading = false;
        },
      },
    ),

    refresh: create.asyncThunk<void, void, { rejectValue: string }>(
      async (_, config) => {
        try {
          const res = await AuthService.refresh();
          localStorage.setItem('accessToken', res.data.accessToken);
          return;
        } catch (error) {
          if (error instanceof AxiosError) {
            return config.rejectWithValue(error.response?.data.message);
          }
        }
      },
      {
        pending: (state) => {
          state.errorMessage = '';
          state.isAuth = false;
          state.isLoading = true;
        },
        fulfilled: (state) => {
          state.errorMessage = '';
          state.isAuth = true;
          state.isLoading = false;
        },
        rejected: (state) => {
          localStorage.removeItem('accessToken');
          state.errorMessage = '';
          state.isAuth = false;
          state.isLoading = false;
        },
      },
    ),
  }),
});

export const { setError, register, login, logout, refresh } = authSlice.actions;

export default authSlice.reducer;
