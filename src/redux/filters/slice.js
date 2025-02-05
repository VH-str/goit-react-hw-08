import { createSlice } from '@reduxjs/toolkit';

// Створюємо slice для фільтрів
const filtersSlice = createSlice({
  name: 'filters', // Ім'я slice
  initialState: {
    // Початковий стан фільтру
    name: '', // Фільтр за ім'ям, який спочатку порожній
  },
  reducers: {
    // Описуємо редьюсери для зміни стану
    changeFilter(state, action) {
      // Редьюсер для зміни фільтра
      state.name = action.payload; // Оновлюємо фільтр за ім'ям на нове значення з action
    },
  },
});

// Експортуємо дію для зміни фільтру
export const { changeFilter } = filtersSlice.actions;

// Експортуємо редьюсер для фільтрів
export default filtersSlice.reducer;
