import AppRouter from './router/router';
import { useTranslation } from 'react-i18next';
import ThemeWrapper from './wrappers/ThemeWrapper';
import './App.css';

const App = () => {
  const { t } = useTranslation();

  return (
    <ThemeWrapper>
      <div className="app-container">
        <main className="main-content">
          <AppRouter />
        </main>
        <footer className="footer">
          © 2025 Coney. {t('all_rights_reserved')}
        </footer>
      </div>
    </ThemeWrapper>
  );
};

export default App;
