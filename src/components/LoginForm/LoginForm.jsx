import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { logIn } from '../../redux/auth/operations';
import { TextField, Button, Box, Typography, FormControl } from '@mui/material';

export const LoginForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        console.log('Login success');
      })
      .catch(() => {
        console.log('Login error');
      });
    resetForm();
  };

  return (
    <Box sx={{ width: 450, margin: 'auto' }}>
      {' '}
      <Typography variant="h4" align="center" gutterBottom>
        {' '}
        Login
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form autoComplete="on">
            {' '}
            <FormControl fullWidth margin="normal">
              <Field
                as={TextField}
                name="email"
                label="Email"
                variant="outlined"
                type="email"
                required
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
                autoComplete="current-password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </FormControl>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Log In
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
