import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import { selectVisibleContacts } from '../../redux/filters/selectors';
import css from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(selectVisibleContacts);

  return (
    <ul className={css.list}>
      {' '}
      {contacts.map(contact => (
        <li className={css.item} key={contact.id}>
          {' '}
          <Contact {...contact} />{' '}
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
