import { Navigate } from 'react-router-dom'; // Імпортуємо компонент Navigate для перенаправлення користувача на інший шлях
import { useSelector } from 'react-redux'; // Хук для доступу до Redux стану
import { selectIsLoggedIn } from '../redux/auth/selectors'; // Селектор для отримання статусу логіну користувача

// Компонент для обмеження доступу до певних маршрутів для авторизованих користувачів
export const RestrictedRoute = ({ element, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn); // Отримуємо статус авторизації користувача

  return isLoggedIn ? <Navigate to={redirectTo} /> : element; // Якщо користувач вже залогінений, перенаправляємо його на зазначений шлях. Якщо ні, відображаємо переданий елемент
};
