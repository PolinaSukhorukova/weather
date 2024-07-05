import React, { useEffect, useState } from 'react';
import cities from '../../api/cities.json';
import translate from '../../api/translate.json';
import { CurrentWeather } from '../CurrentWeather/CurrentWeather';
import { Forecast } from '../Forecast/Forecast';
import { Modal } from '../Modal/Modal';
import { getCity } from '../../api/defaultCity';
import cn from 'classnames';
import './WeatherCard.scss';

export const WeatherCard = ({
  id,
  handleDeleteCard = () => { },
  language,
  theme,
  index,
  numberOfCards,
  favoritesLocalStorage,
  handleStorage
}) => {
  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isDeliting, setIsDeliting] = useState(false);

  const filteredCities = cities.filter((item) => {
    return item.ukr_name?.toLowerCase().startsWith(city?.toLowerCase()) || item.name?.toLowerCase().startsWith(city?.toLowerCase());
  });

  const selectedCityHandler = (e) => {
    setVisible(false);
    const city = e.target.textContent;
    const cityId = cities.find((item) => item.ukr_name === city || item.name === city).id;

    setCity(e.target.textContent);
    setSelectedCity(cityId);
  }

  const handleInputFocus = (e) => {
    setVisible(true);
    setCity(e.target.value)
  }

  const showModal = () => {
    setIsDeliting(true);
  }

  const handleModalDelete = (confirm) => {
    setIsDeliting(false);

    if (!confirm) {
      return;
    } else {
      setIsDeliting(true);
      handleDeleteCard(id);
    }
  }

  useEffect(() => {
    if (index === 0 && !selectedCity) {
      getCity()
        .then((response) => {
          const defaultCity = cities?.find((item) => item.ukr_name === response.stateProv || item.name === response.stateProv);

          if (defaultCity) {
            setCity(language === 'en' ? defaultCity.name : defaultCity.ukr_name);
            setSelectedCity(defaultCity.id);
          }
        })
    }
  }, []);

  useEffect(() => {
    const transletedCity = cities.find((item) => item.id === selectedCity);

    if (transletedCity && language === 'en') {
      setCity(transletedCity.name);
    } else if (transletedCity && language === 'ua') {
      setCity(transletedCity.ukr_name)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <div
      className={(cn('weather-card',
        { 'weather-card--active': favoritesLocalStorage?.some(item => item.id === selectedCity)}
      ))}>
      <div className="weather-card__title title">
        <div className="title__wrap">
          <form className="title__search">
            <input
              type="text"
              className="title__input"
              placeholder={translate[0][language].searchByCity}
              value={city}
              onChange={(e) => handleInputFocus(e)}
            />
            {visible && (
              <ul className="autocomplete">
                {city && (
                  filteredCities.map((item) => {
                    return (
                      <li
                        key={item.id}
                        className="autocomplete__item"
                        onClick={selectedCityHandler}
                      >
                        {language === 'en' ? item.name : item.ukr_name}
                      </li>
                    )
                  })
                )}
              </ul>
            )}
          </form>

          {selectedCity && !favoritesLocalStorage?.some(item => item.id === selectedCity) && (
            <button
              className="title__favorites-add"
              onClick={() => handleStorage(selectedCity)}
            >
              {translate[0][language].addToSelected}
            </button>
          )}
        </div>
      </div>

      {!selectedCity && (
        <div className="weather-card__data">
          <div className="weather-card__empty">
            <span>{translate[0][language].emptyCities}</span>
          </div>
        </div>
      )}

      {selectedCity && (
        <div className="weather-card__data">
          <CurrentWeather
            cityId={selectedCity}
            city={city}
            language={language}
          />

          <Forecast
            cityId={selectedCity}
            language={language}
            theme={theme}
          />
        </div>
      )}

      {(numberOfCards.length > 1) && (
        <button
          className="delete-city"
          onClick={() => showModal(true)}
        >
          -
        </button>
      )}

      {isDeliting && (
        <Modal
          handleModalDelete={handleModalDelete}
          language={language}
        />
      )}
    </div>
  )
}
