// Селектор для отримання списку контактів з Redux стейту
export const selectContacts = state => state.contacts.items;

// Селектор для отримання статусу завантаження з Redux стейту
export const selectIsLoading = state => state.contacts.isLoading;

// Селектор для отримання повідомлення про помилку (якщо є) з Redux стейту
export const selectError = state => state.contacts.error;
