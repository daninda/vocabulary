import { FC } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../components/Input/Field';
import ButtonDefault from '../../components/Button/Main';

const Authorization: FC = () => {
  return (
    <div className="flex mt-16 items-center justify-center">
      <div className="w-full max-w-lg p-8 flex flex-col gap-10">
        <h1 className="text-4xl font-bold text-center text-slate-800">
          Вход в аккаунт
        </h1>

        <form className="min-w-lg flex flex-col gap-6">
          <InputField
            label="Email"
            type="email"
            id="email"
            placeholder="Введите email"
            required={true}
          />

          <InputField
            label="Пароль"
            type="password"
            id="password"
            placeholder="Введите пароль"
            required={true}
          />

          <ButtonDefault text="Войти" type="submit" />
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
