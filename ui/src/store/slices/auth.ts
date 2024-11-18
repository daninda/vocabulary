import { AxiosError } from 'axios';
import { AuthService, ILoginInput, IRegisterInput } from '../../services/auth';
import createAppSlice from '../createAppSlice';
import { jwtDecode } from 'jwt-decode';

interface IAuthState {
  userId: string;
  isAuth: boolean;
  isLoading: boolean;
  errorMessage: string;
}

const initialState: IAuthState = {
  userId: '',
  isAuth: false,
  isLoading: true,
  errorMessage: '',
};

export const authSlice = createAppSlice({
  name: 'auth',
  initialState,
  reducers: (create) => ({
    setError: create.reducer<string>((state, action) => {
      state.errorMessage = action.payload;
    }),

    register: create.asyncThunk<void, IRegisterInput, { rejectValue: string }>(
      async (data, config) => {
        try {
          const res = await AuthService.register(data);
          const state = config.getState() as { auth: IAuthState };
          state.auth.userId = jwtDecode<{ userId: string }>(
            res.data.accessToken,
          ).userId;
          localStorage.setItem('accessToken', res.data.accessToken);
          return;
        } catch (error) {
          if (error instanceof AxiosError) {
            return config.rejectWithValue(error.response?.data.message);
          } else {
            return config.rejectWithValue('Something went wrong');
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
          state.userId = '';
        },
      },
    ),

    login: create.asyncThunk<void, ILoginInput, { rejectValue: string }>(
      async (data, config) => {
        try {
          const res = await AuthService.login(data);
          const state = config.getState() as { auth: IAuthState };
          state.auth.userId = jwtDecode<{ userId: string }>(
            res.data.accessToken,
          ).userId;
          localStorage.setItem('accessToken', res.data.accessToken);
          return;
        } catch (error) {
          if (error instanceof AxiosError) {
            return config.rejectWithValue(error.response?.data.message);
          } else {
            return config.rejectWithValue('Something went wrong');
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
          state.userId = '';
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
          } else {
            return config.rejectWithValue('Something went wrong');
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
          state.userId = '';
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message || 'Something went wrong';
          state.isAuth = false;
          state.isLoading = false;
        },
      },
    ),

    refresh: create.asyncThunk<
      { userId: string },
      void,
      { rejectValue: string }
    >(
      async (_, config) => {
        try {
          const res = await AuthService.refresh();
          const decoded = jwtDecode<{ userId: string }>(res.data.accessToken);
          localStorage.setItem('accessToken', res.data.accessToken);
          return decoded;
        } catch (error) {
          if (error instanceof AxiosError) {
            return config.rejectWithValue(error.response?.data.message);
          } else {
            return config.rejectWithValue('Something went wrong');
          }
        }
      },
      {
        pending: (state) => {
          state.errorMessage = '';
          state.isAuth = false;
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.userId = action.payload.userId;
          state.errorMessage = '';
          state.isAuth = true;
          state.isLoading = false;
        },
        rejected: (state, action) => {
          localStorage.removeItem('accessToken');
          state.errorMessage = action.error.message || 'Something went wrong';
          state.isAuth = false;
          state.isLoading = false;
          state.userId = '';
        },
      },
    ),
  }),
});

export const { setError, register, login, logout, refresh } = authSlice.actions;

export default authSlice.reducer;
