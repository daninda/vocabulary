import { FC } from 'react';
import RoutesMain from './routes/Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RoutesMain />
    </QueryClientProvider>
  );
};

export default App;
