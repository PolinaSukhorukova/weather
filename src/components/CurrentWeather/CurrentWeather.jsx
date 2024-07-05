import React, { useEffect, useState } from 'react';
import { getWeatherByCity } from '../../api/weather';
import { Loader } from '../Loader/Loader';
import cities from '../../api/cities.json';
import translate from '../../api/translate.json';
import './CurrentWeather.scss';

export const CurrentWeather = ({ 
    cityId,
    language,
}) => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [city, setCity] = useState('');

    useEffect(() => {
        if (cityId) {
            language === 'en' ? 
                setCity(cities.find((item) => item.id === cityId).name) : 
                setCity(cities.find((item) => item.id === cityId).ukr_name);

            setHasError(false);
            setLoading(true);
            getWeatherByCity(cityId, language)
                .then((response) => {
                    setLoading(false);
                    setCurrentWeather(response);
                })
                .catch((error) => {
                    setLoading(false);
                    setHasError(true);
                })
        }
    }, [cityId, language]);

    return (
        <>
            <div className="city">
                {city}
            </div>

            {loading && (
                <Loader/>
            )}

            {currentWeather && !loading && !hasError && (
                <div className="current-weather" >
                    <div className="current-weather__image">
                        <img src={`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`} alt="weather icon" />
                    </div>

                    <div className="current-weather__temperature">
                        {Math.round(currentWeather.main.temp)}°C
                    </div>

                    <div className="current-weather__description">
                        {currentWeather.weather[0].description}
                    </div>

                    <div className="current-weather__feels-like">
                        {`${translate[0][language].fillsLike} ${Math.round(currentWeather.main.feels_like)} °C`}
                    </div>

                    <div className="current-weather__wind">
                        {`${translate[0][language].wind}: ${currentWeather.wind.speed} ${translate[0][language]['m/s']}`}
                    </div>

                    <div className="current-weather__humidity">
                        {`${translate[0][language].humidity}: ${currentWeather.main.humidity}%`}
                    </div>
                </div >
            )}
        </>
    )
}
