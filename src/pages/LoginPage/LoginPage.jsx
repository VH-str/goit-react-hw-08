import DocumentTitle from '../../components/DocumentTitle'; // Імпортуємо компонент для зміни заголовка сторінки
import { LoginForm } from '../../components/LoginForm/LoginForm'; // Імпортуємо форму для входу користувача

// Сторінка для входу користувача
export default function LoginPage() {
  return (
    <div>
      <DocumentTitle>Login</DocumentTitle>{' '}
      {/* Задаємо заголовок сторінки "Login" */}
      <LoginForm /> {/* Вставляємо компонент форми для входу */}
    </div>
  );
}
