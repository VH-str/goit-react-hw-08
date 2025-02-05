import DocumentTitle from '../../components/DocumentTitle'; // Імпортуємо компонент для зміни заголовка сторінки
import { RegisterForm } from '../../components/RegisterForm/RegisterForm'; // Імпортуємо форму для реєстрації користувача

// Сторінка реєстрації користувача
export default function RegisterPage() {
  return (
    <div>
      <DocumentTitle>Registration</DocumentTitle>{' '}
      {/* Задаємо заголовок сторінки "Registration" */}
      <RegisterForm /> {/* Вставляємо компонент форми для реєстрації */}
    </div>
  );
}
