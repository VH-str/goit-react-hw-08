import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Box, Typography } from '@mui/material';
import css from './Navigation.module.css';

export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const getNavLinkClass = ({ isActive }) =>
    isActive ? `${css.link} ${css.active}` : css.link;

  return (
    <Box>
      {' '}
      <Typography variant="h6">
        <NavLink className={getNavLinkClass} to="/">
          Home
        </NavLink>
      </Typography>
      {isLoggedIn && (
        <Typography variant="h6">
          <NavLink className={getNavLinkClass} to="/contacts">
            Contacts
          </NavLink>
        </Typography>
      )}
    </Box>
  );
};
