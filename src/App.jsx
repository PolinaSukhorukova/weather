import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HomePage } from './pages/HomePage/HomePage';
import { Header } from './components/Header/Header';
import { Favorites } from './pages/Favorites/Favorites';

export const App = () => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('ua');

  const handleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }


  const handleLanguage = () => {
    setLanguage(language === 'ua' ? 'en' : 'ua');
  }

  useEffect(() => {
    if (!localStorage.getItem('favorites')) {
      localStorage.setItem('favorites', JSON.stringify([]));
    }
  }, []);
  return (
    <div 
      id={theme}
      className="page__container"
    >
      <Header 
        handleTheme={handleTheme}
        handleLanguage={handleLanguage}
        theme={theme}
        language={language}
      />
      <main className="page__main">
        <Routes>

          <Route path="/" element={<HomePage language={language} theme={theme}></HomePage>} />
          <Route path="/favorites" element={<Favorites language={language} theme={theme}></Favorites>} />

          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </main>
    </div>
  )
}
