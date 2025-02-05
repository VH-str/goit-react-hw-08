import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: builder => {
    builder
      // Обробка успішного виконання операцій реєстрації та входу
      .addMatcher(
        isAnyOf(register.fulfilled, logIn.fulfilled),
        (state, action) => {
          // Збереження даних користувача та токену в стані
          state.user = action.payload.user;
          state.token = action.payload.token;
          // Встановлення статусу входу як true
          state.isLoggedIn = true;
        }
      )
      // Обробка успішного виконання операції виходу
      .addMatcher(isAnyOf(logOut.fulfilled), state => {
        // Скидання даних користувача та токену
        state.user = { name: null, email: null };
        state.token = null;
        // Встановлення статусу входу як false
        state.isLoggedIn = false;
      })
      // Обробка початку процесу оновлення користувача
      .addMatcher(isAnyOf(refreshUser.pending), state => {
        // Встановлення статусу оновлення як true
        state.isRefreshing = true;
      })
      // Обробка успішного виконання операції оновлення користувача
      .addMatcher(isAnyOf(refreshUser.fulfilled), (state, action) => {
        // Оновлення даних користувача в стані
        state.user = action.payload;
        // Встановлення статусу входу як true
        state.isLoggedIn = true;
        // Встановлення статусу оновлення як false
        state.isRefreshing = false;
      })
      // Обробка невдачі оновлення користувача
      .addMatcher(isAnyOf(refreshUser.rejected), state => {
        // Встановлення статусу оновлення як false, якщо оновлення не вдалося
        state.isRefreshing = false;
      });
  },
});

export default authSlice.reducer;
