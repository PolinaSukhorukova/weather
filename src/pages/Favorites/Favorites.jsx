import React, { useEffect, useState } from 'react';
import { CurrentWeather } from '../../components/CurrentWeather/CurrentWeather';
import { Modal } from '../../components/Modal/Modal';
import './Favorites.scss';
import { Forecast } from '../../components/Forecast/Forecast';

export const Favorites = ({
  language, theme
}) => {
  const [favorites, setFavorites] = useState([]);
  const [isDeliting, setIsDeliting] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('favorites'));
    setFavorites(data);
  }, []);

  const handleModalDelete = (confirm) => {
    setIsDeliting(false);
    setId(null);

    if (!confirm) {
      return;
    } else {
      handleDelete(id);
    }
  }

  const handleDelete = (id) => {
    const data = JSON.parse(localStorage.getItem('favorites'));
    const newData = data.filter((item) => item.id !== id);
    localStorage.setItem('favorites', JSON.stringify(newData));
    setFavorites(newData);
  }

  const showModal = (id) => {
    setIsDeliting(true);
    setId(id);
  }

  return (
    <div className="favorites-cards container">
      {favorites && favorites.map((city) => (
        <div className="weather-card" key={city.id}>
          <div className="weather-card__data" >
            <CurrentWeather
              cityId={city.id}
              city={city}
              language={language}
            />

            <Forecast
              cityId={city.id}
              language={language}
              theme={theme}
            />
          </div>

          <button
            className="favorites-delete"
            onClick={() => showModal(city.id)}
          >-</button>
        </div>
      ))
      }

      {isDeliting && (
        <Modal
          handleModalDelete={handleModalDelete}
          language={language}
        />
      )}
    </div>
  )
}