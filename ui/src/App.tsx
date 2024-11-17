import { FC } from 'react';
import RoutesMain from './routes/Main';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RoutesMain />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
