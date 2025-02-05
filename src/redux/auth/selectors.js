// Селектор для перевірки, чи користувач увійшов у систему
export const selectIsLoggedIn = state => state.auth.isLoggedIn;

// Селектор для отримання даних користувача (наприклад, ім'я, email, і т.д.)
export const selectUser = state => state.auth.user;

// Селектор для перевірки, чи триває оновлення даних користувача
export const selectIsRefreshing = state => state.auth.isRefreshing;
