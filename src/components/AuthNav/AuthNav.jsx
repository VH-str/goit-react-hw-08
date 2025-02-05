import { NavLink } from 'react-router-dom'; // Компонент для навігаційних посилань
import { Box, Typography } from '@mui/material'; // Компоненти Material UI для стилізації
import css from './AuthNav.module.css'; // Підключення стилів для компонента

export const AuthNav = () => {
  // Функція для встановлення активного класу на посилання
  const getNavLinkClass = ({ isActive }) =>
    isActive ? `${css.link} ${css.active}` : css.link;

  return (
    <Box display="flex" alignItems="center">
      {' '}
      {/* Контейнер для посилань */}
      <Typography variant="h6" component="span" sx={{ mr: 2 }}>
        {' '}
        {/* Текст для кнопки "Реєстрація" */}
        <NavLink to="/register" className={getNavLinkClass}>
          {' '}
          {/* Посилання на сторінку реєстрації */}
          Register
        </NavLink>
      </Typography>
      <Typography variant="h6" component="span">
        {' '}
        {/* Текст для кнопки "Вхід" */}
        <NavLink to="/login" className={getNavLinkClass}>
          {' '}
          {/* Посилання на сторінку входу */}
          Login
        </NavLink>
      </Typography>
    </Box>
  );
};
