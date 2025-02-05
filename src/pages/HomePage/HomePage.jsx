import { Typography, Container, Card, CardContent, Box } from '@mui/material'; // Імпортуємо компоненти Material-UI для стилізації
import DocumentTitle from '../../components/DocumentTitle'; // Компонент для зміни заголовка сторінки
import css from './HomePage.module.css'; // Імпортуємо стилі для компонента HomePage

// Головна сторінка додатку
export default function HomePage() {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>{' '}
      {/* Задаємо заголовок сторінки як "Home" */}
      <Container className={css.container}>
        {' '}
        {/* Вставляємо контейнер для вмісту, додаючи класи з CSS модулів */}
        <Box className={css.titleContainer}>
          {' '}
          {/* Контейнер для заголовка */}
          <Typography variant="h3" className={css.title}>
            {' '}
            {/* Заголовок h3 для назви додатку */}
            Phonebook
          </Typography>
        </Box>
        <Box className={css.cardContainer}>
          {' '}
          {/* Контейнер для картки, що містить опис додатку */}
          <Box className={css.cardItem}>
            {' '}
            {/* Окрема картка для опису додатку */}
            <Card>
              {' '}
              {/* Матеріал-UI картка для візуального оформлення */}
              <CardContent className={css.cardContent}>
                {' '}
                {/* Вміст картки */}
                <Typography variant="h6" className={css.cardTitle}>
                  {' '}
                  {/* Заголовок картки */}
                  About this app
                </Typography>
                <Typography variant="body1" className={css.cardText}>
                  {' '}
                  {/* Опис додатку */}
                  This is a phonebook app where you can manage your contacts.
                  <br />
                  Developed by VH-stsh during the GoIT program in 2025.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </>
  );
}
