import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { register } from '../../redux/auth/operations';
import { TextField, Button, Box, Typography, FormControl } from '@mui/material';
import styles from './RegisterForm.module.css';

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(50, 'Name must be 50 characters or less')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values));
    resetForm();
  };

  return (
    <Box sx={{ width: 450, margin: 'auto' }}>
      {' '}
      <Typography variant="h4" align="center" gutterBottom>
        {' '}
        Register
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors }) => (
          <Form className={styles.form} autoComplete="on">
            {' '}
            <FormControl fullWidth margin="normal">
              <Field
                as={TextField}
                name="name"
                label="Username"
                variant="outlined"
                type="text"
                required
                className={styles.field}
                autoComplete="name"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Field
                as={TextField}
                name="email"
                label="Email"
                variant="outlined"
                type="email"
                required
                className={styles.field}
                autoComplete="email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Field
                as={TextField}
                name="password"
                label="Password"
                variant="outlined"
                type="password"
                required
                className={styles.field}
                autoComplete="new-password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              className={styles.button}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
