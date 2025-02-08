import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { TextField, Button, Box, Typography } from '@mui/material';
import styles from './ContactForm.module.css';

const ContactFormSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Занадто коротко!')
    .max(50, 'Занадто довго!')
    .required("Обов'язкове поле"),
  phone: Yup.string()
    .matches(
      /^\d{3}-\d{3}-\d{4}$/,
      'Номер телефону повинен бути у форматі XXX-XXX-XXXX'
    )
    .required("Обов'язкове поле"),
});

const initialValues = {
  username: '',
  phone: '',
};

const ContactForm = () => {
  const dispatch = useDispatch();

  const nameFieldId = useId();
  const phoneFieldId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({
        name: values.username,
        number: values.phone,
      })
    );

    toast.success(`Контакт ${values.username} успішно додано!`);

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactFormSchema}
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
