import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/filters/slice';
import { TextField, Box, Typography } from '@mui/material';
import styles from './SearchBox.module.css';

const SearchBox = () => {
  const dispatch = useDispatch();
  const name = useSelector(state => state.filters.name);

  const onSearch = name => dispatch(changeFilter(name));

  return (
    <Box className={styles.container}>
      {' '}
      <Typography variant="h6" gutterBottom className={styles.title}>
        Find contacts by name
      </Typography>
      <TextField
        id="search-input"
        label="Search"
        variant="outlined"
        fullWidth
        value={name}
        onChange={e => onSearch(e.target.value)}
        autoComplete="name"
        className={styles.input}
      />
    </Box>
  );
};

export default SearchBox;
