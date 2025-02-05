import { useSelector, useDispatch } from 'react-redux'; // Хуки для взаємодії з Redux станом: useSelector - для отримання даних, useDispatch - для відправки дій
import { changeFilter } from '../../redux/filters/slice'; // Дія для зміни фільтру в Redux
import { TextField, Box, Typography } from '@mui/material'; // Компоненти Material UI для стилізації форми
import styles from './SearchBox.module.css'; // Модульні стилі для компонента

const SearchBox = () => {
  const dispatch = useDispatch(); // Ініціалізація хука для відправки дій в Redux
  const name = useSelector(state => state.filters.name); // Отримання значення фільтру за іменем з Redux

  // Функція обробки зміни фільтру
  const onSearch = name => dispatch(changeFilter(name)); // Викликаємо дію changeFilter, щоб змінити фільтр в Redux

  return (
    <Box className={styles.container}>
      {' '}
      {/* Контейнер для пошукового поля */}
      <Typography variant="h6" gutterBottom className={styles.title}>
        Find contacts by name {/* Заголовок пошукового поля */}
      </Typography>
      <TextField
        id="search-input" // Унікальний ідентифікатор для поля
        label="Search" // Лейбл для поля
        variant="outlined" // Стиль поля
        fullWidth // Поле на всю ширину
        value={name} // Значення пошукового поля з Redux
        onChange={e => onSearch(e.target.value)} // Обробник зміни значення пошуку
        autoComplete="name" // Автозаповнення для імені
        className={styles.input} // Стиль для поля
      />
    </Box>
  );
};

export default SearchBox;
