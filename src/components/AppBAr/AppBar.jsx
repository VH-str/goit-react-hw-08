import { Navigation } from '../Navigation/Navigation'; // Компонент для навігації (головне меню)
import { UserMenu } from '../UserMenu/UserMenu'; // Компонент меню користувача (відображається після входу в систему)
import { useSelector } from 'react-redux'; // Використовується для отримання стану з Redux
import { AuthNav } from '../AuthNav/AuthNav'; // Компонент навігації для авторизації (кнопки реєстрації та входу)
import { selectIsLoggedIn } from '../../redux/auth/selectors'; // Селектор для перевірки, чи користувач увійшов у систему
import css from './AppBar.module.css'; // Підключення стилів для компонента

export const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn); // Отримуємо стан авторизації користувача

  return (
    <header className={css.header}>
      {' '}
      {/* Головний заголовок (шапка) сайту */}
      <Navigation /> {/* Головна навігація */}
      {isLoggedIn ? <UserMenu /> : <AuthNav />}{' '}
      {/* Якщо користувач увійшов, показуємо UserMenu, якщо ні – AuthNav */}
    </header>
  );
};
