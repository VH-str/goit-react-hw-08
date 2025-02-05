import React from 'react';
import { HelmetProvider } from 'react-helmet-async'; // Підключення Helmet для керування мета-тегами в <head>
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Підключення маршрутизації
import { PersistGate } from 'redux-persist/integration/react'; // Збереження стану Redux при перезавантаженні
import { Provider } from 'react-redux'; // Дозволяє передавати Redux-стор через контекст
import { App } from './components/App/App'; // Головний компонент додатку
import { store, persistor } from './redux/store'; // Імпорт Redux-стору та persistor для збереження стану
import 'modern-normalize'; // Стилізація для вирівнювання CSS у різних браузерах
import './index.css'; // Глобальні стилі

// Рендеринг головного компонента додатку
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {' '}
    {/* Включає додаткові перевірки та попередження в розробницькому режимі */}
    <Provider store={store}>
      {' '}
      {/* Передача Redux-стору у додаток */}
      <PersistGate loading={null} persistor={persistor}>
        {' '}
        {/* Забезпечує збереження стану Redux при перезавантаженні */}
        <BrowserRouter>
          {' '}
          {/* Додає підтримку маршрутизації */}
          <HelmetProvider>
            {' '}
            {/* Дозволяє керувати мета-тегами сторінки */}
            <App /> {/* Головний компонент додатку */}
          </HelmetProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
