import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронна дія для отримання контактів
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll', // Назва дії
  async (_, thunkAPI) => {
    try {
      // Виконуємо запит на отримання контактів
      const response = await axios.get('/contacts');
      // Повертаємо отримані дані у вигляді результату
      return response.data;
    } catch (e) {
      // Якщо помилка, відправляємо її повідомлення в rejected action
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Асинхронна дія для додавання нового контакту
export const addContact = createAsyncThunk(
  'contacts/addContact', // Назва дії
  async ({ name, number }, thunkAPI) => {
    try {
      // Виконуємо запит на додавання контакту
      const response = await axios.post('/contacts', { name, number });
      // Повертаємо дані про доданий контакт
      return response.data;
    } catch (e) {
      // Якщо помилка, відправляємо її повідомлення в rejected action
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Асинхронна дія для видалення контакту
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact', // Назва дії
  async (id, thunkAPI) => {
    try {
      // Виконуємо запит на видалення контакту за id
      const response = await axios.delete(`/contacts/${id}`);
      // Повертаємо результат операції (може містити дані про видалений контакт)
      return response.data;
    } catch (e) {
      // Якщо помилка, відправляємо її повідомлення в rejected action
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Асинхронна дія для оновлення контактів
export const updateContact = createAsyncThunk(
  'contacts/updateContact', // Назва дії
  async ({ id, name, number }, thunkAPI) => {
    try {
      // Виконуємо запит на оновлення контакту
      const response = await axios.patch(`/contacts/${id}`, { name, number });
      // Повертаємо оновлені дані контакту
      return response.data;
    } catch (e) {
      // Якщо помилка, відправляємо її повідомлення в rejected action
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
