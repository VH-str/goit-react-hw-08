import { useDispatch, useSelector } from 'react-redux'; // Хуки для взаємодії з Redux: useSelector - отримуємо дані, useDispatch - відправляємо дії
import { logOut } from '../../redux/auth/operations'; // Дія для виходу з системи
import { selectUser } from '../../redux/auth/selectors'; // Селектор для отримання користувача з Redux
import { Button, Typography, Box } from '@mui/material'; // Компоненти Material UI для оформлення інтерфейсу
import css from './UserMenu.module.css'; // Модульні стилі для компонента

export const UserMenu = () => {
  const dispatch = useDispatch(); // Хук для відправки дій в Redux
  const user = useSelector(selectUser); // Отримуємо дані користувача з Redux через селектор selectUser

  return (
    <Box className={css.wrapper}>
      {' '}
      {/* Контейнер для елементів меню користувача */}
      <Typography className={css.username} variant="h6" component="p">
        Welcome, {user.name} {/* Привітання з іменем користувача */}
      </Typography>
      <Button
        className={css.button} // Стиль для кнопки
        variant="contained" // Кнопка з заповненим фоном
        color="secondary" // Колір кнопки
        onClick={() => dispatch(logOut())} // При натисканні викликається дія logOut
      >
        Logout {/* Текст на кнопці */}
      </Button>
    </Box>
  );
};
