import { useDispatch } from 'react-redux'; // Хук для відправки дій в Redux
import { addContact } from '../../redux/contacts/operations'; // Дія для додавання контакту до Redux
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Компоненти Formik для обробки форми
import { useId } from 'react'; // Хук для створення унікальних ID для полів
import * as Yup from 'yup'; // Для валідації форми
import toast from 'react-hot-toast'; // Для показу сповіщень
import { TextField, Button, Box, Typography } from '@mui/material'; // Компоненти Material UI
import styles from './ContactForm.module.css'; // Імпорт стилів

// Опис валідації форми з використанням Yup
const ContactFormSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Занадто коротко!') // Мінімум 3 символи для імені
    .max(50, 'Занадто довго!') // Максимум 50 символів для імені
    .required("Обов'язкове поле"), // Поле є обов'язковим
  phone: Yup.string()
    .matches(
      /^\d{3}-\d{3}-\d{4}$/, // Перевірка формату номера телефону (XXX-XXX-XXXX)
      'Номер телефону повинен бути у форматі XXX-XXX-XXXX' // Повідомлення про неправильний формат
    )
    .required("Обов'язкове поле"), // Поле є обов'язковим
});

// Початкові значення для форми
const initialValues = {
  username: '', // Порожнє значення для імені
  phone: '', // Порожнє значення для телефону
};

const ContactForm = () => {
  const dispatch = useDispatch(); // Ініціалізація Redux dispatch для надсилання дій

  const nameFieldId = useId(); // Генерація унікального ID для поля імені
  const phoneFieldId = useId(); // Генерація унікального ID для поля телефону

  // Обробник сабміту форми
  const handleSubmit = (values, actions) => {
    // Відправка контактних даних до Redux
    dispatch(
      addContact({
        name: values.username, // Ім'я з форми
        number: values.phone, // Телефон з форми
      })
    );

    // Показ сповіщення про успішне додавання контакту
    toast.success(`Контакт ${values.username} успішно додано!`);

    // Очищення форми після сабміту
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues} // Початкові значення форми
      onSubmit={handleSubmit} // Функція для обробки сабміту
      validationSchema={ContactFormSchema} // Валідація форми через Yup
    >
      <Form className={styles.form}>
        <Box className={styles.inputContainer}>
          <Typography variant="h6" className={styles.inputLabel}>
            Name
          </Typography>
          <Field
            as={TextField}
            className={styles.inputField}
            name="username"
            id={nameFieldId}
            label="Enter name"
            fullWidth
            variant="outlined"
            autoComplete="name"
          />
          <ErrorMessage
            name="username"
            component="span"
            className={styles.errorMessage}
          />
        </Box>

        <Box className={styles.inputContainer}>
          <Typography variant="h6" className={styles.inputLabel}>
            Number
          </Typography>
          <Field
            as={TextField}
            className={styles.inputField}
            name="phone"
            id={phoneFieldId}
            label="Enter phone number"
            fullWidth
            variant="outlined"
            autoComplete="tel"
          />
          <ErrorMessage
            name="phone"
            component="span"
            className={styles.errorMessage}
          />
        </Box>

        <Button
          className={styles.submitButton}
          type="submit"
          variant="contained"
          fullWidth
        >
          Add contact
        </Button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
