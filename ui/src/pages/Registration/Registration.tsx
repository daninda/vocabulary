import { FC, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../components/Input/Field';
import ButtonDefault from '../../components/Button/Main';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { register, setError } from '../../store/slices/auth';
import toast from 'react-hot-toast';

const Registration: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const { errorMessage } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(setError(''));
  }, [dispatch])

  useEffect(() => {
    if (errorMessage) {
      toast.error('Пользователь с такой почтой уже существует', {
        id: 'error',
      });
    }
  }, [errorMessage]);

  const handleSubmit = useCallback(
    async (name: string, email: string, password: string) => {
      dispatch(register({ name, email, password }));
    },
    [dispatch],
  );

  return (
    <div className="flex items-center justify-center mt-16">
      <div className="flex flex-col w-full max-w-lg gap-10 p-8">
        <h1 className="text-4xl font-bold text-center text-slate-800">
          Создание нового аккаунта
        </h1>

        <form className="flex flex-col gap-6 min-w-lg">
          <InputField
            label="Имя пользователя"
            type="text"
            id="username"
            placeholder="Введите имя пользователя"
            required={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            text="Создать аккаунт"
            type="submit"
            onClick={() => handleSubmit(name, email, password)}
          />
        </form>

        <p className="text-center text-gray-600">
          Уже есть аккаунт?{' '}
          <Link
            to="/signin"
            className="font-medium text-blue-500 hover:underline"
          >
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
