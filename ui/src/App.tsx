import { FC } from 'react';
import RoutesMain from './routes/Main';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Toaster } from 'react-hot-toast';

const App: FC = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <RoutesMain />
        </BrowserRouter>
      </Provider>
      <Toaster position="top-center" containerClassName='text-lg font-medium text-slate-800' />
    </>
  );
};

export default App;
