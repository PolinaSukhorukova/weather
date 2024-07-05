import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { getWeatherByCityHourly } from '../../api/weather';
import LineChart from '../LineChart/LineChart';
import translate from '../../api/translate.json';
import './HourlyWeather.scss';

export const HourlyWeather = ({ cityId, language, theme }) => {
    const [hourlyWeather, setHourlyWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [labels, setLabels] = useState([]);
    const [temperature, setTemperature] = useState([]);

    const prepareData = (hourlyWeather) => {
        const hourLabels = hourlyWeather.map((item) => {
            return item.dt_txt.split(' ')[1].slice(0, 5);
        });

        const hourTemperature = hourlyWeather.map((item) => {
            return Math.round(item.main.temp);
        });

        setLabels(hourLabels);
        setTemperature(hourTemperature);
    };

    useEffect(() => {
        if (cityId) {
            setLoading(true);
            getWeatherByCityHourly(cityId)
                .then((response) => {
                    setHourlyWeather(response);
                    prepareData(response.list.slice(0, 4));
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [cityId]);

    return (
        <>
            {loading && (
                <Loader />
            )}
            {hourlyWeather && !loading && (
                <div className="hourly-weather">
                    <div className="hourly-weather__chart">
                        <LineChart label={translate[0][language].temperatureChart} labels={labels} data={temperature} theme={theme} />
                    </div>
                </div>
            )}
        </>
    );
};
