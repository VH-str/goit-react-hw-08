import { useDispatch } from 'react-redux'; // Хук для відправки дій в Redux
import { Formik, Form, Field } from 'formik'; // Компоненти Formik для керування формою
import * as Yup from 'yup'; // Бібліотека для валідації форми через Yup
import { register } from '../../redux/auth/operations'; // Операція для реєстрації користувача
import { TextField, Button, Box, Typography, FormControl } from '@mui/material'; // Компоненти Material UI для оформлення форми
import styles from './RegisterForm.module.css'; // Модульні стилі для компонента реєстрації

export const RegisterForm = () => {
  const dispatch = useDispatch(); // Ініціалізація хука для відправки дій в Redux

  // Початкові значення для полів форми
  const initialValues = {
    name: '', // ім'я користувача
    email: '', // електронна пошта
    password: '', // пароль
  };

  // Валідація форми через Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters') // Мінімум 3 символи
      .max(50, 'Name must be 50 characters or less') // Максимум 50 символів
      .required('Name is required'), // Обов'язкове поле
    email: Yup.string()
      .email('Invalid email address') // Перевірка на правильність email
      .required('Email is required'), // Обов'язкове поле
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters') // Мінімум 6 символів для пароля
      .required('Password is required'), // Обов'язкове поле
  });

  // Функція обробки сабміту форми
  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values)); // Відправка дії для реєстрації користувача
    resetForm(); // Очистити форму після сабміту
  };

  return (
    <Box sx={{ width: 450, margin: 'auto' }}>
      {' '}
      {/* Контейнер для форми */}
      <Typography variant="h4" align="center" gutterBottom>
        {' '}
        {/* Заголовок форми */}
        Register
      </Typography>
      <Formik
        initialValues={initialValues} // Початкові значення для форми
        validationSchema={validationSchema} // Валідація форми через Yup
        onSubmit={handleSubmit} // Функція обробки сабміту форми
      >
        {(
          { touched, errors } // Виведення помилок для кожного поля, якщо воно було торкнуте
        ) => (
          <Form className={styles.form} autoComplete="on">
            {' '}
            {/* Оформлення форми */}
            {/* Поле для вводу імені користувача */}
            <FormControl fullWidth margin="normal">
              <Field
                as={TextField}
                name="name" // Ім'я поля (відповідає значенню initialValues)
                label="Username" // Лейбл для поля
                variant="outlined" // Стиль поля
                type="text" // Тип поля
                required // Обов'язкове поле
                className={styles.field} // Стиль для поля
                autoComplete="name" // Автозаповнення для імені
                error={touched.name && Boolean(errors.name)} // Помилка при неправильному значенні
                helperText={touched.name && errors.name} // Текст з помилкою
              />
            </FormControl>
            {/* Поле для вводу email */}
            <FormControl fullWidth margin="normal">
              <Field
                as={TextField}
                name="email" // Ім'я поля (відповідає значенню initialValues)
                label="Email" // Лейбл для поля
                variant="outlined" // Стиль поля
                type="email" // Тип поля
                required // Обов'язкове поле
                className={styles.field} // Стиль для поля
                autoComplete="email" // Автозаповнення для email
                error={touched.email && Boolean(errors.email)} // Помилка при неправильному значенні
                helperText={touched.email && errors.email} // Текст з помилкою
              />
            </FormControl>
            {/* Поле для вводу пароля */}
            <FormControl fullWidth margin="normal">
              <Field
                as={TextField}
                name="password" // Ім'я поля (відповідає значенню initialValues)
                label="Password" // Лейбл для поля
                variant="outlined" // Стиль поля
                type="password" // Тип поля (пароль)
                required // Обов'язкове поле
                className={styles.field} // Стиль для поля
                autoComplete="new-password" // Автозаповнення для пароля
                error={touched.password && Boolean(errors.password)} // Помилка при неправильному значенні
                helperText={touched.password && errors.password} // Текст з помилкою
              />
            </FormControl>
            {/* Кнопка для сабміту форми */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit" // Тип кнопки — сабміт
              className={styles.button} // Стиль для кнопки
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
