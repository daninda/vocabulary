import { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../components/Input/Field';
import ButtonDefault from '../../components/Button/Main';
import { login } from '../../store/slices/auth';
import { useAppDispatch } from '../../utils/hooks';

const Authorization: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(
    async (email: string, password: string) => {
      dispatch(login({ email, password }));
    },
    [dispatch],
  );

  return (
    <div className="flex items-center justify-center mt-16">
      <div className="flex flex-col w-full max-w-lg gap-10 p-8">
        <h1 className="text-4xl font-bold text-center text-slate-800">
          Вход в аккаунт
        </h1>

        <form className="flex flex-col gap-6 min-w-lg">
          <InputField
            label="Email"
            type="email"
            id="email"
            placeholder="Введите email"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            label="Пароль"
            type="password"
            id="password"
            placeholder="Введите пароль"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <ButtonDefault
            text="Войти"
            type="submit"
            onClick={() => handleSubmit(email, password)}
          />
        </form>

        <p className="text-center text-gray-600">
          Еще нет аккаунта?{' '}
          <Link
            to="/signup"
            className="font-medium text-blue-500 hover:underline"
          >
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Authorization;
