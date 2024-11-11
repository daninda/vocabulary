import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutAuth from '../components/Layout/Auth';
import LayoutMain from '../components/Layout/Main';
import About from '../pages/About/About';
import AddWord from '../pages/AddWord/AddWord';
import Authorization from '../pages/Authorization/Authorization';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import Registration from '../pages/Registration';

const RoutesMain: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutAuth />}>
          <Route path="/signup" element={<Registration />} />
          <Route path="/signin" element={<Authorization />} />
        </Route>

        <Route element={<LayoutMain />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-word" element={<AddWord />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesMain;
