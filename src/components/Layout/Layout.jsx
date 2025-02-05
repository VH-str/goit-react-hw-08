import { Suspense } from 'react'; // Імпортуємо Suspense для відкладеного рендерингу компонентів
import { Outlet } from 'react-router-dom'; // Компонент Outlet для рендерингу дочірніх маршрутів
import { AppBar } from '../AppBAr/AppBar'; // Імпортуємо компонент AppBar для відображення навігаційної панелі
import css from './Layout.module.css'; // Імпортуємо стилі для компонента Layout

export const Layout = () => {
  return (
    <div className={css.container}>
      {' '}
      {/* Обгортка для компонента, з класом для стилів */}
      <AppBar /> {/* Навігаційна панель */}
      <Suspense fallback={null}>
        {' '}
        {/* Використовуємо Suspense для відкладеного завантаження контенту */}
        <Outlet />{' '}
        {/* Рендерить дочірні маршрути, які визначаються через react-router */}
      </Suspense>
    </div>
  );
};
