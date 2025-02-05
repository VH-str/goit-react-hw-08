import { useDispatch } from 'react-redux'; // Хук для відправки дій в Redux
import { Formik, Form, Field } from 'formik'; // Компоненти Formik для обробки форми
import * as Yup from 'yup'; // Для валідації форми за допомогою Yup
import { logIn } from '../../redux/auth/operations'; // Дія для логіна в Redux
import { TextField, Button, Box, Typography, FormControl } from '@mui/material'; // Компоненти Material UI для оформлення форми

export const LoginForm = () => {
  const dispatch = useDispatch(); // Ініціалізація useDispatch для відправки дій в Redux

  const initialValues = {
    email: '', // Початкове значення для email
    password: '', // Початкове значення для пароля
  };

  // Опис валідації форми за допомогою Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address') // Перевірка на правильність email
      .required('Email is required'), // Поле email є обов'язковим
    password: Yup.string().required('Password is required'), // Поле пароля є обов'язковим
  });

  // Обробник сабміту форми
  const handleSubmit = (values, { resetForm }) => {
    // Відправка дії для логіна в Redux з передачею значень форми
    dispatch(logIn(values))
      .unwrap() // Розпаковка промісу для подальшої обробки
      .then(() => {
        console.log('Login success'); // Логування при успішному логіні
      })
      .catch(() => {
        console.log('Login error'); // Логування при помилці логіну
      });
    resetForm(); // Очищення форми після сабміту
  };

  return (
    <Box sx={{ width: 450, margin: 'auto' }}>
      {' '}
      {/* Обгортка для форми */}
      <Typography variant="h4" align="center" gutterBottom>
        {' '}
        {/* Заголовок форми */}
        Login
      </Typography>
      <Formik
        initialValues={initialValues} // Початкові значення форми
        validationSchema={validationSchema} // Валідація форми через Yup
        onSubmit={handleSubmit} // Функція для обробки сабміту форми
      >
        {({ errors, touched }) => (
          <Form autoComplete="on">
            {' '}
            {/* Основна форма з атрибутом autoComplete для автозаповнення */}
            {/* Поле для введення email */}
            <FormControl fullWidth margin="normal">
              <Field
                as={TextField}
                name="email" // Прив'язка до email з initialValues
                label="Email" // Лейбл для поля
                variant="outlined" // Стиль поля
                type="email" // Тип поля
                required // Обов'язкове поле
                autoComplete="email" // Автозаповнення для email
                error={touched.email && Boolean(errors.email)} // Перевірка на помилки для email
                helperText={touched.email && errors.email} // Текст з помилкою для email
              />
            </FormControl>
            {/* Поле для введення пароля */}
            <FormControl fullWidth margin="normal">
              <Field
                as={TextField}
                name="password" // Прив'язка до пароля з initialValues
                label="Password" // Лейбл для поля
                variant="outlined" // Стиль поля
                type="password" // Тип поля
                required // Обов'язкове поле
                autoComplete="current-password" // Автозаповнення для пароля
                error={touched.password && Boolean(errors.password)} // Перевірка на помилки для пароля
                helperText={touched.password && errors.password} // Текст з помилкою для пароля
              />
            </FormControl>
            {/* Кнопка для сабміту форми */}
            <Button variant="contained" color="primary" fullWidth type="submit">
              Log In
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
