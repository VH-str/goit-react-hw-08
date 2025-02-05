import { NavLink } from 'react-router-dom'; // Імпортуємо NavLink для створення навігаційних посилань
import { useSelector } from 'react-redux'; // Хук для доступу до Redux стану
import { selectIsLoggedIn } from '../../redux/auth/selectors'; // Селектор для перевірки, чи користувач авторизований
import { Box, Typography } from '@mui/material'; // Компоненти Material UI для стилізації
import css from './Navigation.module.css'; // Модульні стилі для компонента Navigation

export const Navigation = () => {
  // Використовуємо useSelector для отримання стану, чи користувач увійшов в систему
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Функція для визначення класу для активного посилання
  const getNavLinkClass = ({ isActive }) =>
    isActive ? `${css.link} ${css.active}` : css.link;

  return (
    <Box>
      {' '}
      {/* Обгортка для навігаційних елементів */}
      <Typography variant="h6">
        {/* Навігаційне посилання на головну сторінку */}
        <NavLink className={getNavLinkClass} to="/">
          Home
        </NavLink>
      </Typography>
      {isLoggedIn && ( // Якщо користувач увійшов в систему, показуємо посилання на контакти
        <Typography variant="h6">
          <NavLink className={getNavLinkClass} to="/contacts">
            Contacts
          </NavLink>
        </Typography>
      )}
    </Box>
  );
};
