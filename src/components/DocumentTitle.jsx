import { Helmet } from 'react-helmet-async'; // Імпортуємо компонент Helmet для зміни тегів мета-даних в HTML-документі, зокрема для зміни заголовка сторінки

export default function DocumentTitle({ children }) {
  // Компонент для динамічної зміни заголовка сторінки, отримує текст заголовка як дітей (children)
  return (
    <Helmet>
      {' '}
      {/* Використовуємо Helmet для маніпулювання мета-тегами */}
      <title>{children}</title>{' '}
      {/* Вставляємо текст, який передано в компонент через props (children), як заголовок сторінки */}
    </Helmet>
  );
}
