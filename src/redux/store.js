import { configureStore } from '@reduxjs/toolkit'; // Імпортуємо configureStore для створення Redux store
import { persistStore, persistReducer } from 'redux-persist'; // Імпортуємо інструменти для збереження стану між сесіями
import storage from 'redux-persist/lib/storage'; // Імпортуємо локальне сховище для збереження даних
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'; // Імпортуємо дії, які будуть ігноруватись під час серіалізації

import contactsReducer from './contacts/slice'; // Редьюсер для контактів
import filtersReducer from './filters/slice'; // Редьюсер для фільтрів
import authReducer from './auth/slice'; // Редьюсер для автентифікації

// Налаштування для персистентності даних автентифікації (token)
const authPersistConfig = {
  key: 'auth', // Ключ для збереження автентифікаційних даних
  storage, // Використовуємо локальне сховище для зберігання
  whitelist: ['token'], // Тільки token буде зберігатись у сховищі
};

// Створення Redux store з персистентністю
export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer), // Персистентний редьюсер для автентифікації
    contacts: contactsReducer, // Редьюсер для контактів
    filters: filtersReducer, // Редьюсер для фільтрів
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ігноруємо ці дії при перевірці на серіалізацію
      },
    }),
  devTools: import.meta.env.MODE === 'development', // Включення DevTools лише в режимі розробки
});

// Створення персистора для відновлення стану
export const persistor = persistStore(store);
