import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import { Button, Typography, Box } from '@mui/material';
import css from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <Box className={css.wrapper}>
      {' '}
      <Typography className={css.username} variant="h6" component="p">
        Welcome, {user.name}
      </Typography>
      <Button
        className={css.button}
        variant="contained"
        color="secondary"
        onClick={() => dispatch(logOut())}
      >
        Logout
      </Button>
    </Box>
  );
};
