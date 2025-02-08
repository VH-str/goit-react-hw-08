import { NavLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import css from './AuthNav.module.css';

export const AuthNav = () => {
  const getNavLinkClass = ({ isActive }) =>
    isActive ? `${css.link} ${css.active}` : css.link;

  return (
    <Box display="flex" alignItems="center">
      {' '}
      <Typography variant="h6" component="span" sx={{ mr: 2 }}>
        {' '}
        <NavLink to="/register" className={getNavLinkClass}>
          {' '}
          Register
        </NavLink>
      </Typography>
      <Typography variant="h6" component="span">
        {' '}
        <NavLink to="/login" className={getNavLinkClass}>
          {' '}
          Login
        </NavLink>
      </Typography>
    </Box>
  );
};
