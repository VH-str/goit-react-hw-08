import { useEffect } from 'react'; // Імпортуємо хук useEffect для виконання побічних ефектів (наприклад, завантаження даних)
import { useDispatch, useSelector } from 'react-redux'; // Імпортуємо хук useDispatch для виклику Redux дій та useSelector для доступу до Redux стану
import DocumentTitle from '../../components/DocumentTitle'; // Компонент для зміни заголовка сторінки
import ContactForm from '../../components/ContactForm/ContactForm'; // Компонент форми для додавання контактів
import SearchBox from '../../components/SearchBox/SearchBox'; // Компонент для пошуку контактів за ім'ям
import ContactList from '../../components/ContactList/ContactList'; // Компонент для відображення списку контактів
import { fetchContacts } from '../../redux/contacts/operations'; // Операція для завантаження контактів з бекенду
import { selectIsLoading } from '../../redux/contacts/selectors'; // Селектор для отримання статусу завантаження контактів

// Компонент сторінки контактів
export default function ContactsPage() {
  const dispatch = useDispatch(); // Ініціалізація dispatch для виклику Redux дій
  const isLoading = useSelector(selectIsLoading); // Отримуємо з Redux стану, чи зараз йде завантаження контактів

  useEffect(() => {
    dispatch(fetchContacts()); // Викликаємо дію для завантаження контактів при першому рендері
  }, [dispatch]); // Виконуємо ефект тільки один раз після початкового рендеру

  return (
    <>
      <DocumentTitle>Your contacts</DocumentTitle>{' '}
      {/* Задаємо заголовок сторінки */}
      <div>{isLoading && 'Request in progress...'}</div>{' '}
      {/* Показуємо повідомлення про завантаження, якщо це потрібно */}
      <ContactForm /> {/* Форма для додавання нового контакту */}
      <SearchBox /> {/* Пошукова форма для фільтрації контактів */}
      <ContactList /> {/* Список контактів */}
    </>
  );
}
