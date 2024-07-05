import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { getWeatherByCityHourly } from '../../api/weather';
import LineChart from '../LineChart/LineChart';
import translate from '../../api/translate.json';
import './WeekWeather.scss';

export const WeekWeather = ({ cityId, language, theme }) => {
    const [weekWeather, setWeekWeather] = useState(null);
    const [labels, setLabels] = useState([]);
    const [temperature, setTemperature] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (cityId) {
            setLoading(true);
            getWeatherByCityHourly(cityId)
                .then((response) => {
                    setWeekWeather(response);
                    prepareData(response.list);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [cityId]);

    const prepareData = (weekWeather) => {
        const labels = [];
        const temperature = [];
        for (let i = 0; i < weekWeather.length; i = i + 8) {

            const date = new Date(weekWeather[i].dt_txt);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = String(date.getFullYear()).slice(-2);
            const label = `${day}.${month}.${year}`;
            const temperatureArray = weekWeather.slice(i, i + 8);
            const avarageTemperature = Math.round(temperatureArray.reduce((acc, item) => {
                return acc + item.main.temp;
            }, 0) / temperatureArray.length);

            labels.push(label);
            temperature.push(avarageTemperature);
        }
        setLabels(labels);
        setTemperature(temperature);
    }

    return (
        <>
            {loading && (
                <Loader />
            )}
            {weekWeather && !loading && (
                <div className="week-weather">
                    <div className="week-weather__chart">
                        <LineChart label={translate[0][language].temperatureChart} labels={labels} data={temperature} theme={theme} />
                    </div>
                </div>
            )}
        </>
    )
}