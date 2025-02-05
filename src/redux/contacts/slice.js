import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

// Обробник для стану "pending" (запит на виконання)
const handlePending = state => {
  state.isLoading = true; // Увімкнення індикатора завантаження
  state.error = null; // Очистка попередніх помилок
};

// Обробник для стану "rejected" (помилка запиту)
const handleRejected = (state, action) => {
  state.isLoading = false; // Вимкнення індикатора завантаження
  state.error = action.payload; // Запис помилки в стейт
};

const contactsSlice = createSlice({
  name: 'contacts', // Назва цього слайсу в Redux
  initialState: {
    items: [], // Містить всі контакти
    isLoading: false, // Показує, чи триває процес завантаження
    error: null, // Містить повідомлення про помилку, якщо така є
  },
  extraReducers: builder => {
    builder
      // Обробка запитів у статусі "pending"
      .addMatcher(
        isAnyOf(
          fetchContacts.pending, // Запит на отримання контактів
          addContact.pending, // Запит на додавання нового контакту
          deleteContact.pending // Запит на видалення контакту
        ),
        handlePending // Викликати обробник handlePending для всіх запитів "pending"
      )
      // Обробка запитів у статусі "rejected"
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected, // Помилка при отриманні контактів
          addContact.rejected, // Помилка при додаванні контакту
          deleteContact.rejected // Помилка при видаленні контакту
        ),
        handleRejected // Викликати обробник handleRejected для всіх запитів "rejected"
      )
      // Обробка запитів "fulfilled" (успішно виконано)
      .addMatcher(isAnyOf(fetchContacts.fulfilled), (state, action) => {
        state.isLoading = false; // Вимкнення індикатора завантаження
        state.error = null; // Очистка помилки, якщо запит успішно виконано
        state.items = action.payload; // Запис отриманих контактів у стейт
      })
      .addMatcher(isAnyOf(addContact.fulfilled), (state, action) => {
        state.isLoading = false; // Вимкнення індикатора завантаження
        state.error = null; // Очистка помилки, якщо контакт успішно додано
        state.items.push(action.payload); // Додавання нового контакту в список
      })
      .addMatcher(isAnyOf(deleteContact.fulfilled), (state, action) => {
        state.isLoading = false; // Вимкнення індикатора завантаження
        state.error = null; // Очистка помилки, якщо контакт успішно видалено
        state.items = state.items.filter(
          contact => contact.id !== action.payload.id // Видалення контакту за його id
        );
      });
  },
});

export default contactsSlice.reducer;
