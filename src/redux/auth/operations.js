import axios from 'axios'; // Імпортуємо бібліотеку axios для здійснення HTTP запитів
import { createAsyncThunk } from '@reduxjs/toolkit'; // Імпортуємо createAsyncThunk для асинхронних дій в Redux

// Встановлюємо базовий URL для всіх запитів axios
axios.defaults.baseURL = 'https://connections-api.goit.global';

// Функція для налаштування заголовку авторизації з токеном
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Функція для очищення заголовку авторизації
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// Створюємо асинхронну дію для реєстрації користувача
export const register = createAsyncThunk(
  'auth/register', // Ім'я дії
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/signup', credentials); // Виконуємо запит для реєстрації

      setAuthHeader(res.data.token); // Налаштовуємо заголовок авторизації
      return res.data; // Повертаємо дані користувача, включаючи токен
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // В разі помилки повертаємо повідомлення про помилку
    }
  }
);

// Створюємо асинхронну дію для входу користувача
export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/login', credentials); // Виконуємо запит для входу

      setAuthHeader(res.data.token); // Налаштовуємо заголовок авторизації
      return res.data; // Повертаємо дані користувача, включаючи токен
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // В разі помилки повертаємо повідомлення про помилку
    }
  }
);

// Створюємо асинхронну дію для виходу користувача
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout'); // Виконуємо запит для виходу

    clearAuthHeader(); // Очищаємо заголовок авторизації
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // В разі помилки повертаємо повідомлення про помилку
  }
});

// Створюємо асинхронну дію для оновлення даних користувача (для перевірки активної сесії)
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState(); // Отримуємо стан Redux
    const persistedToken = state.auth.token; // Отримуємо збережений токен з Redux

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user'); // Якщо токен відсутній, відхиляємо дію
    }

    try {
      setAuthHeader(persistedToken); // Налаштовуємо заголовок авторизації з токеном
      const res = await axios.get('/users/current'); // Виконуємо запит для отримання поточного користувача
      return res.data; // Повертаємо дані користувача
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // В разі помилки повертаємо повідомлення про помилку
    }
  }
);
