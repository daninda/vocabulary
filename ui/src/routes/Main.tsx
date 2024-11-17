import { FC, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LayoutAuth from '../components/Layout/Auth';
import LayoutMain from '../components/Layout/Main';
import About from '../pages/About/About';
import AddWord from '../pages/AddWord/AddWord';
import Authorization from '../pages/Authorization/Authorization';
import Home from '../pages/Home/Home';
import Registration from '../pages/Registration';
import { Create, Dictionary } from '../pages/Dictionaries';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { refresh } from '../store/slices/auth';
import Loader from '../pages/Loader';

const RoutesMain: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  } else if (!isAuth) {
    return (
      <Routes>
        <Route element={<LayoutAuth />}>
          <Route path="/signup" element={<Registration />} />
          <Route path="/signin" element={<Authorization />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Route>
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route element={<LayoutMain />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-word" element={<AddWord />} />
          <Route path="/about" element={<About />} />
          <Route path="/dictionaries" element={<Dictionary />} />
          <Route path="/dictionaries/create" element={<Create />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
};

export default RoutesMain;
