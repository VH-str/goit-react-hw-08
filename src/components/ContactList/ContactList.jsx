import { useSelector } from 'react-redux'; // Хук для отримання даних з Redux-стану
import Contact from '../Contact/Contact'; // Компонент для відображення окремого контакту
import { selectVisibleContacts } from '../../redux/filters/selectors'; // Селектор для отримання видимих контактів
import css from './ContactList.module.css'; // Імпортуємо стилі для списку контактів

const ContactList = () => {
  // Використовуємо useSelector для отримання списку контактів з глобального стану Redux
  const contacts = useSelector(selectVisibleContacts);

  return (
    <ul className={css.list}>
      {' '}
      {/* Список для відображення контактів */}
      {contacts.map(contact => (
        // Для кожного контакту створюємо елемент списку
        <li className={css.item} key={contact.id}>
          {' '}
          {/* Ключ для кожного елемента списку */}
          <Contact {...contact} />{' '}
          {/* Передаємо всі властивості контакту в компонент Contact */}
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
