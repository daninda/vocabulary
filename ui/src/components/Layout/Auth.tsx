import { FC } from 'react';
import HeaderAuth from '../Header/Auth';
import { Outlet } from 'react-router-dom';

const LayoutAuth: FC = () => {
  return (
    <div>
      <HeaderAuth />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutAuth;
