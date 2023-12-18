import React, { useState } from 'react';
import { WeatherCard } from '../../components/WeatherCard/WeatherCard';
import { Worning } from '../../components/Worning/Worning';
import './HomePage.scss';

export const HomePage = ({
  language,
  theme,
}) => {
  const [numberOfCards, setNumberOfCards] = useState([Math.random()]);
  const [isWorning, setIsWorning] = useState(false);


  const handleNumberOfCards = () => {
    if (numberOfCards.length < 5) {
      setNumberOfCards([...numberOfCards, Math.random()]);
    } else {
      setIsWorning(true);
    }
  }

  const handleDeleteCard = (id) => {
    const newCards = numberOfCards.filter((item) => item !== id);
    setNumberOfCards(newCards);
    if (newCards.length === 0) {
      setNumberOfCards([Math.random()]);
    }
  }

  const handleIsWorning = () => {
    setIsWorning(false);
  }

  return (
    <div className="container">
      <div className="home-page">
        <div className="home-page__cards">
          {numberOfCards.map((card, index) => (
            <WeatherCard
              key={card}
              id={card}
              handleDeleteCard={handleDeleteCard}
              language={language}
              theme={theme}
              index={index}
            />
          ))
          }
        </div>

        <button
          className="home-page__button"
          onClick={handleNumberOfCards}
        >
          +
        </button>

        {isWorning && (
          <Worning
            handleIsWorning={handleIsWorning}
            language={language}
          />
        )}
      </div>
    </div>
  )
}