import { createSelector } from '@reduxjs/toolkit';
import { selectContacts } from '../contacts/selectors';

// Селектор для отримання фільтра за ім'ям
export const selectNameFilter = state => state.filters.name;

// Селектор для отримання видимих контактів, з урахуванням фільтра за ім'ям
export const selectVisibleContacts = createSelector(
  [selectContacts, selectNameFilter], // Селектори, які будуть передані в createSelector
  (contacts, nameFilter) => {
    // Функція, яка обробляє отримані дані
    return contacts.filter(
      // Фільтруємо список контактів
      contact =>
        // Перевіряємо, чи ім'я або номер контакту містить фільтр (ігноруємо регістр)
        contact.name.toLowerCase().includes(nameFilter.toLowerCase().trim()) ||
        contact.number.toLowerCase().includes(nameFilter.toLowerCase().trim())
    );
  }
);
