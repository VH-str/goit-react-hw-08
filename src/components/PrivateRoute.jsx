import { Navigate } from 'react-router-dom'; // Імпортуємо компонент Navigate для перенаправлення користувача на інший шлях
import { useSelector } from 'react-redux'; // Хук для доступу до Redux стану
import { selectIsLoggedIn } from '../redux/auth/selectors'; // Селектор для отримання статусу логіну користувача

// Компонент для захисту приватних маршрутів
export const PrivateRoute = ({ element, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn); // Отримуємо статус авторизації користувача

  return isLoggedIn ? element : <Navigate to={redirectTo} />; // Якщо користувач залогінений, відображаємо переданий елемент, інакше перенаправляємо на вказаний маршрут
};
