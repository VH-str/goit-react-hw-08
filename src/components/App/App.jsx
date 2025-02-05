import { useEffect, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../Layout/Layout';
import { PrivateRoute } from '../PrivateRoute'; // Захищений маршрут, доступний лише для авторизованих користувачів
import { RestrictedRoute } from '../RestrictedRoute'; // Обмежений маршрут, недоступний для авторизованих користувачів
import { refreshUser } from '../../redux/auth/operations'; // Операція для автоматичного оновлення інформації про користувача
import { selectIsRefreshing } from '../../redux/auth/selectors'; // Селектор стану оновлення користувача
import { Toaster } from 'react-hot-toast'; // Компонент для відображення спливаючих сповіщень
import css from './App.module.css';

// Ліниве (відкладене) завантаження сторінок
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const RegistrationPage = lazy(() =>
  import('../../pages/RegistrationPage/RegistrationPage')
);
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() =>
  import('../../pages/ContactsPage/ContactsPage')
);

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing); // Отримуємо статус оновлення користувача

  // Під час монтування компонента запитуємо актуальні дані про користувача
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    // Поки триває оновлення користувача, відображаємо повідомлення
    <div className={css.container}>
      <b>Оновлення користувача...</b>
    </div>
  ) : (
    <>
      {/* Компонент для відображення сповіщень */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Головна сторінка */}
          <Route index element={<HomePage />} />

          {/* Маршрут реєстрації: доступний лише для неавторизованих користувачів */}
          <Route
            path="register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                element={<RegistrationPage />}
              />
            }
          />

          {/* Маршрут входу: доступний лише для неавторизованих користувачів */}
          <Route
            path="login"
            element={
              <RestrictedRoute redirectTo="/contacts" element={<LoginPage />} />
            }
          />

          {/* Сторінка контактів: доступ лише для авторизованих користувачів */}
          <Route
            path="contacts"
            element={
              <PrivateRoute redirectTo="/login" element={<ContactsPage />} />
            }
          />
        </Route>
      </Routes>
    </>
  );
};
