import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteContact,
  updateContact,
  fetchContacts,
} from '../../redux/contacts/operations'; // Імпорт операцій для роботи з контактами
import { Modal, Button, TextField, Typography } from '@mui/material'; // Компоненти Material UI
import { HiUser } from 'react-icons/hi'; // Іконка користувача
import { BsFillTelephoneFill } from 'react-icons/bs'; // Іконка телефону
import css from './Contact.module.css'; // Стилі
import toast from 'react-hot-toast'; // Бібліотека для сповіщень

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch(); // Хук для виклику Redux-екшенів
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Стан для модального вікна видалення
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Стан для модального вікна редагування
  const [editedName, setEditedName] = useState(name); // Локальний стан для редагування імені
  const [editedNumber, setEditedNumber] = useState(number); // Локальний стан для редагування номера

  // Функція для видалення контакту
  const handleDelete = () => {
    dispatch(deleteContact(id)); // Видаляємо контакт у Redux
    dispatch(fetchContacts()); // Оновлюємо список контактів
    toast.error(`Contact ${name} deleted!`); // Відображаємо сповіщення
    setIsDeleteModalOpen(false); // Закриваємо модальне вікно
  };

  // Функція для редагування контакту
  const handleEditSubmit = () => {
    dispatch(updateContact({ id, name: editedName, number: editedNumber }))
      .then(() => {
        dispatch(fetchContacts()); // Оновлюємо список контактів після редагування
        toast.success(`Contact ${editedName} updated!`); // Відображаємо сповіщення
        setIsEditModalOpen(false); // Закриваємо модальне вікно
      })
      .catch(error => {
        toast.error(`Failed to update contact: ${error.message}`); // Помилка при редагуванні
      });
  };

  return (
    <div className={css.item}>
      <div className={css.datablock}>
        <p className={css.text}>
          <HiUser /> {name} {/* Відображаємо ім'я з іконкою */}
        </p>
        <p className={css.text}>
          <BsFillTelephoneFill /> {number}{' '}
          {/* Відображаємо номер телефону з іконкою */}
        </p>
      </div>
      <div className={css.buttonGroup}>
        {/* Кнопка редагування */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit
        </Button>
        {/* Кнопка видалення */}
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete
        </Button>
      </div>

      {/* Модальне вікно редагування */}
      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className={css.modal}>
          <Typography variant="h6">Edit Contact</Typography>
          <TextField
            label="Name"
            value={editedName}
            onChange={e => setEditedName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            value={editedNumber}
            onChange={e => setEditedNumber(e.target.value)}
            fullWidth
            margin="normal"
          />
          <div className={css.buttonGroup}>
            <Button
              onClick={handleEditSubmit}
              variant="contained"
              color="primary"
            >
              Save Changes
            </Button>
            <Button
              onClick={() => setIsEditModalOpen(false)}
              variant="outlined"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Модальне вікно підтвердження видалення */}
      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className={css.modal}>
          <Typography variant="h6">
            Are you sure you want to delete this contact?
          </Typography>

          <div className={css.buttonGroup}>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="secondary"
            >
              Yes, Delete
            </Button>
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              variant="outlined"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Contact;
