import { FC } from 'react';
import HeaderMain from '../Header/Main';
import { Outlet } from 'react-router-dom';

const LayoutMain: FC = () => {
  return (
    <div>
      <HeaderMain />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutMain;
