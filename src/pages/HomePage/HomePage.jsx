import { Typography, Container, Card, CardContent, Box } from '@mui/material';
import DocumentTitle from '../../components/DocumentTitle';
import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>{' '}
      <Container className={css.container}>
        {' '}
        <Box className={css.titleContainer}>
          {' '}
          <Typography variant="h3" className={css.title}>
            {' '}
            Phonebook Телефонна книга
          </Typography>
        </Box>
        <Box className={css.cardContainer}>
          {' '}
          <Box className={css.cardItem}>
            {' '}
            <Card>
              {' '}
              <CardContent className={css.cardContent}>
                {' '}
                <Typography variant="h6" className={css.cardTitle}>
                  {' '}
                  Про цей додаток
                </Typography>
                <Typography variant="body1" className={css.cardText}>
                  {' '}
                  Тут в телефонній книзі ти можеш додаати свої контакти
                  <br />
                  Робив VH-str в 2025.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </>
  );
}
